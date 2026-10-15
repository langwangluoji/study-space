"""Independent numeric checks for derivations-4; outputs JSON, writes no files.
Run: python scripts/verify-photo-spatial-derivations.py (NumPy required).
R: camera->auxiliary. Auxiliary and world parallel except composite test.
"""
import json
import numpy as np

checks=[]
def check(name, condition):
    assert bool(condition), name
    checks.append({'name':name,'status':'PASS'})

def rz(angle):
    c,s=np.cos(angle),np.sin(angle)
    return np.array([[c,-s,0.],[s,c,0.],[0.,0.,1.]])

def ratio(x):
    d,e,f,g=x
    return (f-d)/(g-d)*(g-e)/(f-e)

xs=np.array([0.,1.,2.,3.]);T=np.array([[2.,1.],[.1,1.]])
ts=np.column_stack([xs,np.ones(4)]);ys=ts@T.T;ys=ys[:,0]/ys[:,1]
check('cross ratio via homogeneous determinant cancellation',np.isclose(ratio(xs),ratio(ys)) and np.isclose(ratio(xs),4/3))
R=rz(np.pi/2);qC=np.array([1.,0.,0.]);qA=R@qC
check('basis columns and transpose inverse',np.allclose(qA,[0.,1.,0.]) and np.allclose(R.T@qA,qC))
Q=rz(.2);S=Q@R;vec=np.array([20.,10.,-1000.])
check('auxiliary-to-ground product reverses order on inverse',np.allclose(R.T@Q.T@(S@vec),vec))
f=100.;x0=.2;y0=-.1
K=np.array([[1.,0.,-x0],[0.,1.,-y0],[0.,0.,-f]])
p=np.array([20.,10.,1.]);a=K@p;pp=np.linalg.solve(K,7*a)
check('image-to-ray K and projective inverse',np.allclose(pp/pp[2],p))
Kpixel=np.array([[.005,0.,-.005*2000],[0.,-.005,.005*1600],[0.,0.,-100.]])
check('pixel scale, origin and y-axis combined',np.allclose(Kpixel@np.array([2400.,1800.,1.]),[2.,-1.,-100.]))
C=np.array([100.,200.,1000.]);P=np.array([120.,210.,0.]);q=R.T@(P-C);image=-100*q[:2]/q[2]
check('nonzero pose projects to stated image',np.allclose(q,[10.,-20.,-1000.]) and np.allclose(image,[1.,-2.]))
Hpose=np.eye(4);Hpose[:3,:3]=R;Hpose[:3,3]=C
Hinv=np.eye(4);Hinv[:3,:3]=R.T;Hinv[:3,3]=-R.T@C
check('rigid homogeneous transform inverse',np.allclose(Hinv@Hpose,np.eye(4)) and np.allclose(Hinv@np.r_[P,1.],np.r_[q,1.]))
check('ray backprojection mixed units',np.allclose(C+10*R@np.r_[image,-100.],P))
B=np.array([300.,0.,0.]);skew=np.array([[0.,-B[2],B[1]],[B[2],0.,-B[0]],[-B[1],B[0],0.]])
K0=np.diag([1.,1.,-100.]);F=K0.T@skew@K0
p1=np.array([20.,10.,1.]);p2=np.array([-10.,10.,1.]);line2=F.T@p1
check('epipolar side/order and numeric line',np.allclose(line2,[0.,-30000.,300000.]) and abs(line2@p2)<1e-10 and abs(line2@np.array([-10.,11.,1.]))>1)
check('along-epipolar displacement remains a candidate',abs(line2@np.array([-50.,10.,1.]))<1e-10)
alpha,beta,gamma=.1,-.2,30.;Cc=np.array([20.,40.,1000.]);M=np.array([[1.,0.,0.],[0.,1.,0.],[alpha,beta,gamma]])
D=M-np.outer(Cc,[0.,0.,1.]);
check('plane embedding determinant equals camera-to-plane algebraic offset',np.isclose(np.linalg.det(D),alpha*Cc[0]+beta*Cc[1]+gamma-Cc[2]))
Km=np.diag([1.,1.,-.1]);Cz=np.array([0.,0.,1000.]);M0=np.diag([1.,1.,0.]);D0=M0-np.outer(Cz,[0.,0.,1.]);H=np.linalg.solve(Km,D0)
projected=H@np.array([200.,100.,1.]);projected=projected[:2]/projected[2]
check('plane-derived homography matches spatial projection',np.allclose(H,np.diag([1.,1.,10000.])) and np.allclose(projected,[.02,.01]))
point=np.array([200.,100.,0.])
def direction(t):
    return rz(.01*t)@(point-np.array([100*t,0.,1000.]))
def image_t(t):
    z=direction(t)
    return -100*z[:2]/z[2]
h=1e-5;qd=(direction(h)-direction(-h))/(2*h);image_d=(image_t(h)-image_t(-h))/(2*h)
check('time-chain rotation plus translation derivative',np.allclose(qd,[-101.,2.,0.],atol=1e-6))
check('quotient derivative and timing sensitivity',np.allclose(image_d,[-10.1,.2],atol=1e-7))
print(json.dumps({'status':'PASS','count':len(checks),'checks':checks},ensure_ascii=False,indent=2))
