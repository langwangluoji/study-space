"""Symbolic identities plus independent high-precision geometry checks.
Run: python scripts/verify_geodesy.py (SymPy 1.14, mpmath 1.3).
Domain: a >= b > 0, 0 <= e² < 1; non-polar latitude charts where stated.
"""
from pathlib import Path
import json
import sympy as sp
import mpmath as mp

checks=[]
a=sp.symbols('a',positive=True)
B,L,u,A=sp.symbols('B L u A',real=True)
q=sp.symbols('q',positive=True)  # Additional domain restriction q < 1 is explicit.
W=sp.sqrt(1-q*sp.sin(B)**2)
N=a/W
M=a*(1-q)/W**3
r=sp.Matrix([N*sp.cos(B)*sp.cos(L),N*sp.cos(B)*sp.sin(L),N*(1-q)*sp.sin(B)])
north=sp.Matrix([-sp.sin(B)*sp.cos(L),-sp.sin(B)*sp.sin(L),sp.cos(B)])
east=sp.Matrix([-sp.sin(L),sp.cos(L),0])
up=sp.Matrix([sp.cos(B)*sp.cos(L),sp.cos(B)*sp.sin(L),sp.sin(B)])

def zero(expr):
    result=sp.trigsimp(sp.simplify(expr))
    assert result==0,result

for component in r.diff(B)-M*north: zero(component)
for component in r.diff(L)-N*sp.cos(B)*east: zero(component)
zero((r[0]**2+r[1]**2)/a**2+r[2]**2/(a**2*(1-q))-1)
for component in east.cross(north)-up: zero(component)
zero(r.diff(B).dot(r.diff(L)))
zero(r.diff(B).dot(r.diff(B))-M**2)
zero(r.diff(L).dot(r.diff(L))-N**2*sp.cos(B)**2)
zero(r.diff(B).diff(L).dot(up))
checks.append('symbolic ellipsoid equation, tangents, orientation, metric and zero mixed second form')

b=sp.symbols('b',positive=True)
ru=sp.Matrix([-a*sp.sin(u),0,b*sp.cos(u)])
ruu=ru.diff(u)
zero(ru.cross(ruu).dot(ru.cross(ruu))-a**2*b**2)
checks.append('symbolic meridian curvature numerator')
zero(M.subs(q,0)-a)
zero(N.subs(q,0)-a)
zero(M.subs(B,0)-a*(1-q))
zero(M.subs(B,sp.pi/2)**2-a**2/(1-q))
zero((M-N).subs(B,sp.pi/2))
checks.append('symbolic spherical, equatorial and polar limits')

z,e=sp.symbols('z e',real=True)
primitive=z/(2*(1-e**2*z**2))+sp.atanh(e*z)/(2*e)
zero(sp.diff(primitive,z)-1/(1-e**2*z**2)**2)
surface=2*sp.pi*a**2*(1+(1-e**2)*sp.atanh(e)/e)
assert sp.limit(surface,e,0)==4*sp.pi*a**2
checks.append('symbolic area antiderivative and spherical surface area limit')

A0=1+sp.Rational(3,4)*q+sp.Rational(45,64)*q**2+sp.Rational(175,256)*q**3
A2=sp.Rational(3,8)*q+sp.Rational(15,32)*q**2+sp.Rational(525,1024)*q**3
A4=sp.Rational(15,256)*q**2+sp.Rational(105,1024)*q**3
A6=sp.Rational(35,3072)*q**3
meridian_series=a*(1-q)*(A0*B-A2*sp.sin(2*B)+A4*sp.sin(4*B)-A6*sp.sin(6*B))
integrand_series=a*(1-q)*(1+sp.Rational(3,2)*q*sp.sin(B)**2+sp.Rational(15,8)*q**2*sp.sin(B)**4+sp.Rational(35,16)*q**3*sp.sin(B)**6)
zero(sp.expand_trig(sp.diff(meridian_series,B)-integrand_series))
checks.append('symbolic derivative of the published e6 meridian series')

mp.mp.dps=45
av=mp.mpf('6378137')
fv=1/mp.mpf('298.257223563')
qv=2*fv-fv*fv
bv=av*(1-fv)
def radii(lat):
    w=mp.sqrt(1-qv*mp.sin(lat)**2)
    return av*(1-qv)/w**3,av/w
def xyz(lat,lon):
    _,n=radii(lat)
    return mp.matrix([n*mp.cos(lat)*mp.cos(lon),n*mp.cos(lat)*mp.sin(lon),n*(1-qv)*mp.sin(lat)])
for deg in [-80,-45,0,45,80]:
    lat=mp.radians(deg)
    x,y,zv=xyz(lat,mp.mpf('.7'))
    assert abs((x*x+y*y)/(av*av)+zv*zv/(bv*bv)-1)<mp.mpf('1e-40')
    phi=mp.atan2(zv,mp.sqrt(x*x+y*y))
    assert abs(phi-mp.atan2((1-qv)*mp.sin(lat),mp.cos(lat)))<mp.mpf('1e-40')
    du=mp.atan2(mp.sqrt(1-qv)*mp.sin(lat),mp.cos(lat))
    assert abs(av*mp.cos(du)-mp.sqrt(x*x+y*y))<mp.mpf('1e-35')
    db=mp.matrix([mp.diff(lambda t:xyz(t,mp.mpf('.7'))[i],lat) for i in range(3)])
    dl=mp.matrix([mp.diff(lambda t:xyz(lat,t)[i],mp.mpf('.7')) for i in range(3)])
    m,n=radii(lat)
    assert abs(mp.norm(db)/m-1)<mp.mpf('1e-35')
    assert abs(mp.norm(dl)/(n*mp.cos(lat))-1)<mp.mpf('1e-35')
checks.append('high-precision independent latitude and tangent checks at five latitudes')

m,n=radii(mp.radians(45))
ra=lambda t:m*n/(n*mp.cos(t)**2+m*mp.sin(t)**2)
average=mp.quad(ra,[0,mp.pi/2,mp.pi,3*mp.pi/2,2*mp.pi])/(2*mp.pi)
assert abs(average/mp.sqrt(m*n)-1)<mp.mpf('1e-35')
assert m<=ra(mp.mpf('.4'))<=n
checks.append('independent directional-radius integral and bounds')

# Two curves on a paraboloid share a tangent but have different tangential bending.
ang=mp.mpf('.4')
k1,k2=mp.mpf('.2'),mp.mpf('.3')
expected=k1*mp.cos(ang)**2+k2*mp.sin(ang)**2
for c in [0,mp.mpf('1.7')]:
    t0=mp.matrix([mp.cos(ang),mp.sin(ang),0])
    acceleration=mp.matrix([0,c,expected])
    principal=acceleration-t0*(acceleration[0]*t0[0]+acceleration[1]*t0[1])
    curvature=mp.norm(principal)
    cosine=principal[2]/curvature
    assert abs(curvature*cosine-expected)<mp.mpf('1e-40')
checks.append('Meusnier/Euler projection for distinct curves with a common tangent')

s=lambda lat:mp.quad(lambda t:radii(t)[0],[0,lat])
pole=s(mp.pi/2)
def inverse(distance):
    if abs(distance)>pole: raise ValueError('arc outside ellipsoid latitude domain')
    lo,hi=-mp.pi/2,mp.pi/2
    lat=distance/av
    for iteration in range(80):
        value=s(lat)-distance
        if abs(value)<mp.mpf('1e-20'): return lat,iteration
        if value>0:hi=lat
        else:lo=lat
        candidate=lat-value/radii(lat)[0]
        lat=candidate if lo<candidate<hi else (lo+hi)/2
    raise RuntimeError('no convergence')
roundtrips=[]
for deg in [-89.9,-50,0,50,89.9]:
    lat=mp.radians(deg)
    solved,iterations=inverse(s(lat))
    assert abs(solved-lat)<mp.mpf('1e-25')
    roundtrips.append({'latitude_deg':deg,'iterations':iterations,'arc_residual_m':float(abs(s(solved)-s(lat)))})
try:inverse(pole+1)
except ValueError:pass
else:raise AssertionError('out-of-domain arc accepted')
checks.append('numerical integral/Newton meridian round trips and range rejection')

total=2*mp.pi*av**2*(1+(1-qv)*mp.atanh(mp.sqrt(qv))/mp.sqrt(qv))
integrated=2*mp.pi*mp.quad(lambda lat:radii(lat)[0]*radii(lat)[1]*mp.cos(lat),[-mp.pi/2,0,mp.pi/2])
assert abs(total/integrated-1)<mp.mpf('1e-35')
# Also compare a non-global latitude strip with the antiderivative.
I=lambda zz:zz/(2*(1-qv*zz*zz))+mp.atanh(mp.sqrt(qv)*zz)/(2*mp.sqrt(qv))
lower,upper=mp.radians(-20),mp.radians(60)
strip=mp.mpf('.3')*av**2*(1-qv)*(I(mp.sin(upper))-I(mp.sin(lower)))
strip_integral=mp.mpf('.3')*mp.quad(lambda lat:radii(lat)[0]*radii(lat)[1]*mp.cos(lat),[lower,upper])
assert abs(strip/strip_integral-1)<mp.mpf('1e-35')
checks.append('global and regional area checked by independent quadrature')

report={'status':'PASS','sympy':sp.__version__,'checks':checks,'meridian_roundtrips':roundtrips,'area_m2':float(total),'scope':'core displayed identities and numerical examples, not a full source-text audit'}
Path('reports').mkdir(exist_ok=True)
Path('reports/geodesy-math.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(json.dumps(report,ensure_ascii=False))
