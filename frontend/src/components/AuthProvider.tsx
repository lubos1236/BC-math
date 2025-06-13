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
    const [isLoading, setIsLoading] = useState(true); // pridaj isLoading
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

                if (res.status === 401) {
                    setToken(null);
                    setUser(null);
                    setIsLoading(false);
                    return;
                }

                const data = await res.json();

                if (data.access_token) {
                    setToken(data.access_token);
                    setUser(data.user);

                    // Ak je na login/register a je prihlásený, presmeruj na home
                    if (noRefreshSites.includes(location.pathname)) {
                        navigate('/');
                    }
                } else {
                    setToken(null);
                    setUser(null);
                }
            } catch (error) {
                setToken(null);
                setUser(null);

                if (!noRefreshSites.includes(location.pathname)) {
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        tryRefresh();
    }, [location.pathname, navigate]);

    const value = {
        setUser,
        user,
        token,
        setToken,
    };

    // Počas načítania nerenderuj nič (alebo loading spinner)
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-light-background dark:bg-dark-background">
                <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
