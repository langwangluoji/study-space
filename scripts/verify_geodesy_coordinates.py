"""Reproduce chapter 5/6 examples. Angles in radians; lengths in metres."""
import json
import numpy as np

AS = np.pi / (180 * 3600)
A = 6378245.0
Q = 0.006693421622966


def forward(b, l, h, a=A, q=Q):
    n = a / np.sqrt(1 - q * np.sin(b) ** 2)
    return np.array([(n+h)*np.cos(b)*np.cos(l), (n+h)*np.cos(b)*np.sin(l), (n*(1-q)+h)*np.sin(b)])


def inverse(r, a=A, q=Q):
    x, y, z = r
    p = np.hypot(x, y)
    if p == 0:
        if z == 0:
            raise ValueError('Geocentre has no unique normal coordinate')
        return np.array([np.copysign(np.pi/2, z), 0., abs(z)-a*np.sqrt(1-q)])
    l, b = np.arctan2(y, x), np.arctan2(z, p)
    for _ in range(30):
        n = a/np.sqrt(1-q*np.sin(b)**2)
        bn = np.arctan2(z+q*n*np.sin(b), p)
        if abs(bn-b) < 1e-15:
            b = bn
            break
        b = bn
    w = np.sqrt(1-q*np.sin(b)**2)
    h = p*np.cos(b)+z*np.sin(b)-a*w
    return np.array([b, l, h])


def basis(b, l):
    east = [-np.sin(l), np.cos(l), 0]
    north = [-np.sin(b)*np.cos(l), -np.sin(b)*np.sin(l), np.cos(b)]
    up = [np.cos(b)*np.cos(l), np.cos(b)*np.sin(l), np.sin(b)]
    return np.array([north, east, up]).T


def jacobian(b, l, h, a=A, q=Q):
    w = np.sqrt(1-q*np.sin(b)**2)
    m, n = a*(1-q)/w**3, a/w
    return basis(b,l) @ np.diag([m+h, (n+h)*np.cos(b), 1])


def cross(r):
    x,y,z = r
    return np.array([[0,-z,y],[z,0,-x],[-y,x,0]])


def rz(t):
    return np.array([[np.cos(t),np.sin(t),0],[-np.sin(t),np.cos(t),0],[0,0,1]])


def rx(t):
    return np.array([[1,0,0],[0,np.cos(t),np.sin(t)],[0,-np.sin(t),np.cos(t)]])


def design(r):
    return np.column_stack([np.eye(3), cross(r), r])


def main():
    b = np.deg2rad(31+28/60+16.2831/3600)
    l = np.deg2rad(121+31/60+50.4015/3600)
    h = 108.391
    r = forward(b,l,h)
    back = inverse(r)
    assert np.linalg.norm(forward(*back)-r) < 1e-7
    for pb,pl,ph in [(0.,0.,0.),(89.999999,145.,100.),(-89.999999,-170.,500.),(45.,-120.,20000.)]:
        test=np.array([*np.deg2rad([pb,pl]),ph])
        assert np.linalg.norm(forward(*inverse(forward(*test)))-forward(*test)) < 1e-7
    pole=inverse(np.array([0.,0.,A*np.sqrt(1-Q)+10]))
    assert np.allclose(pole,[np.pi/2,0.,10.])
    dq = np.array([.2*AS,.3*AS,5.])
    jac = jacobian(b,l,h)
    linear = jac@dq
    exact = forward(b+dq[0],l+dq[1],h+dq[2])-r
    # Independent central difference, with physically appropriate increments.
    for k, step in enumerate([1e-6,1e-6,.1]):
        d = np.zeros(3); d[k] = step
        fd = (forward(*(np.array([b,l,h])+d))-forward(*(np.array([b,l,h])-d)))/(2*step)
        assert np.allclose(fd,jac[:,k],rtol=2e-8,atol=2e-5)
    w=np.sqrt(1-Q*np.sin(b)**2); n=A/w; m=A*(1-Q)/w**3
    s,c=np.sin(b),np.cos(b)
    k=np.array([[n*c*np.cos(l)/A,n*s*s*c*np.cos(l)/(2*w*w)],
                [n*c*np.sin(l)/A,n*s*s*c*np.sin(l)/(2*w*w)],
                [n*(1-Q)*s/A,-n*(c*c+w*w)*s/(2*w*w)]])
    kfd=np.column_stack([(forward(b,l,h,A+.1,Q)-forward(b,l,h,A-.1,Q))/.2,
                         (forward(b,l,h,A,Q+1e-7)-forward(b,l,h,A,Q-1e-7))/2e-7])
    assert np.allclose(k,kfd,rtol=3e-7,atol=1e-7)
    assert np.allclose(np.linalg.solve(jac,-k),np.array([
        [Q*c*s/(w*(m+h)), n*c*s*(2-Q*s*s)/(2*w*w*(m+h))],
        [0,0],[-w,n*s*s/2]]),rtol=2e-13,atol=2e-9)
    da,de2=1.,1e-8
    elliptic=np.array([
        Q*np.cos(b)*np.sin(b)/(w*(m+h))*da+n*np.cos(b)*np.sin(b)*(2-Q*np.sin(b)**2)/(2*w*w*(m+h))*de2,
        0., -w*da+n*np.sin(b)**2/2*de2])
    actual=inverse(r,A+da,Q+de2)-np.array([b,l,h])
    assert np.max(np.abs((actual-elliptic)*[1e7,1e7,1])) < 1e-5
    qneu=basis(b,l); qenu=qneu[:,[1,0,2]]
    assert np.allclose(qenu.T@qenu,np.eye(3)) and np.linalg.det(qenu)>0
    assert np.linalg.det(qneu)<0
    # Reflection plus rotations in the source, not a proper rotation alone.
    ry=lambda t:np.array([[np.cos(t),0,-np.sin(t)],[0,1,0],[np.sin(t),0,np.cos(t)]])
    assert np.allclose(qneu,rz(-l)@ry(np.pi/2+b)@np.diag([1,1,-1]))
    local=np.array([400.,300.,500.]) # NEU
    baseline=qneu@local
    assert np.allclose(qneu.T@baseline,local)
    # Geometric construction, independent of the coordinate derivative route.
    up=qenu[:,2]
    east=np.cross([0.,0.,1.],up); east/=np.linalg.norm(east)
    north=np.cross(up,east)
    assert np.allclose(np.column_stack([east,north,up]),qenu,atol=2e-15)
    finite_height=inverse(r+baseline)[2]-h
    assert abs(finite_height-500.019639528) < 2e-8
    assert abs(finite_height-local[2]) > .019
    az=np.arctan2(local[1],local[0]); el=np.arctan2(local[2],np.hypot(*local[:2]))
    om=np.array([1.,2.,3.])*AS
    eps=-qneu@om
    assert np.allclose(qneu@cross(om)@qneu.T,cross(eps))
    params=np.array([1.,-2.,3.,.1*AS,-.2*AS,.3*AS,2e-6])
    shifted=r+design(r)@params
    geodiff=np.linalg.solve(jac,shifted-r)
    geoexact=inverse(shifted)-np.array([b,l,h])
    pivot=r.copy(); v=np.array([1000.,2000.,3000.])
    mb = params[:3]+pivot+(1+params[-1])*(np.eye(3)-cross(params[3:6]))@v
    tbw=params[:3]+pivot-(1+params[-1])*(np.eye(3)-cross(params[3:6]))@pivot
    bw=tbw+(1+params[-1])*(np.eye(3)-cross(params[3:6]))@(pivot+v)
    assert np.allclose(mb,bw,atol=1e-8)
    angle=np.deg2rad(25.)
    active2=np.array([[np.cos(angle),-np.sin(angle)],[np.sin(angle),np.cos(angle)]])
    mb2=np.array([2,4])+1.15*active2@np.array([3,1])
    # Four noncoplanar points, unit-scaled unknowns [m,m,m,arcsec,arcsec,arcsec,ppm].
    points = np.array([[0,0,0],[1000,0,0],[0,1000,0],[0,0,1000]],dtype=float)
    scale=np.diag([1,1,1,AS,AS,AS,1e-6])
    ds=np.vstack([design(p)@scale for p in points])
    truth=np.array([1,-2,3,.1,-.2,.3,2.])
    obs=ds@truth
    fit,_,rank,_=np.linalg.lstsq(ds,obs,rcond=None)
    assert rank==7 and np.allclose(fit,truth,atol=1e-9)
    collinear=np.vstack([design(np.array([x,0.,0.]))@scale for x in [0.,1000.,2000.,3000.]])
    assert np.linalg.matrix_rank(collinear)==6
    assert np.all(collinear[:,3]==0)  # Rotation around the line is unobservable.
    # Exact order and first-order approximation checks.
    v0=np.array([1.,0.,0.]); ordered=rx(np.pi/2)@rz(np.pi/2)@v0; reverse=rz(np.pi/2)@rx(np.pi/2)@v0
    small=np.array([1,2,3])*AS
    rex=rz(small[2])@ry(small[1])@rx(small[0])
    small_error=np.linalg.norm((rex-(np.eye(3)-cross(small)))@r)
    # S11 p8 has a plus in cos(beta); its own Rz Ry Rx product requires minus.
    all_thirty=rz(np.pi/6)@ry(np.pi/6)@rx(np.pi/6)
    assert np.allclose(np.diag(all_thirty),[.75,.625,.75],atol=2e-15)
    # A transpose is an exact inverse for the orthogonal R, not for I-[eps]x.
    exact_rotation=rz(.12)@ry(-.07)@rx(.05)
    translation=np.array([1000.,-230.,70.]); factor=1.000002
    target=translation+factor*exact_rotation@r
    assert np.linalg.norm(exact_rotation.T@(target-translation)/factor-r) < 3e-9
    linear_rotation=np.eye(3)-cross(np.array([.02,-.03,.01]))
    assert np.linalg.norm(linear_rotation.T@linear_rotation-np.eye(3)) > .001
    assert np.linalg.norm(np.linalg.solve(linear_rotation,linear_rotation@r)-r) < 3e-9
    inverse_translation=-rz(AS).T@np.array([1000.,0.,0.])
    assert abs(inverse_translation[1]+.004848136811) < 1e-12
    # Same reference point, zero point-coordinate difference; BW still needs translation.
    p_test=np.array([A,0.,0.]); t_test=p_test-rz(AS)@p_test
    assert abs(t_test[1]-30.922604375) < 1e-8
    result=dict(xyz=r.tolist(), inverse_degrees=[*np.rad2deg(back[:2]),back[2]],
        differential_linear=linear.tolist(), differential_exact=exact.tolist(), differential_error_mm=((exact-linear)*1000).tolist(),
        ellipsoid_change_arcsec_m=[elliptic[0]/AS,elliptic[1]/AS,elliptic[2]],
        ellipsoid_exact_arcsec_m=[actual[0]/AS,actual[1]/AS,actual[2]],
        baseline_xyz=baseline.tolist(), azimuth_deg=float(np.rad2deg(az)),elevation_deg=float(np.rad2deg(el)),range_m=float(np.linalg.norm(local)),
        rotation_neu_to_global_arcsec=(eps/AS).tolist(),seven_parameter_shift=(shifted-r).tolist(),
        mb_point=mb.tolist(),mb_2d_point=mb2.tolist(),bw_translation=tbw.tolist(),ls_parameters=fit.tolist(),ls_rank=int(rank),ls_max_residual=float(np.max(np.abs(ds@fit-obs))),
        geodetic_differential_arcsec_m=(geodiff/[AS,AS,1.]).tolist(),geodetic_exact_arcsec_m=(geoexact/[AS,AS,1.]).tolist(),
        rotation_order=[ordered.tolist(),reverse.tolist()],small_angle_error_mm=float(small_error*1000),
        finite_baseline_height_difference_m=float(finite_height),finite_baseline_U_m=float(local[2]),
        inverse_translation_example_m=inverse_translation.tolist(),pivot_zero_difference_bw_translation_m=t_test.tolist(),
        basis_construction='cross product agrees with independently differentiated basis',
        inverse_matrix_checks='exact orthogonal transpose and truncated-matrix linear solve verified')
    print(json.dumps(result,indent=2,ensure_ascii=False))


if __name__=='__main__':
    main()
