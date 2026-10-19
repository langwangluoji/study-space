"""Independent exact identities and numerical closure for the local lecture."""
from pathlib import Path
import json
import sympy as s
import numpy as np
results=[]
def check(name,condition,detail=''):
 assert bool(condition),name
 results.append(dict(name=name,status='PASS',detail=str(detail)))
f,N,c0,u,distance=s.symbols('f N c0 u distance',positive=True)
v=lambda z:f*z/(z-f)
signed=s.factor(f/N*(v(distance)-v(u))/v(u))
check('thin-lens blur identity',s.simplify(signed-f**2*(u-distance)/(N*u*(distance-f)))==0)
k=N*c0*(distance-f)/f**2
near=distance/(1+k);far=distance/(1-k)
check('near boundary',s.simplify(signed.subs(u,near)+c0)==0)
check('far boundary',s.simplify(signed.subs(u,far)-c0)==0)
hyp=f+f**2/(N*c0)
check('hyperfocal k=1',s.simplify(k.subs(distance,hyp)-1)==0)
check('hyperfocal near=half',s.simplify(near.subs(distance,hyp)-hyp/2)==0)
values={f:50,N:8,c0:s.Rational(2,100),distance:10000}
check('DoF worked example',abs(float(near.subs(values))-6109.48)<.1,dict(near_mm=float(near.subs(values)),far_mm=float(far.subs(values))))
theta=s.symbols('theta',real=True)
check('Lambert hemisphere integral',s.integrate(s.cos(theta)*s.sin(theta),(theta,0,s.pi/2))*2*s.pi==s.pi)
check('cos-fourth 45 degrees',s.cos(s.pi/4)**4==s.Rational(1,4))
phi,omega,kappa=s.symbols('phi omega kappa',real=True)
# Wang convention: camera to auxiliary, Ry(phi) Rx(omega) Rz(kappa).
Ry=s.Matrix([[s.cos(phi),0,-s.sin(phi)],[0,1,0],[s.sin(phi),0,s.cos(phi)]])
Rx=s.Matrix([[1,0,0],[0,s.cos(omega),-s.sin(omega)],[0,s.sin(omega),s.cos(omega)]])
Rz=s.Matrix([[s.cos(kappa),-s.sin(kappa),0],[s.sin(kappa),s.cos(kappa),0],[0,0,1]])
R=Ry*Rx*Rz
check('rotation orthogonality',s.simplify(R.T*R)==s.eye(3))
check('proper rotation determinant',s.trigsimp(R.det())==1)
X,Y,Z,Cx,Cy,Cz=s.symbols('X Y Z Cx Cy Cz',real=True)
q=R.T*s.Matrix([X-Cx,Y-Cy,Z-Cz])
project=s.Matrix([-f*q[0]/q[2],-f*q[1]/q[2]])
params=[Cx,Cy,Cz,phi,omega,kappa]
J=project.jacobian(params)
fn=s.lambdify([params,[X,Y,Z],f],project,'numpy'); jf=s.lambdify([params,[X,Y,Z],f],J,'numpy')
p=np.array([20.,-40.,1500.,.08,-.05,.12]);ground=np.array([120.,230.,50.])
analytic=jf(p,ground,152.)
errors=[]
for eps in [1e-4,1e-5,1e-6]:
 numeric=np.column_stack([(fn(p+np.eye(6)[j]*eps,ground,152.)-fn(p-np.eye(6)[j]*eps,ground,152.)).ravel()/(2*eps) for j in range(6)])
 error=np.max(np.abs(numeric-analytic)/(1+np.abs(analytic)))
 errors.append(float(error))
 check(f'nonzero-angle Jacobian finite difference {eps}',error<1e-6,error)
rfunc=s.lambdify([phi,omega,kappa],R,'numpy');r=rfunc(*p[3:]);qnum=r.T@(ground-p[:3])
check('rotation round trip',np.allclose(r@qnum+p[:3],ground,atol=1e-10))
check('90-degree kappa rotates x to y',np.allclose(rfunc(0,0,np.pi/2)@np.array([1,0,0]),[0,1,0],atol=1e-12))
left=np.array([0.,0.,1000.]);right=np.array([200.,0.,1000.]);point=np.array([350.,70.,100.])
ray1=point-left;ray2=point-right;baseline=right-left
check('coplanarity determinant',abs(baseline@np.cross(ray1,ray2))<1e-10)
def projection(P,C):
 a=P-C
 return -152*a[:2]/a[2]
check('similarity gauge leaves projection',np.allclose(projection(point,left),projection(point*3,left*3)))
# Least-squares forward intersection from nonparallel synthetic directions.
dirs=[ray1/np.linalg.norm(ray1),ray2/np.linalg.norm(ray2)]
blocks=[np.eye(3)-np.outer(d,d) for d in dirs]
A=sum(blocks);b=sum(B@C for B,C in zip(blocks,[left,right]))
recovered=np.linalg.solve(A,b)
check('forward intersection and reproject',np.linalg.norm(recovered-point)<1e-8,np.linalg.norm(recovered-point))
check('parallel ray degeneracy',np.linalg.matrix_rank(2*blocks[0],tol=1e-10)==2)
# SVD similarity recovery with positive scale, no reflection.
model=np.array([[0.,0.,0.],[100.,0.,0.],[20.,80.,10.],[30.,20.,60.]])
rr=rfunc(.03,-.04,.2);scale=2.3;translation=np.array([400.,-200.,120.])
world=scale*model@rr.T+translation
mc=model-model.mean(0);wc=world-world.mean(0)
uu,ss,vv=np.linalg.svd(mc.T@wc);D=np.eye(3);D[-1,-1]=np.linalg.det(vv.T@uu.T)
fitR=vv.T@D@uu.T;fitScale=np.sum(ss*np.diag(D))/np.sum(mc**2);fitT=world.mean(0)-fitScale*fitR@model.mean(0)
check('absolute orientation known similarity',np.allclose(fitR,rr) and abs(fitScale-scale)<1e-12 and np.allclose(fitT,translation))
check('collinear control diagnostic',np.linalg.matrix_rank(np.array([[0.,0.,0.],[1.,0.,0.],[2.,0.,0.]])-np.array([1.,0.,0.]))==1)
rng=np.random.default_rng(712);design=rng.normal(size=(30,11));weights=np.diag(np.linspace(.5,2,30));normal=design.T@weights@design+np.eye(11)*.1;rhs=rng.normal(size=11)
U,W,V=normal[:5,:5],normal[:5,5:],normal[5:,5:];a,b=rhs[:5],rhs[5:]
schur=U-W@np.linalg.solve(V,W.T);dc=np.linalg.solve(schur,a-W@np.linalg.solve(V,b));dp=np.linalg.solve(V,b-W.T@dc)
check('full weighted damped system equals Schur',np.allclose(np.r_[dc,dp],np.linalg.solve(normal,rhs),atol=1e-10))
# lever is GPS antenna -> camera, expressed in body coordinates.
# Chapter 6 uses camera -> antenna ell, hence ell = -lever and C = A - R ell.
lever=np.array([1.,0.,-.5]);Rbw=rfunc(0,0,np.pi/2);PG=np.array([100.,200.,1000.]);camera=PG+Rbw@lever
check('lever arm endpoint and frame',np.allclose(camera,[100.,201.,999.5]))
check('10 ms at 20 m/s',abs(20*.010-.2)<1e-15)
check('image motion example',abs(152/500*(300/3.6)/500*1000-50.6666666667)<1e-7)
check('GSD pixel count',100e6/.5**2==400e6 and 100e6/.25**2==1600e6)
check('CTE cumulative',abs(.99999**10000-.9048369656)<1e-9)
out={'checks':len(results),'status':'PASS','sympy':s.__version__,'numpy':np.__version__,'results':results}
target=Path(__file__).with_name('photogrammetry-lecture-math.json')
target.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'status':out['status'],'checks':len(results),'JacobianRelativeErrors':errors},ensure_ascii=False))
