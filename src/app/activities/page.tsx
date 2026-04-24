'use client'

import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import { History, BookOpen, Briefcase, Activity, Clock, Search } from "lucide-react"

const allActivities = [
    { id: 1, name: 'MERN Stack Project', category: 'Business', date: '2024-03-20', duration: '3h 00m' },
    { id: 2, name: 'Morning Run (5km)', category: 'Health', date: '2024-03-20', duration: '32m' },
    { id: 3, name: 'Advanced Calculus Study', category: 'Academics', date: '2024-03-19', duration: '2h 30m' },
    { id: 4, name: 'Gym Workout', category: 'Health', date: '2024-03-19', duration: '1h 10m' },
    { id: 5, name: 'Client Meeting Prep', category: 'Business', date: '2024-03-18', duration: '1h 15m' },
    { id: 6, name: 'Literature Review', category: 'Academics', date: '2024-03-18', duration: '1h 00m' },
    { id: 7, name: 'Yoga Session', category: 'Health', date: '2024-03-17', duration: '45m' },
    { id: 8, name: 'Business Plan Update', category: 'Business', date: '2024-03-16', duration: '1h 45m' },
    { id: 9, name: 'Mock Exam Practice', category: 'Academics', date: '2024-03-15', duration: '3h 00m' },
    { id: 10, name: 'Swimming', category: 'Health', date: '2024-03-14', duration: '45m' },
]

const categoryConfig: Record<string, { icon: any; color: string; bg: string }> = {
    Business: { icon: Briefcase, color: 'text-violet-600', bg: 'bg-violet-50' },
    Health: { icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    Academics: { icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
}

export default function ActivitiesPage() {
    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto px-8 py-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                            <History size={20} className="text-slate-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">All Activities</h1>
                            <p className="text-slate-500 text-sm">Your complete activity history across all domains</p>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Total Activities', value: '38', sub: 'This month' },
                        { label: 'Total Time', value: '62h', sub: 'This month' },
                        { label: 'Active Days', value: '24', sub: 'This month' },
                    ].map((s) => (
                        <Card key={s.label} className="border border-slate-200 shadow-sm rounded-2xl">
                            <CardContent className="p-5">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{s.label}</p>
                                <p className="text-3xl font-extrabold text-slate-800">{s.value}</p>
                                <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Filter Bar */}
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search activities..."
                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/30 placeholder:text-slate-400"
                        />
                    </div>
                    {['All', 'Academics', 'Business', 'Health'].map((f) => (
                        <button key={f} className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${f === 'All' ? 'bg-green-600 text-white border-green-600' : 'bg-white border-slate-200 text-slate-600 hover:border-green-400 hover:text-green-700'}`}>
                            {f}
                        </button>
                    ))}
                </div>

                {/* Activity List */}
                <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                    <ul className="divide-y divide-slate-100">
                        {allActivities.map((a) => {
                            const cfg = categoryConfig[a.category]
                            const Icon = cfg.icon
                            return (
                                <li key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-9 w-9 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                                            <Icon size={16} className={cfg.color} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800 text-sm">{a.name}</p>
                                            <span className={`text-xs font-medium ${cfg.color}`}>{a.category}</span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                            <Clock size={12} />
                                            {a.duration}
                                        </div>
                                        <p className="text-xs text-slate-400 mt-0.5">{a.date}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </Card>
            </div>
        </AppLayout>
    )
}
