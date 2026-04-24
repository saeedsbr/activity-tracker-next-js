'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'
import { Settings, User, Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export default function SettingsPage() {
    const { user, logout } = useAuth()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [profileLoading, setProfileLoading] = useState(false)
    const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setEmail(user.email)
        }
    }, [user])

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setProfileMsg(null)
        setProfileLoading(true)
        try {
            const res = await api.put('/user/profile', { username, email })
            const updated = res.data
            localStorage.setItem('user', JSON.stringify({ id: updated.id, username: updated.username, email: updated.email }))
            setProfileMsg({ type: 'success', text: 'Profile updated. Reload to see changes in sidebar.' })
        } catch (err: any) {
            setProfileMsg({ type: 'error', text: err?.response?.data?.message || 'Failed to update profile.' })
        } finally {
            setProfileLoading(false)
        }
    }

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        setPasswordMsg(null)
        if (newPassword !== confirmPassword) {
            setPasswordMsg({ type: 'error', text: 'New passwords do not match.' })
            return
        }
        if (newPassword.length < 6) {
            setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' })
            return
        }
        setPasswordLoading(true)
        try {
            await api.put('/user/password', { currentPassword, newPassword })
            setPasswordMsg({ type: 'success', text: 'Password changed successfully.' })
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (err: any) {
            setPasswordMsg({ type: 'error', text: err?.response?.data?.message || 'Failed to change password.' })
        } finally {
            setPasswordLoading(false)
        }
    }

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto px-8 py-8 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Settings size={20} className="text-slate-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                        <p className="text-slate-500 text-sm">Manage your account and preferences</p>
                    </div>
                </div>

                {/* Profile Section */}
                <Card className="border border-slate-200 shadow-sm rounded-2xl">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <User size={18} className="text-slate-600" />
                            <h2 className="text-base font-semibold text-slate-800">Profile Information</h2>
                        </div>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            {profileMsg && (
                                <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${profileMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {profileMsg.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                    {profileMsg.text}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={profileLoading}
                                className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                            >
                                {profileLoading && <Loader2 size={14} className="animate-spin" />}
                                Save Changes
                            </button>
                        </form>
                    </CardContent>
                </Card>

                {/* Password Section */}
                <Card className="border border-slate-200 shadow-sm rounded-2xl">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Lock size={18} className="text-slate-600" />
                            <h2 className="text-base font-semibold text-slate-800">Change Password</h2>
                        </div>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            {passwordMsg && (
                                <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${passwordMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {passwordMsg.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                    {passwordMsg.text}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="px-4 py-2.5 bg-slate-800 text-white text-sm font-medium rounded-xl hover:bg-slate-900 disabled:opacity-50 transition-colors flex items-center gap-2"
                            >
                                {passwordLoading && <Loader2 size={14} className="animate-spin" />}
                                Change Password
                            </button>
                        </form>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border border-red-200 shadow-sm rounded-2xl">
                    <CardContent className="p-6">
                        <h2 className="text-base font-semibold text-red-700 mb-2">Danger Zone</h2>
                        <p className="text-sm text-slate-500 mb-4">Log out of your account on this device.</p>
                        <button
                            onClick={logout}
                            className="px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors"
                        >
                            Log out
                        </button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
