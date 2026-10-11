"""Independent checks of expansions and gradients beyond the sample chapters."""
import json
from pathlib import Path
import numpy as np
import torch
rng=np.random.default_rng(42)
checks=[]
def check(name,a,b,tol=1e-10):
    a,b=np.asarray(a),np.asarray(b)
    np.testing.assert_allclose(a,b,atol=tol,rtol=tol)
    checks.append({'name':name,'max_abs_error':float(np.max(np.abs(a-b)))})
def fd(fn,p,h=1e-5):
    out=np.zeros_like(p)
    for i in np.ndindex(p.shape):
        a,b=p.copy(),p.copy();a[i]+=h;b[i]-=h;out[i]=(fn(a)-fn(b))/(2*h)
    return out
X=rng.normal(size=(9,3)); t=rng.normal(size=9)
# A9: compare the distribution's actual log density with every loss reduction.
laplace_y=rng.normal(size=9);scale=1.7;residual=laplace_y-t
lp=torch.distributions.Laplace(torch.tensor(laplace_y),torch.full((9,),scale,dtype=torch.float64))
check('A9 one-observation Laplace NLL',-lp.log_prob(torch.tensor(t)).numpy(),np.log(2*scale)+np.abs(residual)/scale)
check('A9 independent joint NLL',-lp.log_prob(torch.tensor(t)).sum().numpy(),len(t)*np.log(2*scale)+np.abs(residual).sum()/scale)
check('A9 Laplace variance',lp.variance.numpy(),np.full(9,2*scale**2))
other_scales=np.linspace(.4,2.,9)
weighted=torch.distributions.Laplace(torch.tensor(laplace_y),torch.tensor(other_scales))
check('A9 known unequal scales',-weighted.log_prob(torch.tensor(t)).sum().numpy(),np.log(2*other_scales).sum()+(np.abs(residual)/other_scales).sum())
# Continuous Laplace risk has a closed form; independently check its derivative
# against 2F(a)-1. Atoms instead require the two one-sided median inequalities.
location=.8; test_a=-.3
risk=lambda a:abs(a-location)+scale*np.exp(-abs(a-location)/scale)
cdf=lambda a:.5*np.exp((a-location)/scale) if a<location else 1-.5*np.exp(-(a-location)/scale)
check('A9 median-risk derivative FD',fd(risk,np.array(test_a)),2*cdf(test_a)-1,1e-8)
atoms=np.array([-1.,0.,2.]);masses=np.array([.2,.6,.2]);med=0.
assert masses[atoms<med].sum()<=.5 and masses[atoms>med].sum()<=.5
check('A9 atomic median minimizes absolute risk',np.sum(masses*abs(atoms-med)),min(np.sum(masses*abs(atoms-a)) for a in atoms))
w=np.linalg.lstsq(X,t,rcond=None)[0];P=X@np.linalg.pinv(X)
check('A6 projection symmetry',P,P.T);check('A6 projection idempotent',P@P,P)
check('A6 residual orthogonality',X.T@(X@w-t),np.zeros(3))
H=X.T@X/len(X);eta=1/np.linalg.eigvalsh(H).max();q=rng.normal(size=3);g=X.T@(X@q-t)/len(X)
L=lambda v:.5*np.mean((X@v-t)**2)
check('A10 exact quadratic loss change',L(q-eta*g)-L(q),-eta*g@g+eta**2/2*g@H@g)
v=rng.normal(size=(5,2));v-=v.mean(0);C=sum(np.outer(n,n) for n in v)/len(v)
check('A11 covariance entries',C,[[np.mean(v[:,i]*v[:,j]) for j in range(2)] for i in range(2)])
prior=np.array([[2.,.3],[.3,1.]]);features=np.array([1.,-.5]);sigma=1.5
cov=np.linalg.inv(np.linalg.inv(prior)+X[:,:2].T@X[:,:2]/sigma)
check('A13 predictive quadratic',features@cov@features,sum(features[i]*cov[i,j]*features[j] for i in range(2) for j in range(2)))
for a in [-2.,-.3,0.,.3,2.]:
    lam=.7;sol=np.sign(a)*max(abs(a)-lam,0);subgrad=(a-sol)/lam
    assert -1<=subgrad<=1
    if sol:check('A14 soft threshold stationarity',sol-a+lam*np.sign(sol),0)
# Fisher direction and special-label LS equivalence.
c1=rng.normal(loc=-1,size=(7,2));c2=rng.normal(loc=1,size=(5,2));m1,m2=c1.mean(0),c2.mean(0)
S1=(c1-m1).T@(c1-m1);S2=(c2-m2).T@(c2-m2);SW=S1+S2;delta=m1-m2;N=len(c1)+len(c2)
check('B3 scatter expansion',S1,[[sum((x[i]-m1[i])*(x[j]-m1[j]) for x in c1) for j in range(2)] for i in range(2)])
lsX=np.c_[np.ones(N),np.r_[c1,c2]];labels=np.r_[np.full(len(c1),N/len(c1)),np.full(len(c2),-N/len(c2))]
ls=np.linalg.lstsq(lsX,labels,rcond=None)[0];fisher=np.linalg.solve(SW,delta);alpha=len(c1)*len(c2)/N
check('B3 LS Fisher equivalence',ls[1:],N/(1+alpha*delta@fisher)*fisher)
# Binary Hessian and multiclass parameter gradients: FD + autograd.
targets=rng.integers(0,2,size=9);p=1/(1+np.exp(-X@q))
bg=X.T@(p-targets)/9;bh=X.T@(p[:,None]*(1-p[:,None])*X)/9
bce=lambda a:np.mean(np.logaddexp(0,X@a)-targets*(X@a))
check('B5 parameter gradient FD',fd(bce,q),bg,1e-8)
check('B5 Hessian FD',np.column_stack([fd(lambda a:(X.T@(1/(1+np.exp(-X@a))-targets)/9)[i],q) for i in range(3)]).T,bh,1e-8)
qt=torch.tensor(q,requires_grad=True,dtype=torch.float64);xt=torch.tensor(X,dtype=torch.float64)
loss=torch.nn.functional.binary_cross_entropy_with_logits(xt@qt,torch.tensor(targets,dtype=torch.float64));loss.backward();check('B5 autograd',qt.grad.numpy(),bg)
W=rng.normal(size=(3,4));T=np.eye(4)[rng.integers(0,4,size=9)]
def ce(weights):
    a=X@weights;m=a.max(1,keepdims=True);return np.mean((m+np.log(np.exp(a-m).sum(1,keepdims=True)))[:,0]-(T*a).sum(1))
a=X@W;Pp=np.exp(a-a.max(1,keepdims=True));Pp/=Pp.sum(1,keepdims=True);cg=X.T@(Pp-T)/9
check('B6 gradient FD',fd(ce,W),cg,1e-8)
wt=torch.tensor(W,requires_grad=True,dtype=torch.float64);tl=torch.nn.functional.cross_entropy(xt@wt,torch.tensor(T.argmax(1)));tl.backward();check('B6 autograd',wt.grad.numpy(),cg)
prob=Pp[0];J=np.diag(prob)-np.outer(prob,prob)
check('B6 Jacobian expansion',J,[[prob[i]*((i==j)-prob[j]) for j in range(4)] for i in range(4)])
check('B6 Jacobian column sums',J.sum(0),np.zeros(4))
ww=rng.normal(size=(2,3));z=rng.normal(size=3);bias=rng.normal(size=2);A=ww@z+bias
check('C1 layer components',A,[sum(ww[j,i]*z[i] for i in range(3))+bias[j] for j in range(2)])
local=1/(1+np.exp(-A));derivative=local*(1-local)
check('C2 layer Jacobian',np.diag(derivative)@ww,[[derivative[j]*ww[j,i] for i in range(3)] for j in range(2)])
# Independent checks for the revised classification and network explanations.
point=rng.normal(size=3);normal=rng.normal(size=3);offset=.4
score=normal@point+offset;foot=point-score*normal/(normal@normal)
check('B1 boundary foot lies on plane',normal@foot+offset,0)
check('B1 signed geometric distance',(point-foot)@(normal/np.linalg.norm(normal)),score/np.linalg.norm(normal))
check('B5 BCE equals Bernoulli NLL',bce(q),-torch.distributions.Bernoulli(logits=xt@torch.tensor(q)).log_prob(torch.tensor(targets,dtype=torch.float64)).mean().numpy())
shifted=a+3.7;shifted=np.exp(shifted-shifted.max(1,keepdims=True));shifted/=shifted.sum(1,keepdims=True)
check('B6 common score shift preserves probabilities',shifted,Pp)
soft=rng.uniform(size=T.shape);soft/=soft.sum(1,keepdims=True)
def soft_ce(weights):
    logits=X@weights;mx=logits.max(1,keepdims=True)
    logs=logits-mx-np.log(np.exp(logits-mx).sum(1,keepdims=True))
    return -np.mean((soft*logs).sum(1))
soft_grad=X.T@(Pp-soft)/len(X)
check('B6 normalized soft-target gradient FD',fd(soft_ce,W),soft_grad,1e-8)
soft_w=torch.tensor(W,requires_grad=True,dtype=torch.float64)
soft_loss=-(torch.tensor(soft)*torch.log_softmax(xt@soft_w,dim=1)).sum(1).mean();soft_loss.backward()
check('B6 normalized soft-target autograd',soft_w.grad.numpy(),soft_grad)
layer_w=torch.tensor(ww,dtype=torch.float64);layer_b=torch.tensor(bias,dtype=torch.float64)
jac=torch.autograd.functional.jacobian(lambda value:torch.sigmoid(layer_w@value+layer_b),torch.tensor(z,dtype=torch.float64))
check('C2 local Jacobian autograd',jac.numpy(),np.diag(derivative)@ww)
report={'status':'PASS','count':len(checks),'checks':checks,'scope':'Numerical checks of published element expansions, equivalent directions and objective gradients; general conditions also reviewed in prose.'}
Path('reports/theory-verification.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8');print('Theory checks:',len(checks),'PASS')
