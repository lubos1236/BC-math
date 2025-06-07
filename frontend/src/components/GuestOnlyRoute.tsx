import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function GuestOnlyRoute() {
    const { user } = useContext(AuthContext);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
