'use client'

import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import { CheckCircle2, Flame, BookOpen, Briefcase, Activity, TrendingUp } from "lucide-react"

const streaks = [
    { category: 'Academics', count: 12, icon: BookOpen, color: 'blue' },
    { category: 'Business', count: 5, icon: Briefcase, color: 'violet' },
    { category: 'Health', count: 21, icon: Activity, color: 'green' },
]

const recentActivities = [
    { id: 1, name: 'MERN Coding Session', category: 'Business', time: '2 hours ago', icon: Briefcase },
    { id: 2, name: 'Morning Run (5km)', category: 'Health', time: '5 hours ago', icon: Activity },
    { id: 3, name: 'Advanced Calculus Study', category: 'Academics', time: 'Yesterday', icon: BookOpen },
]

const colorMap: Record<string, { bg: string; text: string; badge: string; ring: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700', ring: 'ring-blue-200' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', badge: 'bg-violet-100 text-violet-700', ring: 'ring-violet-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', badge: 'bg-green-100 text-green-700', ring: 'ring-green-200' },
}

export default function DashboardPage() {
    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Daily Dashboard</h1>
                    <p className="text-slate-500 mt-1">Keep up the momentum. You're doing great.</p>
                </div>

                {/* Streak Cards */}
                <div className="grid grid-cols-3 gap-5">
                    {streaks.map((s) => {
                        const c = colorMap[s.color]
                        const Icon = s.icon
                        return (
                            <Card key={s.category} className="border border-slate-200 shadow-sm rounded-2xl">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.category}</span>
                                        <div className={`h-8 w-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                                            <Icon size={16} className={c.text} />
                                        </div>
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className={`text-4xl font-extrabold ${c.text}`}>{s.count}</span>
                                        <span className="text-slate-400 text-sm mb-1 ml-1">day streak</span>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <Flame size={14} className="text-orange-400" fill="currentColor" />
                                        <span className="text-xs text-slate-500">Active streak</span>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Recent Activities */}
                    <div className="col-span-2">
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Recent Activities</h2>
                        <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                            <ul className="divide-y divide-slate-100">
                                {recentActivities.map((a) => {
                                    const Icon = a.icon
                                    return (
                                        <li key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-9 w-9 rounded-xl bg-green-50 flex items-center justify-center">
                                                    <Icon size={16} className="text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800 text-sm">{a.name}</p>
                                                    <p className="text-xs text-slate-400">{a.category}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-400">{a.time}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Card>
                    </div>

                    {/* Quick Log */}
                    <div>
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Log</h2>
                        <Card className="border border-slate-200 shadow-sm rounded-2xl">
                            <CardContent className="p-5 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Activity</label>
                                    <input
                                        type="text"
                                        placeholder="What did you achieve today?"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 placeholder:text-slate-400"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Domain</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Study', 'Business', 'Health'].map((d) => (
                                            <button key={d} className="py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all">
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                                    Update My Progress
                                </button>
                            </CardContent>
                        </Card>

                        {/* Warning */}
                        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
                            <TrendingUp size={16} className="text-amber-500 mt-0.5 shrink-0" />
                            <p className="text-xs text-amber-700 font-medium">You haven't logged Business activity today. Don't break your streak!</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
