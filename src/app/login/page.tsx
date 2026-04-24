'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { Flame } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        login('fake-jwt-token', { id: 1, email, username: email.split('@')[0] })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/20 mb-3">
                        <Flame fill="currentColor" size={26} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PerfTracker</h1>
                    <p className="text-slate-500 text-sm mt-1">Build unstoppable habits.</p>
                </div>

                <Card className="border border-slate-200 shadow-sm rounded-2xl">
                    <CardHeader className="px-8 pt-8 pb-2">
                        <CardTitle className="text-xl font-bold text-slate-900">Welcome back</CardTitle>
                        <CardDescription className="text-slate-500">Sign in to continue your streak</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4 px-8 py-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 placeholder:text-slate-400"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 placeholder:text-slate-400"
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 px-8 pb-8 pt-0">
                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                                Sign In
                            </Button>
                            <p className="text-sm text-center text-slate-500">
                                New to PerfTracker?{' '}
                                <Link href="/register" className="text-green-600 hover:text-green-700 font-semibold transition-colors">Create Account</Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}
