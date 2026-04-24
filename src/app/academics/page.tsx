'use client'

import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import { BookOpen, Flame, CheckCircle2, Clock, PlusCircle } from "lucide-react"

const activities = [
    { id: 1, name: 'Advanced Calculus Study', date: '2024-03-20', duration: '2h 30m', notes: 'Covered integration by parts' },
    { id: 2, name: 'Physics Lab Report', date: '2024-03-19', duration: '1h 45m', notes: 'Completed optics experiment' },
    { id: 3, name: 'Literature Review', date: '2024-03-18', duration: '1h 00m', notes: 'Chapter 5 & 6 done' },
    { id: 4, name: 'Mock Exam Practice', date: '2024-03-17', duration: '3h 00m', notes: 'Full paper attempt' },
    { id: 5, name: 'Research Paper Draft', date: '2024-03-16', duration: '2h 15m', notes: 'Introduction & methodology' },
]

export default function AcademicsPage() {
    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto px-8 py-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                            <BookOpen size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Academics</h1>
                            <p className="text-slate-500 text-sm">Track your study sessions and learning goals</p>
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
                                <span className="text-3xl font-extrabold text-blue-600">12</span>
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
                                <span className="text-3xl font-extrabold text-slate-800">7</span>
                                <span className="text-slate-400 text-sm mb-0.5">sessions</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">11h 30m total</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-slate-200 shadow-sm rounded-2xl">
                        <CardContent className="p-5">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Best Streak</p>
                            <div className="flex items-end gap-1">
                                <span className="text-3xl font-extrabold text-slate-800">24</span>
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
                                        <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={16} className="text-blue-600" />
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
