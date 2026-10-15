"""Independent exact/numeric checks for the step-by-step teaching supplements."""
from pathlib import Path
import json
import sympy as s
import numpy as np
checks=[]
def ok(name, value):
    assert bool(value), name
    checks.append({'name':name,'status':'PASS'})
f,H,Z,X,B,p=s.symbols('f H Z X B p',positive=True)
x=f*X/(H-Z)
ok('height image derivative',s.simplify(s.diff(x,Z)-x/(H-Z))==0)
ok('horizontal image derivative',s.diff(x,X)==f/(H-Z))
ok('depth sensitivity',s.simplify(s.diff(f*B/p,p)+f*B/p**2)==0)
u,v=s.symbols('u v',real=True)
weights=[(1-u)*(1-v),u*(1-v),(1-u)*v,u*v]
ok('bilinear partition of unity',s.expand(sum(weights))==1)
ok('bilinear sample',sum(w.subs({u:s.Rational(1,4),v:s.Rational(1,2)})*z for w,z in zip(weights,[10,20,30,40]))==s.Rational(45,2))
L=s.Matrix([10,20,30]);R=s.Matrix([20,30,40]);l=L-s.ones(3,1)*sum(L)/3;r=R-s.ones(3,1)*sum(R)/3
ok('NCC positive affine brightness',s.simplify(l.dot(r)/s.sqrt(l.dot(l)*r.dot(r)))==1)
ok('NCC negative brightness',s.simplify(l.dot(-r)/s.sqrt(l.dot(l)*r.dot(r)))==-1)
M=s.Matrix([[0,2,0],[0,0,2],[1,1,1]])
w=M.inv()*s.Matrix([s.Rational(1,2),s.Rational(1,2),1])
ok('TIN barycentric weights',w==s.Matrix([s.Rational(1,2),s.Rational(1,4),s.Rational(1,4)]))
ok('TIN elevation',w.dot(s.Matrix([10,16,22]))==s.Rational(29,2))
e=s.Matrix([s.Rational(1,10),-s.Rational(1,10),s.Rational(2,10),-s.Rational(2,10)])
mean=sum(e)/len(e);mse=sum(a*a for a in e)/len(e)
ok('RMSE decomposition',s.simplify(mse-sum((a-mean)**2 for a in e)/len(e)-mean**2)==0)
ok('RMSE numerical example',abs(float(s.sqrt(mse))-.158113883)<1e-9)
ok('GSD unit ratio',np.isclose(1000*.005/100,.05))
ok('planning baseline',np.isclose(1000**2*5e-6/(.1*.2),250))
ok('planning overlap',np.isclose(1-250/360,11/36))
ok('DOM projected pixels',np.isclose((.15*100/980-.15*100/1000)/1e-5,30.612244897959))
ok('display magnification independent object spacing',np.isclose(1000*.005/100*2,.1))
e1=s.Matrix([2,0,0]);e2=s.Matrix([0,2,0]);n=e1.cross(e2)
ok('triangle normal orthogonality',n.dot(e1)==0 and n.dot(e2)==0)
ok('triangle area and winding',s.sqrt(n.dot(n))/2==2 and e2.cross(e1)==-n)
Path('reports/photogrammetry-learning-derivations-math.json').write_text(json.dumps({'status':'PASS','checks':len(checks),'results':checks},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'{len(checks)} learning derivation checks passed')
