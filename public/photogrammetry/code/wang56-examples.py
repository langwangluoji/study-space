"""Original teaching examples, not copied textbook exercise data.
Run with Python + NumPy. R maps camera to auxiliary/world axes.
The Rodrigues rotation vector below is a computational supplement, not the
book's phi/omega/kappa angle convention. All projection lengths are mm,
all object coordinates m, rotation vectors rad.
"""
import json
from pathlib import Path
import numpy as np

def rotation(w):
    a = np.linalg.norm(w)
    K = np.array([[0., -w[2], w[1]], [w[2], 0., -w[0]], [-w[1], w[0], 0.]])
    if a < 1e-12:
        return np.eye(3) + K + K @ K / 2
    return np.eye(3) + np.sin(a)/a*K + (1-np.cos(a))/a**2*(K@K)

def project(theta, points):
    q = (points-theta[:3]) @ rotation(theta[3:])
    return (-150*q[:, :2]/q[:, 2, None]).ravel()

points = np.array([[-200.,-150.,0.], [200.,-150.,30.], [200.,150.,80.],
                   [-200.,150.,20.], [0.,-80.,100.], [70.,90.,50.]])
truth = np.array([0.,0.,1000.,0.,0.,0.])
obs = project(truth, points)
theta = np.array([10.,-8.,1020.,.003,-.002,.004])
iterations=[]
for i in range(8):
    predicted = project(theta, points)
    steps=np.array([1e-3,1e-3,1e-3,1e-7,1e-7,1e-7])
    J=np.column_stack([(project(theta+np.eye(6)[j]*steps[j],points)-
                        project(theta-np.eye(6)[j]*steps[j],points))/(2*steps[j]) for j in range(6)])
    delta=np.linalg.lstsq(J,obs-predicted,rcond=None)[0]
    iterations.append({'iteration':i+1,'theta_before':theta.tolist(),'delta':delta.tolist(),
                       'rms_image_before_mm':float(np.sqrt(np.mean((obs-predicted)**2))),
                       'rank':int(np.linalg.matrix_rank(J))})
    theta+=delta
    if np.linalg.norm(delta[:3])<1e-8 and np.linalg.norm(delta[3:])<1e-11:
        break
assert np.allclose(theta,truth,atol=1e-7)
# A textbook-style XZ intersection in the shared world/auxiliary axes.
# Camera centers have +Z upward; image plane z=-f; R1=R2=I.
C1=np.array([0.,0.,1000.]);C2=np.array([300.,0.,1000.])
r1=np.array([30.,15.,-150.]);r2=np.array([-15.,15.,-150.])
N=np.linalg.solve(np.column_stack([r1[[0,2]],-r2[[0,2]]]),(C2-C1)[[0,2]])
P1=C1+N[0]*r1;P2=C2+N[1]*r2
assert np.allclose(P1,[200,100,0]) and np.allclose(P2,P1)
# A deliberately tiny, fully visible block least-squares system.
A=np.array([[1.],[1.],[0.]])
B=np.array([[1.],[0.],[1.]])
l=np.array([3.1,1.,2.])
Ncc=A.T@A;Ncp=A.T@B;Npp=B.T@B
nc=A.T@l;np_=B.T@l
S=Ncc-Ncp@np.linalg.solve(Npp,Ncp.T)
rhs=nc-Ncp@np.linalg.solve(Npp,np_)
dc=np.linalg.solve(S,rhs);dp=np.linalg.solve(Npp,np_-Ncp.T@dc)
full=np.linalg.lstsq(np.column_stack([A,B]),l,rcond=None)[0]
assert np.allclose(np.r_[dc,dp],full)
v=A@dc+B@dp-l
rmse=np.sqrt(np.mean(np.array([.1,-.1,.2,-.2])**2))
result={'convention':'R camera->world; q=R.T(P-C); x=-f*qx/qz; f=150 mm',
        'control_points_m':points.tolist(),'image_observations_mm':obs.reshape(-1,2).tolist(),
        'resection':iterations,'recovered_camera':theta.tolist(),
        'intersection':{'N_m_per_mm':N.tolist(),'P_m':P1.tolist()},
        'schur':{'Ncc':Ncc.tolist(),'Ncp':Ncp.tolist(),'Npp':Npp.tolist(),
                 'nc':nc.tolist(),'np':np_.tolist(),'S':S.tolist(),'rhs':rhs.tolist(),
                 'delta_c':dc.tolist(),'delta_p':dp.tolist(),'residual':v.tolist(),
                 'sum_squares':float(v@v)},'checkpoint_rmse_m':float(rmse)}
out=Path(__file__).with_name('wang56-examples-output.json')
out.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
