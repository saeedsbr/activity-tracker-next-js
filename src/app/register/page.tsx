'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import { Flame } from "lucide-react"

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Registering:', { email, username, password })
        router.push('/login')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full max-w-md bg-[#111827] border-[#1f2937] rounded-2xl shadow-2xl overflow-hidden">
                    <CardHeader className="space-y-4 pt-10 text-center">
                        <div className="flex justify-center">
                            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 shadow-lg shadow-green-500/10">
                                <Flame fill="currentColor" size={28} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-white tracking-tight">Create Account</CardTitle>
                            <CardDescription className="text-gray-400">Join the pursuit of 100% consistency</CardDescription>
                        </div>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-5 px-10">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-1">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="johndoe"
                                    className="w-full bg-[#0f172a] border border-[#1f2937] text-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder:text-gray-600"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-[#0f172a] border border-[#1f2937] text-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder:text-gray-600"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#0f172a] border border-[#1f2937] text-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-6 p-10 pt-4">
                            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-[#0f172a] font-bold py-6 rounded-xl transition-all shadow-lg shadow-green-500/10">
                                Get Started
                            </Button>
                            <p className="text-sm text-center text-gray-500">
                                Already member?{' '}
                                <Link href="/login" className="text-green-500 hover:text-green-400 font-semibold transition-colors">Sign In</Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    )
}
