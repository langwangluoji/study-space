"""Independent checks for the course notes; no training/downloads."""
import json
from pathlib import Path
import sys
import numpy as np

ROOT = Path.cwd() / "reports"
ROOT.mkdir(exist_ok=True)
checks = []

def check(name, actual, expected, atol=1e-10):
    a, e = np.asarray(actual, dtype=float), np.asarray(expected, dtype=float)
    error = float(np.max(np.abs(a - e))) if a.size else 0.0
    ok = a.shape == e.shape and np.allclose(a, e, atol=atol, rtol=0)
    checks.append({"name": name, "passed": bool(ok), "max_abs_error": error, "atol": atol})
    if not ok:
        raise AssertionError(f"{name}: {actual} != {expected}")

def finite_difference(f, p, eps=1e-6):
    result = np.zeros_like(p)
    for i in range(p.size):
        h = np.zeros_like(p); h[i] = eps
        result[i] = (f(p+h)-f(p-h))/(2*eps)
    return result

x = np.array([-1.,0.,1.,2.]); t = np.array([0.,1.,1.,4.])
X = np.column_stack((np.ones(4),x))
loss_r = lambda w: 0.5*np.mean((X@w-t)**2)
check("regression_initial_predictions", X@np.array([0.,1.]), [-1,0,1,2])
check("regression_initial_loss", loss_r(np.array([0.,1.])), .75)
w,_,rank,_ = np.linalg.lstsq(X,t,rcond=None)
check("regression_solution", w, [.9,1.2])
check("regression_predictions", X@w, [-.3,.9,2.1,3.3])
check("regression_residuals", X@w-t, [-.3,-.1,1.1,-.7])
check("regression_optimal_loss", loss_r(w), .225)
check("regression_stationarity", X.T@(X@w-t)/4, np.zeros(2))
check("regression_gram", X.T@X, [[4,2],[2,6]])
check("regression_rhs", X.T@t, [6,9])
probe=np.array([.2,-.3]); analytic=X.T@(X@probe-t)/4
check("regression_gradient_finite_difference",finite_difference(loss_r,probe),analytic,2e-9)
ws=np.linalg.lstsq(X,t+1,rcond=None)[0]
check("regression_shifted_target",ws,[1.9,1.2])
check("regression_shifted_loss",.5*np.mean((X@ws-t-1)**2),.225)
Xr=np.ones((2,2)); tr=np.array([1.,3.]); wr=np.linalg.lstsq(Xr,tr,rcond=None)[0]
check("rank_deficient_same_predictions",Xr@wr,Xr@(wr+np.array([1.,-1.])))
for dv in [np.array([.1,.2]),np.array([-1.,3.])]:
    check("optimal_loss_difference_identity",loss_r(w+dv)-loss_r(w),.5*np.mean((X@dv)**2))
H=X.T@X/4
check("hessian_psd",np.linalg.eigvalsh(H)>0,[1,1])
for pred in [-1.,0.,2.,5.]:
    check("conditional_risk_identity",.5*(pred-1)**2+.5*(pred-3)**2,(pred-2)**2+1)
check("single_sample_gradient",np.array([1.,2.])*(-2),[-2,-4])
check("regression_exercise_loss",.5*np.mean(np.array([1.,-3.])**2),2.5)

# Parameter ordering is u1,u2,c1,c2,v1,v2,b.
p=np.array([.5,1.,.5,-.5,.4,-.2,.1])
def forward(params, inputs):
    u,c,v,b=params[:2],params[2:4],params[4:6],params[6]
    a=inputs[:,None]*u+c
    z=np.maximum(a,0)
    return a,z,z@v+b
def manual_grad(params, inputs, targets):
    a,z,y=forward(params,inputs)
    dout=y-targets
    dh=dout[:,None]*params[4:6]*(a>0)
    grad=np.r_[(dh*inputs[:,None]).mean(0),dh.mean(0),z.T@dout/inputs.size,dout.mean()]
    return .5*np.mean(dout*dout),grad
sx=np.array([2.]); st=np.array([1.])
netloss=lambda q:manual_grad(q,sx,st)[0]
loss,g=manual_grad(p,sx,st)
check("network_hidden_preactivations",forward(p,sx)[0],[ [1.5,1.5] ])
check("network_prediction",forward(p,sx)[2],[.4])
check("network_initial_loss",loss,.18)
check("network_all_gradients",g,[-.48,.24,-.24,.12,-.9,-.9,-.6])
errors=[]
for eps in [1e-4,1e-5,1e-6]:
    ng=finite_difference(netloss,p,eps)
    check(f"network_finite_difference_eps_{eps}",ng,g,2e-9)
    errors.append({"epsilon":eps,"max_abs_error":float(np.max(np.abs(ng-g)))})
pn=p-.1*g
check("network_updated_parameters",pn,[.548,.976,.524,-.512,.49,-.11,.16])
check("network_updated_hidden",forward(pn,sx)[0],[[1.62,1.44]])
check("network_updated_prediction",forward(pn,sx)[2],[.7954])
check("network_updated_loss",netloss(pn),.5*(.7954-1)**2)
check("network_input_path_cancellation",(-.24)*.5+.12*1,0)
branch=lambda z:.5*(3*z-5)**2+.5*z*z
for z,expected in [(2.,5.),(1.,-5.)]:
    check("branch_derivative",(branch(z+1e-6)-branch(z-1e-6))/2e-6,expected,2e-9)
check("outer_product_exercise",np.outer([.2,-.1],[2.,3.]),[[.4,.6],[-.2,-.3]])
Z=np.array([[2.,1.],[1.,3.]]); Delta=np.array([[.2],[-.4]])
check("batch_weight_example",(Delta.T@Z/2)[0],[0.,-.5])
check("batch_bias_example",Delta.mean(0),[-.1])
bx=np.array([1.,2.,3.]); bt=np.array([0.,1.,1.5])
bl,bg=manual_grad(p,bx,bt)
check("batch_finite_difference",finite_difference(lambda q:manual_grad(q,bx,bt)[0],p),bg,2e-9)
check("batch_average_once",bg,np.mean([manual_grad(p,np.array([xx]),np.array([tt]))[1] for xx,tt in zip(bx,bt)],axis=0))

def softmax(a):
    e=np.exp(a-np.max(a));return e/e.sum()
logits=np.array([-.4,.6,1.1]); target=np.array([0.,1.,0.])
prob=softmax(logits)
ce=lambda a:np.log(np.exp(a-np.max(a)).sum())+np.max(a)-target@a
check("softmax_ce_gradient",finite_difference(ce,logits),prob-target,2e-9)
for tt in [0.,1.]:
    a=.3; pp=1/(1+np.exp(-a))
    bce=lambda aa:np.logaddexp(0,aa)-tt*aa
    check("sigmoid_bce_gradient",(bce(a+1e-6)-bce(a-1e-6))/2e-6,pp-tt,2e-9)

autograd={"available":False}
try:
    import torch
    q=torch.tensor(p,dtype=torch.float64,requires_grad=True)
    def torch_loss(params, inputs, targets):
        aa=inputs[:,None]*params[:2]+params[2:4]
        yy=torch.relu(aa)@params[4:6]+params[6]
        return .5*((yy-targets)**2).mean()
    for label,xx,tt,expected in [("single",sx,st,g),("batch",bx,bt,bg)]:
        q.grad=None
        tl=torch_loss(q,torch.tensor(xx,dtype=torch.float64),torch.tensor(tt,dtype=torch.float64))
        tl.backward()
        check("torch_autograd_"+label,q.grad.detach().numpy(),expected,1e-12)
    autograd={"available":True,"torch_version":torch.__version__,"dtype":"float64","device":"cpu"}
except ImportError as exc:
    raise RuntimeError("PyTorch is required for gradient verification") from exc

report={"passed":all(c["passed"] for c in checks),"checks":checks,"count":len(checks),"python":sys.version.split()[0],"numpy":np.__version__,"autograd":autograd,"finite_difference":errors,"regression_solution":w.tolist(),"network_gradient":g.tolist(),"network_new_loss":float(netloss(pn)),"boundary":"Numerical checks validate these examples and implementations, not every general theorem or learner comprehension."}
(ROOT/"math-verification.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf8")
print(json.dumps({k:v for k,v in report.items() if k!="checks"},ensure_ascii=False,indent=2))
