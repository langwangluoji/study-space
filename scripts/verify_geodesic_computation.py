"""Independent symbolic, ODE and GeographicLib checks for S7/S8.

Angles are radians internally; GeographicLib arguments and azimuths are degrees.
The examples explicitly choose WGS84, since S8 does not identify the ellipsoid.
"""
import json
import math
from pathlib import Path

import numpy as np
import sympy as sp
from geographiclib.geodesic import Geodesic
from scipy.integrate import solve_ivp

A_EARTH = 6378137.0
F_EARTH = 1 / 298.257223563
Q = F_EARTH * (2 - F_EARTH)
RHO = 180 * 3600 / math.pi


def radii(B, q=Q, axis=A_EARTH):
    w = 1 - q * math.sin(B) ** 2
    return axis * (1 - q) / w ** 1.5, axis / math.sqrt(w)


def differences(B, A, distance, q=Q):
    _, N = radii(B, q)
    t, u = math.tan(B), q / (1 - q) * math.cos(B) ** 2
    c, z = math.cos(A), math.sin(A)
    CB = z*z*(2+3*t*t+2*u)+3*u*c*c*(-1+t*t-u-4*t*t*u)
    CL = z*z*t*t-c*c*(1+u-9*t*t*u)
    CA = z*z*(2+t*t+2*u)+c*c*(2+7*u+9*t*t*u+5*u*u)
    k = distance**2/(24*N*N)
    return (distance*(1+u)*c/N*(1+k*CB),
            distance*z/(N*math.cos(B))*(1+k*CL),
            distance*t*z/N*(1+k*CA))


def direct(B, L, A, distance, q=Q):
    M, N = radii(B, q)
    bm = B+distance*math.cos(A)/(2*M)
    am = A+distance*math.tan(B)*math.sin(A)/(2*N)
    for i in range(100):
        db, dl, da = differences(bm, am, distance, q)
        bn, an = B+db/2, A+da/2
        residual = max(abs(bn-bm), abs(an-am))
        bm, am = bn, an
        if residual < 1e-14:
            db, dl, da = differences(bm, am, distance, q)
            return B+db, L+dl, (A+da) % (2*math.pi), i+1, residual
    raise ValueError('Gauss direct did not converge')


def inverse(B1, L1, B2, L2, q=Q, simplified=False):
    bm, db = (B1+B2)/2, B2-B1
    dl = (L2-L1+math.pi) % (2*math.pi)-math.pi
    _, N = radii(bm, q)
    t, u, c = math.tan(bm), q/(1-q)*math.cos(bm)**2, math.cos(bm)
    x0, y0 = N*db/(1+u), N*c*dl
    if simplified:
        x = x0-N*c*c*(2+3*t*t-3*t*t*u)*db*dl*dl/24-N*(t*t*u-u)*db**3/8
        y = y0+N*c*(1-u-9*t*t*u)*db*db*dl/24-N*c*math.sin(bm)**2*dl**3/24
    else:
        x = x0-x0*(y0*y0*(2+3*t*t+2*u)+3*u*x0*x0*(-1+t*t-u-4*t*t*u))/(24*N*N)
        y = y0-y0*(t*t*y0*y0-x0*x0*(1+u-9*t*t*u))/(24*N*N)
    distance = math.hypot(x, y)
    if distance == 0:
        return 0.0, None, None
    am = math.atan2(y, x)
    da = differences(bm, am, distance, q)[2]
    return distance, (am-da/2) % (2*math.pi), (am+da/2+math.pi) % (2*math.pi)


def az_error(a, b):
    return abs((a-b+math.pi) % (2*math.pi)-math.pi)*RHO


def symbolic_checks():
    A,t,u,N = sp.symbols('A t u N', real=True)
    c,z = sp.cos(A),sp.sin(A)
    f = [(1+u)*c/N,sp.sqrt(1+t*t)*z/N,t*z/N]
    def partial_B(g):
        return sp.diff(g,t)*(1+t*t)-sp.diff(g,u)*2*t*u+sp.diff(g,N)*N*t*u/(1+u)
    def D(g):
        return partial_B(g)*f[0]+sp.diff(g,A)*f[2]
    C = [z*z*(2+3*t*t+2*u)+3*u*c*c*(-1+t*t-u-4*t*t*u),
         z*z*t*t-c*c*(1+u-9*t*t*u),
         z*z*(2+t*t+2*u)+c*c*(2+7*u+9*t*t*u+5*u*u)]
    for i in range(3):
        coefficient = D(D(f[i]))-3*(partial_B(f[i])*D(f[0])+sp.diff(f[i],A)*D(f[2]))
        assert sp.simplify(sp.trigsimp(sp.expand(coefficient-f[i]*C[i]/N**2))) == 0
    # Clairaut: r=N*cos B=N/sqrt(1+t²), r_B=-M*sin B.
    r = N/sp.sqrt(1+t*t)
    assert sp.simplify(partial_B(r)+N*t/((1+u)*sp.sqrt(1+t*t))) == 0
    assert sp.simplify(D(r*z)) == 0
    assert sp.trigsimp((N*f[0]/(1+u))**2+(r*f[1])**2-1) == 0
    # Exact cubic inverse coefficients expanded to first order in u.
    assert sp.series((2+3*t*t+2*u)/(1+u),u,0,2).removeO().expand() == 2+3*t*t-3*t*t*u
    assert sp.series((1+u-9*t*t*u)/(1+u)**2,u,0,2).removeO().expand() == 1-u-9*t*t*u
    h = 3*u*(-1+t*t-u-4*t*t*u)/(1+u)**3
    assert sp.series(h,u,0,2).removeO().expand() == 3*t*t*u-3*u
    # Circle inverse chord series and spherical lune integral.
    d,R,theta,v = sp.symbols('d R theta v',positive=True)
    assert sp.series(2*R*sp.asin(d/(2*R)),d,0,6).removeO() == d+d**3/(24*R**2)+3*d**5/(640*R**4)
    assert sp.integrate(R**2*sp.sin(v),(v,0,sp.pi))*theta == 2*R**2*theta
    # North-east-outward vectors: Frenet b=T cross inward n.
    T=sp.Matrix([c,z,0]);n=sp.Matrix([0,0,-1])
    # NEU is left handed, so physical cross has opposite coordinate sign.
    binormal=-T.cross(n)
    M=sp.symbols('M',positive=True)
    nprime=sp.Matrix([-c/M,-z/N,0])
    assert sp.simplify(nprime.dot(binormal)-(1/N-1/M)*z*c) == 0
    # First-order direction change for a tilted horizontal basis.
    xi,eta,z0=sp.symbols('xi eta z0',real=True)
    east=sp.sin(z0)*sp.sin(A);north=sp.sin(z0)*sp.cos(A)
    dangle=(north*(-eta*sp.cos(z0))-east*(-xi*sp.cos(z0)))/(east**2+north**2)
    assert sp.trigsimp(dangle-(xi*sp.sin(A)-eta*sp.cos(A))*sp.cot(z0)) == 0
    return ['three complete Gauss cubic coefficients', 'Clairaut and parallel radius derivative',
            'unit arc-length speed','three inverse auxiliary-u truncations',
            'chord to arc series','lune integral','Frenet torsion sign',
            'tilted horizontal direction sign, correction is negative of observed-minus-normal difference']


def reduction_checks():
    """Full 3-D projections independently check low-order reduction signs."""
    xi,eta=5/RHO,3/RHO
    az,z=math.radians(60),math.radians(60)
    up=np.array([xi,eta,1.]);up/=np.linalg.norm(up)
    oldup=np.array([0.,0.,1.]);rotation=np.cross(oldup,up)
    skew=np.array([[0,-rotation[2],rotation[1]],[rotation[2],0,-rotation[0]],[-rotation[1],rotation[0],0]])
    matrix=np.eye(3)+skew+skew@skew/(1+float(oldup@up))
    north,east=matrix[:,0],matrix[:,1]
    sight=np.array([math.sin(z)*math.cos(az),math.sin(z)*math.sin(az),math.cos(z)])
    tilted=math.atan2(float(sight@east),float(sight@north))
    du=(xi*math.sin(az)-eta*math.cos(az))/math.tan(z)
    error=az_error(tilted-az,du)
    assert error<1e-4
    assert du>0 and (az-tilted)<0  # actual return-to-normal correction
    def ecef(B,L,H=0):
        _,N=radii(B)
        return np.array([(N+H)*math.cos(B)*math.cos(L),(N+H)*math.cos(B)*math.sin(L),
                         (N*(1-Q)+H)*math.sin(B)])
    B,L,A=map(math.radians,[45,0,45]);distance=10000;H2=500
    endpoint=Geodesic.WGS84.Direct(45,0,45,distance)
    B2,L2=math.radians(endpoint['lat2']),math.radians(endpoint['lon2'])
    en=np.array([-math.sin(B)*math.cos(L),-math.sin(B)*math.sin(L),math.cos(B)])
    ee=np.array([-math.sin(L),math.cos(L),0])
    def direction(H):
        delta=ecef(B2,L2,H)-ecef(B,L)
        return math.atan2(float(delta@ee),float(delta@en))
    normal=direction(0);elevated=direction(H2)
    exact_h=(normal-elevated+math.pi)%(2*math.pi)-math.pi
    exact_g=(A-normal+math.pi)%(2*math.pi)-math.pi
    M2,_=radii(B2);M,N=radii(B)
    predicted_h=Q*H2*math.cos(B2)**2*math.sin(2*A)/(2*M2)
    predicted_g=-distance**2*Q/(1-Q)*math.cos(B)**2*math.sin(2*A)/(12*N*N)
    assert exact_h>0 and predicted_h>0 and exact_g<0 and predicted_g<0
    assert abs(exact_h-predicted_h)*RHO<0.001
    assert abs(exact_g-predicted_g)*RHO<0.00001
    # High precision spherical area against small-triangle series.
    import mpmath as mp
    mp.mp.dps=50
    radius=mp.mpf('6371000');sides=[mp.mpf(v) for v in [20000,25000,30000]]
    a,b,c=sides;p=(a+b+c)/2
    F0=mp.sqrt(p*(p-a)*(p-b)*(p-c))
    angular=[v/radius for v in sides];h=sum(angular)/2
    excess=4*mp.atan(mp.sqrt(mp.tan(h/2)*mp.tan((h-angular[0])/2)*mp.tan((h-angular[1])/2)*mp.tan((h-angular[2])/2)))
    exact_area=excess*radius**2
    second_order=F0*(1+(a*a+b*b+c*c)/(24*radius**2))
    rel=abs(second_order-exact_area)/exact_area
    assert rel<mp.mpf('1e-11')
    return {'tilt_example_observed_minus_normal_arcsec':du*RHO,
            'tilt_actual_added_correction_arcsec':-du*RHO,'tilt_3D_first_order_error_arcsec':error,
            'height_exact_projection_arcsec':exact_h*RHO,'height_lecture_approx_arcsec':predicted_h*RHO,
            'section_exact_direction_difference_arcsec':exact_g*RHO,'section_lecture_approx_arcsec':predicted_g*RHO,
            'spherical_area_exact_m2':float(exact_area),'spherical_area_second_order_relative_error':float(rel)}


def ode_check(B=math.radians(45), L=math.radians(120), A=math.radians(60), distance=100000):
    def rhs(s, y):
        b, l, a=y;M,N=radii(b)
        return [math.cos(a)/M,math.sin(a)/(N*math.cos(b)),math.tan(b)*math.sin(a)/N]
    sol=solve_ivp(rhs,(0,distance),[B,L,A],method='DOP853',rtol=2e-13,atol=2e-14,max_step=1000)
    assert sol.success
    Cs=[]
    for b,l,a in sol.y.T:
        _,N=radii(b);Cs.append(N*math.cos(b)*math.sin(a))
    ref=Geodesic.WGS84.Direct(math.degrees(B),math.degrees(L),math.degrees(A),distance)
    b2,l2,a2=sol.y[:,-1]
    position=Geodesic.WGS84.Inverse(math.degrees(b2),math.degrees(l2),ref['lat2'],ref['lon2'])['s12']
    assert position<1e-6
    assert max(Cs)-min(Cs)<1e-7
    return {'position_error_m':position,'Clairaut_range_m':max(Cs)-min(Cs),
            'endpoint_forward_azimuth_error_arcsec':az_error(a2,math.radians(ref['azi2']))}


def numerics():
    rows=[]
    for lat in [-60,-30,0,30,60,80]:
        for az in [0,45,90,135,180,225,270,315]:
            for length in [1000,25000,100000,200000]:
                B,L,A=map(math.radians,[lat,179.9,az])
                b,l,a,iterations,residual=direct(B,L,A,length)
                ref=Geodesic.WGS84.Direct(lat,179.9,az,length)
                err=Geodesic.WGS84.Inverse(math.degrees(b),math.degrees(l),ref['lat2'],ref['lon2'])['s12']
                s1,a1,a21=inverse(B,L,math.radians(ref['lat2']),math.radians(ref['lon2']))
                rows.append({'latitude_deg':lat,'azimuth_deg':az,'distance_m':length,
                             'direct_position_error_m':err,'direct_forward_azimuth_error_arcsec':az_error(a,math.radians(ref['azi2'])),
                             'inverse_distance_error_m':abs(s1-length),'inverse_start_azimuth_error_arcsec':az_error(a1,A),
                             'iterations':iterations})
    # Small ordinary cases must reproduce complete geodesic solution closely;
    # expose growing errors at long distances/high latitude without hiding them.
    assert max(r['direct_position_error_m'] for r in rows if r['distance_m']<=25000 and abs(r['latitude_deg'])<=60)<0.001
    assert max(r['inverse_distance_error_m'] for r in rows if r['distance_m']<=25000 and abs(r['latitude_deg'])<=60)<0.001
    # Sphere and coincident endpoints.
    assert inverse(0,0,0,0)==(0.0,None,None)
    sphere=Geodesic(A_EARTH,0)
    b,l,a,_,_=direct(math.radians(-30),0,math.radians(225),10000,q=0)
    reference=sphere.Direct(-30,0,225,10000)
    assert sphere.Inverse(math.degrees(b),math.degrees(l),reference['lat2'],reference['lon2'])['s12']<1e-5
    return rows


def examples():
    dms=lambda d,m,s:math.radians(d+m/60+s/3600)
    B,L,A=dms(40,0,8.3421),dms(115,46,27.0953),dms(75,41,29.762)
    length=24909.814
    b,l,a,it,res=direct(B,L,A,length)
    inv=inverse(B,L,b,l)
    ref=Geodesic.WGS84.Direct(math.degrees(B),math.degrees(L),math.degrees(A),length)
    out={'ellipsoid':'WGS84 explicitly selected, not specified by the source exercise',
         'B2_deg':math.degrees(b),'L2_deg':math.degrees(l),'A21_deg':math.degrees((a+math.pi)%(2*math.pi)),
         'iterations':it,'iteration_change_arcsec':res*RHO,
         'inverse_S_m':inv[0],'inverse_A12_deg':math.degrees(inv[1]),
         'position_error_vs_GeographicLib_m':Geodesic.WGS84.Inverse(math.degrees(b),math.degrees(l),ref['lat2'],ref['lon2'])['s12']}
    def RA(B,A):
        M,N=radii(B);return M*N/(N*math.cos(A)**2+M*math.sin(A)**2)
    R1=RA(dms(38,22,3),dms(56,38,6));R2=RA(dms(38,30,6),dms(236,45,6));Rm=(R1+R2)/2
    D,H1,H2=28678.456,4130.46,3950.67
    chord=math.sqrt((D*D-(H2-H1)**2)/((1+H1/R1)*(1+H2/R2)))
    q0=math.sqrt(D*D-(H2-H1)**2)
    arc=2*Rm*math.asin(chord/(2*Rm));approx=q0*(1-(H1+H2)/(2*Rm))+q0**3/(24*Rm**2)
    out['slope_example']={'RA12_m':R1,'RA21_m':R2,'chord_m':chord,'local_circle_arc_m':arc,
                          'first_order_engineering_arc_m':approx,'difference_m':approx-arc}
    return out


if __name__=='__main__':
    checks=symbolic_checks();reductions=reduction_checks();rows=numerics();ode=ode_check();example=examples()
    summary=[]
    for length in [1000,25000,100000,200000]:
        for maximum_lat in [60,80]:
            subset=[r for r in rows if r['distance_m']==length and abs(r['latitude_deg'])<=maximum_lat]
            summary.append({'distance_m':length,'latitude_limit_deg':maximum_lat,
                            'max_direct_position_error_m':max(r['direct_position_error_m'] for r in subset),
                            'max_inverse_distance_error_m':max(r['inverse_distance_error_m'] for r in subset)})
    result={'status':'PASS','basis':'symbolic identities plus independent ODE and GeographicLib; error table is a sampled domain, not a universal bound',
            'ellipsoid':'WGS84','symbolic_checks':checks,'reduction_checks':reductions,'ode':ode,'lecture_example':example,
            'cases':len(rows),'error_summary':summary,'case_results':rows,
            'software':{'sympy':sp.__version__,'numpy':np.__version__}}
    Path('reports').mkdir(exist_ok=True)
    for target in ['reports/geodesic-computation.json','public/geodesy/new-lectures-verification.json']:
        Path(target).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    fragment='### 数值结果\n\n所有结果采用WGS84；原题未指定椭球，不能直接用本表替代其他椭球的答案。\n\n'
    fragment+=f"终点纬度 **{example['B2_deg']:.10f}°**，经度 **{example['L2_deg']:.10f}°**，反方位角 **{example['A21_deg']:.10f}°**。迭代{example['iterations']}次；反算距离 **{example['inverse_S_m']:.6f}m**；与完整算法的终点位置差约 **{example['position_error_vs_GeographicLib_m']*1000:.6f}mm**。\n\n"
    slope=example['slope_example']
    fragment+=f"斜距算例：局部模型弦长 **{slope['chord_m']:.6f}m**，曲率圆弧长 **{slope['local_circle_arc_m']:.6f}m**；一阶工程式 **{slope['first_order_engineering_arc_m']:.6f}m**，二者差 **{slope['difference_m']*1000:.3f}mm**。该差主要反映一阶高度截断等近似，曲率圆弧长也不是严格的椭球归算真值。\n\n"
    fragment+='以下是六个纬度、八个方位角（包含南北东西、四象限和跨180°经线）的抽样最大误差，**不是全域误差上限**。\n\n|距离|纬度范围|正算终点位置差|反算距离差|\n|---|---|---|---|\n'
    for r in summary:
        fragment+=f"|{r['distance_m']/1000:g}km|绝对纬度≤{r['latitude_limit_deg']}°|{r['max_direct_position_error_m']*1000:.4f}mm|{r['max_inverse_distance_error_m']*1000:.4f}mm|\n"
    fragment+='\n极区和较长线的误差会显著增长；按任务精度选择完整算法。迭代容限只能约束迭代变化，不能消除这些截断误差。\n'
    destination=Path('docs/_fragments/geodesic-results.md');destination.parent.mkdir(parents=True,exist_ok=True)
    destination.write_text(fragment,encoding='utf-8')
    print(json.dumps({'status':'PASS','symbolic':checks,'cases':len(rows),'ode':ode,'example':example,'summary':summary},ensure_ascii=False,indent=2))
