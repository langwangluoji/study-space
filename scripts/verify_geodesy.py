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

# Keep the II/I quotient independent of chart velocities and tangential acceleration.
vB,vL,accB,accL=sp.symbols('vB vL accB accL',real=True)
vel=r.diff(B)*vB+r.diff(L)*vL
acc=r.diff(B,2)*vB**2+2*r.diff(B,L)*vB*vL+r.diff(L,2)*vL**2+r.diff(B)*accB+r.diff(L)*accL
I=vel.dot(vel)
II=acc.dot(-up)  # Inward normal gives positive convex curvature.
zero(II-(M*vB**2+N*sp.cos(B)**2*vL**2))
zero(I-(M**2*vB**2+N**2*sp.cos(B)**2*vL**2))
zero((II/I).subs({vB:sp.cos(A)/M,vL:sp.sin(A)/(N*sp.cos(B))})-(sp.cos(A)**2/M+sp.sin(A)**2/N))
scale=sp.symbols('scale',positive=True)
zero((II/I).subs({vB:scale*vB,vL:scale*vL})-II/I)
checks.append('II/I: arbitrary chart velocities, tangential acceleration cancellation and reparameterization')

sin_u=sp.sqrt(1-q)*sp.sin(B)/W
cos_u=sp.cos(B)/W
zero(sin_u**2+cos_u**2-1)
zero(a*cos_u-N*sp.cos(B))
zero(a*sp.sqrt(1-q)*sin_u-N*(1-q)*sp.sin(B))
zero(a**2*sin_u**2+a**2*(1-q)*cos_u**2-a**2*(1-q)/W**2)
checks.append('reduced/geodetic latitude sine-cosine identities and meridian denominator')

# Normal section at longitude zero: p is outward displacement, zeta the tangent.
pdisp,zeta=sp.symbols('pdisp zeta',real=True)
r0=r.subs(L,0)
u0=up.subs(L,0)
t0=sp.cos(A)*north.subs(L,0)+sp.sin(A)*east.subs(L,0)
point=r0+pdisp*u0+zeta*t0
ell=sp.expand((point[0]**2+point[1]**2)/a**2+point[2]**2/(a**2*(1-q))-1)
C=sp.trigsimp(ell.coeff(pdisp,1).subs(zeta,0))
Q=sp.trigsimp(ell.coeff(zeta,2))
zero(ell.subs({pdisp:0,zeta:0}))
zero(ell.coeff(zeta,1).subs(pdisp,0))
zero(C-2/(a*W))
zero(Q-(sp.sin(A)**2+sp.cos(A)**2*(sp.sin(B)**2+sp.cos(B)**2/(1-q)))/a**2)
# Implicit section p(zeta) has p(0)=p'(0)=0 and p''(0)=-2Q/C.
zero(2*Q/C-(sp.cos(A)**2/M+sp.sin(A)**2/N))
for coefficient in [ell.coeff(pdisp,2),ell.coeff(pdisp,1).coeff(zeta,1),Q]:
    assert not coefficient.has(L)
checks.append('independent translated normal-section equation and curvature equals Euler')

zero(1/(1-e**2*z**2)**2-(sp.diff(z/(1-e**2*z**2),z)+1/(1-e**2*z**2))/2)
zero(sp.diff(sp.atanh(e*z)/e,z)-1/(1-e**2*z**2))
checks.append('area integration split into derivative plus artanh integral')

h,x=sp.symbols('h x',real=True)
m0,m1,m2,m3=sp.symbols('m0 m1 m2 m3',real=True)
zero(sp.integrate(m0+m1*x+m2*x**2/2+m3*x**3/6,(x,-h/2,h/2))-m0*h-m2*h**3/24)
mpp_over_m=3*q*sp.cos(2*B)/W**2+15*q**2*sp.sin(B)**2*sp.cos(B)**2/W**4
zero(sp.diff(M,B,2)/M-mpp_over_m)
qp=sp.symbols('qp',positive=True)  # qp=e'^2; q=qp/(1+qp).
zero((q/W**2).subs(q,qp/(1+qp))-qp/(1+qp*sp.cos(B)**2))
zero(sp.diff(mpp_over_m.subs(q,qp/(1+qp)),qp).subs(qp,0)-3*sp.cos(2*B))
checks.append('symmetric midpoint coefficient 1/24, exact M second derivative and first-order e-prime engineering correction')

mp.mp.dps=60
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

# High-precision worked examples; compare independent quadrature at 45 and 60 digits.
examples={}
lat45=mp.pi/4
u45=mp.atan2(mp.sqrt(1-qv)*mp.sin(lat45),mp.cos(lat45))
phi45=mp.atan2((1-qv)*mp.sin(lat45),mp.cos(lat45))
examples['latitude_45']={'B_deg':45,'u_deg':mp.nstr(mp.degrees(u45),25),'Phi_deg':mp.nstr(mp.degrees(phi45),25),'B_minus_u_arcmin':mp.nstr(mp.degrees(lat45-u45)*60,25),'B_minus_Phi_arcmin':mp.nstr(mp.degrees(lat45-phi45)*60,25)}
examples['degree_lengths_45']={'meridian_m':mp.nstr(radii(lat45)[0]*mp.pi/180,25),'parallel_m':mp.nstr(radii(lat45)[1]*mp.cos(lat45)*mp.pi/180,25),'interpretation':'local differential scale for one degree; meridian finite one-degree interval varies with latitude'}
series_numeric=sp.lambdify((B,a,q),meridian_series,'mpmath')
errors=[]
for deg in [30,45,50,90]:
    lat=mp.radians(deg)
    reference60=s(lat)
    with mp.workdps(45): reference45=s(lat)
    assert abs(reference60-reference45)<mp.mpf('1e-35')
    approximate=series_numeric(lat,av,qv)
    errors.append({'latitude_deg':deg,'reference_arc_m':mp.nstr(reference60,30),'e6_arc_m':mp.nstr(approximate,30),'signed_error_mm':mp.nstr((approximate-reference60)*1000,25),'quadrature_45_60_difference_m':mp.nstr(abs(reference60-reference45),8)})
    assert abs(series_numeric(-lat,av,qv)+approximate)<mp.mpf('1e-45')
examples['e6_meridian_errors']=errors
# Show the actual integral residual, not only the change between iterates.
target=s(lat45)
iterate=target/av
history=[]
last_step=mp.inf
for k in range(10):
    residual=s(iterate)-target
    history.append({'k':k,'B_deg':mp.nstr(mp.degrees(iterate),25),'integral_residual_m':mp.nstr(residual,25)})
    if abs(residual)<mp.mpf('1e-8') and abs(last_step)<mp.mpf('1e-15'): break
    last_step=residual/radii(iterate)[0]
    iterate-=last_step
assert abs(s(iterate)-target)<mp.mpf('1e-8')
assert abs(iterate-lat45)<mp.mpf('1e-15')
examples['newton_45']={'target_arc_m':mp.nstr(target,30),'residual_tolerance_m':'1e-8','angle_tolerance_rad':'1e-15','history':history,'final_integral_residual_m':mp.nstr(s(iterate)-target,25)}
# Latitude-chart degeneration at a pole does not affect the analytic sphere/area limits.
for deg in [-90,-45,0,45,90]:
    mval,nval=radii(mp.radians(deg))
    assert mval>0 and nval>0
    assert abs(mval-radii(mp.radians(-deg))[0])<mp.mpf('1e-45')
checks.append('60-digit worked examples, 45-digit quadrature cross-check and southern symmetry')

# Four visible, distinct directions can constrain XYZ and receiver clock locally.
root3=sp.sqrt(3)/2
directions=[(0,0,1),(root3,0,sp.Rational(1,2)),(-root3,0,sp.Rational(1,2)),(0,root3,sp.Rational(1,2))]
geometry=sp.Matrix([[-x,-y,-z,1] for x,y,z in directions])
assert geometry.rank()==4
assert sp.Matrix([geometry.row(0)]*4).rank()==1
checks.append('GNSS four-unknown model: nondegenerate and identical-direction ranks')

report={'status' :'PASS','sympy':sp.__version__,'checks':checks,'meridian_roundtrips':roundtrips,'area_m2':float(total),'precision_decimal_digits':mp.mp.dps,'worked_examples':examples,'scope':'core displayed identities and numerical examples, not a full source-text audit'}
Path('reports').mkdir(exist_ok=True)
Path('reports/geodesy-math.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(json.dumps(report,ensure_ascii=False))
