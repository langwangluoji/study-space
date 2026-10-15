"""Independent symbolic and numerical checks of the rewritten 4.1 geometry."""
import json
from pathlib import Path
import sympy as s

checks=[]
def check(label, condition):
    assert bool(condition),label
    checks.append(label)

x,y,h,d,nx,ny,nz=s.symbols('x y h d nx ny nz')
ex,ey,ez,ox,oy,oz=s.symbols('ex ey ez ox oy oz')
p=s.Matrix([x,y,h]); n=s.Matrix([nx,ny,nz]); e=s.Matrix([ex,ey,ez]); o=s.Matrix([ox,oy,oz])
den=n.dot(p); lam=d/den; t=lam*p
check('ray intersection lies on target plane',s.simplify(n.dot(t)-d)==0)
X=e.dot(t-o)
collected=(d*e.dot(p)-e.dot(o)*den)/den
check('plane-axis coordinate equals stated common-denominator expression',s.simplify(X-collected)==0)
poly=s.Poly(s.expand(d*e.dot(p)-e.dot(o)*den),x,y)
check('target coordinate numerator affine in input plane coordinates',poly.total_degree()<=1)
for xx,yy in [(1,s.Rational(1,2)),(0,2),(-2,1)]:
    ll=2/(1-s.Rational(1,5)*xx)
    T=s.Matrix([ll*xx,ll*yy,ll])
    check('sloping plane closure '+str((xx,yy)),s.simplify(T[2]-2-s.Rational(1,5)*T[0])==0)
check('worked example exact values',s.Matrix([s.Rational(5,2),s.Rational(5,4),s.Rational(5,2)])==s.Matrix([2/(1-s.Rational(1,5)),1/(1-s.Rational(1,5)),2/(1-s.Rational(1,5))]))
a,b,c,dd,u,v,k=s.symbols('a b c dd u v k',nonzero=True)
f=lambda z:(a*z+b)/(c*z+dd)
check('projective pair difference cancellation',s.simplify(f(u)-f(v)-(a*dd-b*c)*(u-v)/((c*u+dd)*(c*v+dd)))==0)
check('common scale invariance',s.simplify((k*a*x+k*b)/(k*c*x+k*dd)-f(x))==0)
H=s.Matrix([[2,0,1],[0,3,-1],[s.Rational(1,10),0,1]])
out=H*s.Matrix([2,1,1])
check('homogeneous worked example',out[0]/out[2]==s.Rational(25,6) and out[1]/out[2]==s.Rational(5,3))
result={'status':'PASS','count':len(checks),'checks':checks,'scope':'New integrated section 4.1; symbolic identity and exact example checks, not proof of pedagogical readability'}
Path('reports/photogrammetry-inline-projectivity-math.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=False))
