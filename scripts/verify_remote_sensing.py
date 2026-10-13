"""Independent numerical checks for teaching equations; not a retrieval benchmark."""
from pathlib import Path
import json, math

h=6.62607015e-34;c=299792458.0;k=1.380649e-23
def simpson(fn,a,b,n=20000):
    assert n%2==0
    dx=(b-a)/n
    return dx/3*(fn(a)+fn(b)+sum((4 if j%2 else 2)*fn(a+j*dx) for j in range(1,n)))
def B(wavelength,temperature):
    return 2*h*c*c/(wavelength**5*math.expm1(h*c/(wavelength*k*temperature)))
checks=[]
angular=simpson(lambda theta:2*math.pi*math.cos(theta)*math.sin(theta),0,math.pi/2)
assert abs(angular-math.pi)<1e-11
checks.append({'quantity':'Lambertian angular integral','value':angular,'expected':math.pi})
integral=simpson(lambda x:0 if x==0 else x**3/math.expm1(x),0,60)
sigma=2*math.pi*k**4/(h**3*c**2)*integral
assert abs(sigma/5.670374419e-8-1)<5e-10
checks.append({'quantity':'Planck integral vs Stefan-Boltzmann constant','computed':sigma,'reference':5.670374419e-8})
x=5.0
for _ in range(12):x-=(5*(1-math.exp(-x))-x)/(5*math.exp(-x)-1)
b=h*c/(k*x)
assert abs(b*1e6-2897.771955)<1e-5
for T in [300,5800,6000]:checks.append({'quantity':'Wavelength-density peak','T_K':T,'lambda_um':b/T*1e6})
L=B(10e-6,300)*0.9
lo,hi=1,500
for _ in range(70):
    mid=(lo+hi)/2
    if B(10e-6,mid)<L:lo=mid
    else:hi=mid
TB=(lo+hi)/2
assert abs(TB-293.6)<0.1 and abs(TB-0.9*300)>20
checks.append({'quantity':'Emission-only monochromatic brightness temperature','Ts_K':300,'emissivity':0.9,'lambda_um':10,'TB_K':TB,'epsilon_times_T_is_not_TIR_result':270})
H=700000;beta=0.1e-3
g=2*H*math.tan(beta/2)
assert abs(g-70)<1e-6
checks.append({'quantity':'Nadir flat-ground footprint','H_m':H,'IFOV_rad':beta,'footprint_m':g,'swath15deg_km':2*H*math.tan(math.radians(15)/2)/1000})
mu=3.986004418e14;radius=6371000;a=radius+700000
period=2*math.pi*math.sqrt(a**3/mu)
assert 98<period/60<100
checks.append({'quantity':'Ideal circular 700km orbit','period_minutes':period/60,'sidereal_groundtrack_shift_deg':-360*period/86164.0905,'not_revisit':True})
radar_resolution=c/(2*20e6);ground_resolution=radar_resolution/math.sin(math.radians(30))
assert abs(radar_resolution-7.5)<0.01 and abs(ground_resolution-15)<0.02
checks.append({'quantity':'Ideal compressed radar resolution','bandwidth_Hz':20e6,'slant_m':radar_resolution,'ground30deg_m':ground_resolution})
for wavelength in [0.03,0.056]:
    shift=wavelength*math.pi/(4*math.pi)
    assert math.isclose(shift,wavelength/4)
    checks.append({'quantity':'Magnitude of two-way LOS phase relation','lambda_m':wavelength,'phase_pi_rad':math.pi,'LOS_m':shift,'sign_requires_convention':True})
report={'status':'PASS','checks':checks,'scope':'Numerical teaching equations under stated assumptions; not validation of all source figures, satellite specifications, actual retrievals or SAR products.'}
Path('reports').mkdir(exist_ok=True)
Path('reports/remote-sensing-math.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'status':'PASS','checks':len(checks),'sigma':sigma,'TB_K':TB,'orbit_minutes':period/60}))
