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
# Fisher revision: independently verify the normalized constrained problem,
# its global gap identity and the ratio optimum, rather than only LS equivalence.
fq=delta@fisher;alpha_f=1/fq;fw=fisher/fq
check('B3 projected mean difference',c1.mean(0)@fw-c2.mean(0)@fw,delta@fw)
check('B3 projected within-class scatter',np.square((c1-m1)@fw).sum()+np.square((c2-m2)@fw).sum(),fw@SW@fw)
check('B3 fixed-distance constraint',delta@fw,1.)
check('B3 constrained minimum scatter',fw@SW@fw,1/fq)
lagrange=lambda weights:weights@SW@weights-2*alpha_f*(delta@weights-1)
check('B3 constrained Lagrangian gradient FD',fd(lagrange,fw),np.zeros_like(fw),1e-8)
fw_t=torch.tensor(fw,requires_grad=True,dtype=torch.float64)
lag_t=fw_t@torch.tensor(SW)@fw_t-2*alpha_f*(torch.tensor(delta)@fw_t-1)
lag_t.backward();check('B3 constrained Lagrangian autograd',fw_t.grad.numpy(),np.zeros_like(fw))
perturb=rng.normal(size=(16,2));perturb-=((perturb@delta)/(delta@delta))[:,None]*delta
candidates=fw+perturb
candidate_q=np.einsum('bi,ij,bj->b',candidates,SW,candidates)
gaps=np.einsum('bi,ij,bj->b',perturb,SW,perturb)
check('B3 feasible-perturbation global gap',candidate_q-fw@SW@fw,gaps)
assert np.all(candidate_q>=fw@SW@fw-1e-12)
chol=np.linalg.cholesky(SW)
left=np.linalg.solve(chol,np.outer(delta,delta))
whitened=np.linalg.solve(chol,left.T).T
check('B3 maximum ratio generalized eigensystem',np.linalg.eigvalsh(whitened).max(),fq)
ratio=lambda weights:(weights@delta)**2/(weights@SW@weights)
check('B3 ratio unchanged by normalization',ratio(fisher),ratio(fw))
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
# C2: compare forward Jacobian composition and backward sensitivity with
# independent automatic differentiation in a three-layer smooth network.
weights=[rng.normal(size=(4,3)),rng.normal(size=(3,4)),rng.normal(size=(2,3))]
biases=[rng.normal(size=w.shape[0]) for w in weights]
start=rng.normal(size=3);current=start.copy();composed=np.eye(3)
for wi,bi in zip(weights,biases):
    current=1/(1+np.exp(-(wi@current+bi)))
    composed=np.diag(current*(1-current))@wi@composed
weight_t=[torch.tensor(wi,dtype=torch.float64) for wi in weights]
bias_t=[torch.tensor(bi,dtype=torch.float64) for bi in biases]
def network(value):
    for wi,bi in zip(weight_t,bias_t):value=torch.sigmoid(wi@value+bi)
    return value
input_t=torch.tensor(start,dtype=torch.float64)
check('C2 composed forward Jacobian autograd',composed,torch.autograd.functional.jacobian(network,input_t).numpy())
input_grad=torch.tensor(start,requires_grad=True,dtype=torch.float64)
output=network(input_grad);loss=.5*(output**2).sum();loss.backward()
check('C2 backward transposed Jacobian autograd',composed.T@current,input_grad.grad.numpy())
# Second/third lecture re-audit: check the actual newly explained routes.
MW=rng.normal(size=(3,2));MT=rng.normal(size=(9,2));ME=X@MW-MT
multi_ls=lambda weights:.5*np.square(X@weights-MT).sum()/len(X)
check('B2 per-output least-squares gradient FD',fd(multi_ls,MW),X.T@ME/len(X),1e-8)
mwt=torch.tensor(MW,requires_grad=True,dtype=torch.float64)
mloss=.5*((xt@mwt-torch.tensor(MT))**2).sum()/len(X);mloss.backward()
check('B2 per-output least-squares autograd',mwt.grad.numpy(),X.T@ME/len(X))
phi=rng.normal(size=3);tag=-1.;eta_p=.3
negative=-tag*phi
perceptron=lambda value:max(0.,-tag*(value@phi))
check('B4 negative-margin gradient FD',fd(perceptron,negative),-tag*phi,1e-8)
zero=np.zeros(3);selected=-tag*phi;trials=rng.normal(size=(24,3))
slacks=np.array([perceptron(trial)-perceptron(zero)-selected@(trial-zero) for trial in trials])
assert np.all(slacks>=-1e-12)
check('B4 zero-margin subgradient supporting inequality',np.minimum(slacks,0),np.zeros_like(slacks))
new=zero-eta_p*selected
check('B4 zero-margin update improves current margin',tag*(new@phi)-tag*(zero@phi),eta_p*(phi@phi))
logits=np.array([-1000.,-12.,0.,12.,1000.]);binary=np.array([1.,0.,1.,1.,0.])
stable_bce=np.maximum(logits,0)+np.log1p(np.exp(-np.abs(logits)))-binary*logits
check('B5 stable logit loss extreme scores',stable_bce,torch.nn.functional.binary_cross_entropy_with_logits(torch.tensor(logits),torch.tensor(binary),reduction='none').numpy())
score=rng.normal(size=4);score_prob=np.exp(score-score.max());score_prob/=score_prob.sum()
lse=lambda value:np.logaddexp.reduce(value)
check('B6 direct log-sum derivative FD',fd(lse,score),score_prob,1e-8)
unnorm=rng.uniform(size=4);unnorm*=2.3/unnorm.sum()
weighted_ce=lambda value:unnorm.sum()*lse(value)-unnorm@value
check('B6 unnormalized target score gradient FD',fd(weighted_ce,score),unnorm.sum()*score_prob-unnorm,1e-8)
Zbatch=rng.normal(size=(5,3));Wbatch=rng.normal(size=(2,3));bbatch=rng.normal(size=2)
check('C1 row-batch equals stacked single-sample forward',Zbatch@Wbatch.T+bbatch,np.stack([Wbatch@row+bbatch for row in Zbatch]))
# Exact enumeration avoids sampling noise in the initialization moment identity.
from itertools import product
signs=np.array(list(product([-1.,1.],repeat=3)));init_scale=.4
preacts=(signs*init_scale)@np.ones(3)
check('C2 independent zero-mean weight second moment',np.mean(preacts**2),3*init_scale**2)
check('C2 symmetric ReLU halves second moment',np.mean(np.maximum(preacts,0)**2),.5*np.mean(preacts**2))
Cz=rng.normal(size=(4,3));CU=rng.normal(size=(2,3));Cc=rng.normal(size=2)
CV=rng.normal(size=(1,2));Cb=rng.normal(size=1);Ct=rng.normal(size=(4,1))
CA=Cz@CU.T+Cc;CZ=np.tanh(CA);CY=CZ@CV.T+Cb;CD=CY-Ct
hidden_delta=(CD@CV)*(1-CZ**2)
manual_batch=[hidden_delta.T@Cz/len(Cz),hidden_delta.mean(0),CD.T@CZ/len(Cz),CD.mean(0)]
tU=torch.tensor(CU,requires_grad=True);tc=torch.tensor(Cc,requires_grad=True)
tV=torch.tensor(CV,requires_grad=True);tb=torch.tensor(Cb,requires_grad=True)
ty=torch.tanh(torch.tensor(Cz)@tU.T+tc)@tV.T+tb
tloss=.5*((ty-torch.tensor(Ct))**2).sum()/len(Cz);tloss.backward()
check('C4 batched hidden weight and bias autograd',np.r_[manual_batch[0].ravel(),manual_batch[1]],np.r_[tU.grad.numpy().ravel(),tc.grad.numpy()])
check('C4 batched output weight and bias autograd',np.r_[manual_batch[2].ravel(),manual_batch[3]],np.r_[tV.grad.numpy().ravel(),tb.grad.numpy()])
# For a cubic, the central-difference error is exactly h^2 times its cubic coefficient.
cubic=lambda value:value**3+.7*value**2-.2*value
center=.6;step=.01;approx=(cubic(center+step)-cubic(center-step))/(2*step)
check('C5 central-difference quadratic error identity',approx-(3*center**2+1.4*center-.2),step**2)
report={'status':'PASS','count':len(checks),'checks':checks,'scope':'Numerical checks of published element expansions, equivalent directions and objective gradients; general conditions also reviewed in prose.'}
Path('reports/theory-verification.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8');print('Theory checks:',len(checks),'PASS')
