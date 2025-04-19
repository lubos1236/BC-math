// https://javascript.plainenglish.io/how-to-create-guarded-routes-using-react-router-d83f0cffccfc
import { Navigate, Outlet, To } from 'react-router-dom'
import { useContext } from 'react'
import {AuthContext} from "./AuthProvider.tsx";
import {Role} from "../utils/Role.tsx";

interface GuardedRouteProps {
    guest?: boolean;
    /**
     * Route to be redirected to
     * @default '/'
     */
    redirectRoute?: To;
    role?: Role[];
}

/**
 * Component for guarding restricted routes
 *
 * @example Default usage
 * ```ts
 * <GuardedRoute
 *   isRouteAccessible={true}
 * />
 * ```
 *
 * @example Usage with custom redirected route
 * ```ts
 * <GuardedRoute
 *   isRouteAccessible={false}
 *   redirectRoute={'/login'}
 * />
 * ```
 */
function GuardedRoute({ guest, redirectRoute,role}: GuardedRouteProps) {
    const auth = useContext(AuthContext)

    const isAuthenticated = guest ? !auth.user : !!auth.user
    const hasRole=role? role.includes(auth.user?.role as Role):true
    const isAccessible = isAuthenticated && hasRole

    return isAccessible ? <Outlet /> : <Navigate to={redirectRoute || '/login'} replace />
}

export default GuardedRoute
