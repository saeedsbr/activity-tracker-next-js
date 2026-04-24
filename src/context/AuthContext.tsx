'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

interface User {
    id: number
    email: string
    username: string
}

interface AuthContextType {
    user: User | null
    login: (username: string, password: string) => Promise<void>
    register: (username: string, email: string, password: string) => Promise<void>
    logout: () => void
    isLoading: boolean
    error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const savedUser = localStorage.getItem('user')
        if (token && savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (username: string, password: string) => {
        setError(null)
        try {
            const res = await api.post('/auth/login', { username, password })
            const { token, id, username: uname, email } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify({ id, username: uname, email }))
            setUser({ id, username: uname, email })
            router.push('/dashboard')
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Invalid username or password'
            setError(msg)
            throw new Error(msg)
        }
    }

    const register = async (username: string, email: string, password: string) => {
        setError(null)
        try {
            await api.post('/auth/register', { username, email, password })
            router.push('/login')
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Registration failed'
            setError(msg)
            throw new Error(msg)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
