"""Independent checks added for the English-order lecture, with explicit units."""
from pathlib import Path
import json
import sympy as s
import numpy as np
rows=[]
def check(name,value,detail=''):
    assert bool(value),name
    rows.append({'name':name,'status':'PASS','detail':str(detail)})
x,e0,e1,f1=s.symbols('x e0 e1 f1')
T=(e1*x+f1)/(e0*x+1)
check('1D projectivity derivative',s.simplify(s.diff(T,x)-(e1-e0*f1)/(e0*x+1)**2)==0)
fun=lambda z:(2*z+1)/(z/s.Integer(10)+1)
cross=lambda a,b,c,d:(a-c)/(a-d)*(b-d)/(b-c)
points=list(map(s.Integer,[0,1,2,3]))
check('directed cross ratio invariant',s.simplify(cross(*points)-cross(*map(fun,points)))==0)
check('1D examples',fun(s.Integer(1))==s.Rational(30,11) and fun(s.Integer(3))==s.Rational(70,13))
H=s.Matrix([[2,0,1],[0,3,-1],[s.Rational(1,10),0,1]])
P=s.Matrix([2,1,1]);q=H*P
check('homography normalized coordinates',q[0]/q[2]==s.Rational(25,6) and q[1]/q[2]==s.Rational(5,3))
check('homography inverse closure',H.inv()*q==P)
line=s.Matrix([1,-1,-1]);image_line=H.inv().T*line
check('point-line incidence H inverse transpose',(line.T*P)[0]==0 and (image_line.T*q)[0]==0)
C=np.array([0.,0.,1000.]);a=np.array([20.,10.,-100.]);n=np.array([0.,0.,1.])
scale=-(n@C)/(n@a);ground=C+scale*a
check('ray plane example m/mm',scale==10 and np.allclose(ground,[200,100,0]))
check('projection backprojection closure',np.allclose(-100*(ground-C)[:2]/(ground-C)[2],a[:2]))
check('parallel plane ray diagnostic',n@np.array([10.,0.,0.])==0)
# Refraction source formula: H,h in km, output K in microradians.
camera_km,ground_km=3.,.3
K=2410*camera_km/(camera_km**2-6*camera_km+250)-2410*ground_km/(ground_km**2-6*ground_km+250)*ground_km/camera_km
radius=np.hypot(59.043,72.392);alpha=np.arctan(radius/152.)
delta_micro=K*np.tan(alpha)
check('ARDC1959 source K in microradians',abs(K-29.7088)<.0001,K)
check('refraction angle with declared conversion',abs(delta_micro-18.258)<.001,delta_micro)
shift=152*np.tan(alpha+delta_micro*1e-6)-radius
check('refraction radial difference micrometre scale',0<shift<.01,shift)
earth_radius_m=6371000.;height_m=3000.;r_mm=100.;f_mm=152.
earth_shift=r_mm**3*height_m/(2*f_mm**2*earth_radius_m)
check('curvature formula unit invariance',np.isclose(earth_shift,r_mm**3*(height_m/1000)/(2*f_mm**2*(earth_radius_m/1000))),earth_shift)
rng=np.random.default_rng(31);J=rng.normal(size=(12,4));W=np.diag(np.linspace(.3,2.5,12));Q=np.linalg.inv(W);N=J.T@W@J
Qvv=Q-J@np.linalg.solve(N,J.T)
residual_operator=J@np.linalg.solve(N,J.T@W)-np.eye(len(W))
propagated=residual_operator@Q@residual_operator.T
check('nonuniform weight residual covariance propagation',np.allclose(Qvv,propagated,atol=1e-12))
check('residual covariance symmetry and PSD',np.allclose(Qvv,Qvv.T) and np.linalg.eigvalsh(Qvv).min()>-1e-10)
check('wrong W first term detected',not np.allclose(W-J@np.linalg.solve(N,J.T),propagated))
observed=rng.normal(size=12);v=residual_operator@observed
check('weighted residual normal orthogonality',np.linalg.norm(J.T@W@v)<1e-10)
sigma0=2.;sd=sigma0*np.sqrt(np.diag(Qvv));standardized=v/sd
check('standardized residual one variance scale',np.allclose(standardized,v/np.sqrt(np.diag(sigma0**2*Qvv))))
cov=np.array([[4.,1.2],[1.2,9.]])
check('correlated 2D observation block valid',np.linalg.eigvalsh(cov).min()>0 and np.isclose(cov[0,1]/np.sqrt(cov[0,0]*cov[1,1]),.2))
# A synthetic proper rotation chain, not a validation of an orbital ephemeris.
def rz(t):return np.array([[np.cos(t),-np.sin(t),0],[np.sin(t),np.cos(t),0],[0,0,1]])
R0=rz(.2);R1=rz(-.1);R2=rz(.03);R3=rz(.01);RT=R3@R2@R1
CI=np.array([1000.,2000.,7000000.]);q_sensor=np.array([0.,12.,-150.])
PE=R0.T@(CI+RT.T@q_sensor)
recovered=RT@(R0@PE-CI)
check('satellite frame chain closure',np.allclose(recovered,q_sensor,atol=1e-8))
check('mixed frame subtraction rejected',not np.allclose(RT@(PE-CI),q_sensor))
A=rng.normal(size=(12,12));Wc=A.T@A+np.eye(12);Qc=np.linalg.inv(Wc);Nc=J.T@Wc@J;Qvc=Qc-J@np.linalg.solve(Nc,J.T);b=rng.normal(size=12)
check('correlated gross error residual propagation',np.allclose((J@np.linalg.solve(Nc,J.T@Wc)-np.eye(12))@b,-Qvc@Wc@b))
check('downlooking positive parallax depth',np.isclose(100*200/1000-100*(200-60)/1000,100*60/1000))
result={'status':'PASS','checks':len(rows),'sympy':s.__version__,'numpy':np.__version__,'results':rows}
Path('reports/photogrammetry-english-order-math.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'status':result['status'],'checks':len(rows),'refractionK_microRad':K,'refractionDelta_microRad':delta_micro,'curvatureShift_mm':earth_shift},ensure_ascii=False))
