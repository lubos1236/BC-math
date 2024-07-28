import { createContext, ReactNode, useState } from 'react'

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
}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string |null>(null)
/*
    useEffectOnce(() => {
        ky.post('auth/restore', { credentials: 'include' })
            .json()
            .then(async (data: any) => {
                handleLogin(data.access_token)
            })
            .catch(() => {})
            .finally(() => {
                setInitializing(false)
            })
    })*/

    const value = {
        setUser,
        user,
        token,
        setToken,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
