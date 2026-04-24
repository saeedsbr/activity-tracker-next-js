'use client'

import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import { Briefcase, Flame, CheckCircle2, Clock, PlusCircle, DollarSign } from "lucide-react"

const activities = [
    { id: 1, name: 'MERN Stack Project', date: '2024-03-20', duration: '3h 00m', notes: 'Completed API integration' },
    { id: 2, name: 'Client Meeting Prep', date: '2024-03-19', duration: '1h 15m', notes: 'Prepared slides & demo' },
    { id: 3, name: 'Market Research', date: '2024-03-18', duration: '2h 00m', notes: 'Competitor analysis' },
    { id: 4, name: 'Freelance Invoice Work', date: '2024-03-17', duration: '1h 30m', notes: 'Completed client task' },
    { id: 5, name: 'Business Plan Update', date: '2024-03-16', duration: '1h 45m', notes: 'Financial projections' },
]

export default function BusinessPage() {
    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto px-8 py-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center">
                            <Briefcase size={20} className="text-violet-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Business</h1>
                            <p className="text-slate-500 text-sm">Track your work, projects, and productivity</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                        <PlusCircle size={16} />
                        Log Activity
                    </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                    <Card className="border border-slate-200 shadow-sm rounded-2xl">
                        <CardContent className="p-5">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Streak</p>
                            <div className="flex items-end gap-1">
                                <span className="text-3xl font-extrabold text-violet-600">5</span>
                                <span className="text-slate-400 text-sm mb-0.5">days</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                <Flame size={13} className="text-orange-400" fill="currentColor" />
                                <span className="text-xs text-slate-500">Keep it going!</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border border-slate-200 shadow-sm rounded-2xl">
                        <CardContent className="p-5">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">This Week</p>
                            <div className="flex items-end gap-1">
                                <span className="text-3xl font-extrabold text-slate-800">5</span>
                                <span className="text-slate-400 text-sm mb-0.5">sessions</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">9h 30m total</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-slate-200 shadow-sm rounded-2xl">
                        <CardContent className="p-5">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Best Streak</p>
                            <div className="flex items-end gap-1">
                                <span className="text-3xl font-extrabold text-slate-800">18</span>
                                <span className="text-slate-400 text-sm mb-0.5">days</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Personal best</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Log */}
                <div>
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Recent Sessions</h2>
                    <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                        <ul className="divide-y divide-slate-100">
                            {activities.map((a) => (
                                <li key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-9 w-9 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={16} className="text-violet-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800 text-sm">{a.name}</p>
                                            <p className="text-xs text-slate-400">{a.notes}</p>
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
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}
