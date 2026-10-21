"""Independent numerical checks for the optics derivations and worked examples."""
from pathlib import Path
import math,cmath,json,re,zipfile

root=Path(__file__).resolve().parents[1]
checks=[]
def close(name,actual,expected,rtol=1e-8,atol=1e-12):
    assert abs(actual-expected)<=atol+rtol*abs(expected),(name,actual,expected)
    checks.append({'name':name,'status':'PASS'})

c=299792458.;h=6.62607015e-34;kb=1.380649e-23;e=1.602176634e-19
# Simpson quadrature of Planck's dimensionless integral, not a copied closed form.
count=20000;b=45.;dx=b/count
def integrand(x):return x**3/math.expm1(x) if x else 0.
integral=dx/3*(integrand(0)+integrand(b)+sum((4 if i%2 else 2)*integrand(i*dx) for i in range(1,count)))
close('Planck integral pi^4/15',integral,math.pi**4/15,rtol=1e-9)
sigma=2*math.pi*kb**4/(h**3*c**2)*integral
close('Stefan-Boltzmann constant',sigma,5.670374419e-8,rtol=1e-9)
lo,hi=4.,6.
for _ in range(90):
    mid=(lo+hi)/2
    if 5*(1-math.exp(-mid))-mid>0:lo=mid
    else:hi=mid
x=(lo+hi)/2
close('Wavelength Wien displacement',h*c/(kb*x),2.897771955e-3,rtol=1e-9)
# Direct angular integration of sin^2(theta), including the solid-angle Jacobian.
dt=math.pi/count
ang=2*math.pi*dt/3*sum((4 if i%2 else 2)*math.sin(i*dt)**3 for i in range(1,count))
close('Dipole angular integral',ang,8*math.pi/3)
tau=10e-9;half=1/(2*tau)
close('Lorentz line half maximum',half**2/(half**2+half**2),.5)
close('Natural linewidth MHz',(2*half)/(2*math.pi)/1e6,15.915494309189533)
threshold=.02+math.log(1/(.99*.95))/(2*.5)
close('Cavity round-trip threshold',.99*.95*math.exp(2*(threshold-.02)*.5),1.)
# Substitute the complex displacement into the driven oscillator equation.
w0,w,gamma,wp=3.,1.8,.12,2.
den=w0*w0-w*w-1j*gamma*w
disp=-1/den
close('Lorentz displacement residual',(-w*w-1j*gamma*w+w0*w0)*disp,-1.)
chi=wp*wp/den
assert chi.imag>0
checks.append({'name':'Passive Lorentz susceptibility imaginary sign','status':'PASS'})
drude=wp*wp/(-w*w-1j*gamma*w)
close('Lorentz zero restoring force equals Drude',1+drude,1-wp*wp/(w*(w+1j*gamma)))
gamma_e,K,theta,lu,s=1e4,1.2,2e-5,.03,1
beta=1-(1+K*K/2)/(2*gamma_e**2)
exact=lu*(1/beta-math.cos(theta))/s
approx=lu*(1+K*K/2+gamma_e**2*theta**2)/(2*s*gamma_e**2)
close('FEL small-angle resonance against unexpanded slip',approx,exact,rtol=3e-8,atol=1e-20)
alpha=math.log(4)/.001;lam=500e-9;kappa=alpha*lam/(4*math.pi)
close('Intensity and amplitude attenuation relation',math.exp(-2*(2*math.pi/lam)*kappa*.001),.25)
close('1064nm photon energy eV',h*c/(1064e-9*e),1.1652650228684231)

# Textbook additions: geometry and statistics checked independently of the prose.
lam=600e-9;theta=math.pi/3;k=2*math.pi/lam
spacing=lam/abs(math.cos(theta))
close('Oblique sampling repeats the complex phase',cmath.exp(1j*k*math.cos(theta)*spacing),1.)
close('Oblique sampling period micrometres',spacing/1e-6,1.2)
cone=.7;steps=10000;da=cone/steps
projection=2*math.pi*da*sum(math.sin((i+.5)*da)*math.cos((i+.5)*da) for i in range(steps))
close('Radiance projected cone integral',projection,math.pi*math.sin(cone)**2,rtol=1e-8)
# Compare the same finite Planck band integrated in two different variables.
def midpoint(fn,a,b,n=12000):
    d=(b-a)/n
    return d*sum(fn(a+(i+.5)*d) for i in range(n))
T=1200.;la,lb=2e-6,12e-6
def mnu(nu):return 2*math.pi*h*nu**3/c**2/math.expm1(h*nu/(kb*T))
def mlambda(wl):return 2*math.pi*h*c**2/wl**5/math.expm1(h*c/(wl*kb*T))
close('Blackbody band power invariant under spectral variable',midpoint(mlambda,la,lb),midpoint(mnu,c/lb,c/la),rtol=1e-8)
cherenkov=math.acos(1/(.8*1.5))
close('Cherenkov retarded arrival phase',1-.8*1.5*math.cos(cherenkov),0.)
close('Cherenkov worked angle degrees',math.degrees(cherenkov),33.55730976192071)
close('40kV continuous X-ray cutoff nm',h*c/(e*40000)/1e-9,.030996049608300064)
# Integrate population rates rather than substituting the stationary expression.
population=0.;dt=.001
rate=lambda p:1-3*p
for _ in range(12000):
    a=rate(population);b=rate(population+dt*a/2);cc=rate(population+dt*b/2);d=rate(population+dt*cc)
    population+=dt*(a+2*b+2*cc+d)/6
close('Two-level equal-rate pump saturates below inversion',population,1/3)
# Average all independent discrete phase combinations (roots of unity).
total=0.;phase_count=12;particles=3
for i in range(phase_count):
    for j in range(phase_count):
        for l in range(phase_count):
            bunch=sum(cmath.exp(-2j*math.pi*x/phase_count) for x in (i,j,l))/particles
            total+=abs(bunch)**2
close('Random finite bunch mean squared bunching',total/phase_count**particles,1/particles)
close('532nm 300K Boltzmann log ratio',h*c/(532e-9*kb*300),90.1489271619006,rtol=1e-10)
me=9.1093837139e-31
close('Planar undulator peak K coefficient per T cm',e*.01/(2*math.pi*me*c),.933728954725801,rtol=1e-7)

pages=['course-optics','optics-waves','optics-incoherent','optics-laser','optics-propagation',
       'optics-electrodynamics','optics-formulas','optics-exercises','optics-sources','review-optics']
for page in pages:
    text=(root/'docs'/(page+'.md')).read_text(encoding='utf-8')
    assert not re.search(r'[A-Z]:[/\\]|tmp/review_build|\[\[|\ufffd',text),page
    assert text.count('$$')%2==0,page
    assert re.search(r'^# ',text,re.M),page
with zipfile.ZipFile(root/'public'/'optics'/'光学期中复习_Obsidian.zip') as z:
    assert len(z.namelist())==11 and z.testzip() is None
report={'status':'PASS','checks':checks,'pages':len(pages),'sourcePdfPages':205,
        'sourceTextbookChapters':5,'workedSelfTests':17,'newTextbookSelfChecks':6,
        'originalHomeworkItems':37,'scope':'Listed equations and examples; not a proof of every sentence or all source formulas.'}
(root/'reports'/'optics-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Optics:',len(checks),'independent numerical checks;',len(pages),'portable pages; ZIP valid.')
