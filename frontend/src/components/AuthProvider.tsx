import {createContext, ReactNode, useEffect, useState} from 'react';
import {Role} from "../utils/Role.tsx";
import {useLocation, useNavigate} from "react-router-dom";

export interface AuthContextType {
    user: User | null
    setUser: (user: User|null) => void
    token: string|null
    setToken: (token: string|null) => void
}

export interface User {
    id: number
    email: string
    name: string
    role: Role
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const noRefreshSites = ['/login', '/register'];

        const tryRefresh = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/auth/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

                if (data.access_token) {
                    setToken(data.access_token);
                    setUser(data.user);

                    // Premiestni používateľa ak je na login/register
                    if (noRefreshSites.includes(location.pathname)) {
                        navigate('/');
                    }
                }
            } catch (error) {
                setToken(null);
                setUser(null);

                if (!noRefreshSites.includes(location.pathname)) {
                    navigate('/login');
                }
            }
        };

        tryRefresh();
    }, []);


    const value = {
        setUser,
        user,
        token,
        setToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
