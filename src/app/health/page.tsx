'use client'

import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import { Activity, Flame, CheckCircle2, Clock, PlusCircle, Heart } from "lucide-react"

const activities = [
    { id: 1, name: 'Morning Run (5km)', date: '2024-03-20', duration: '32m', notes: 'Pace: 6:24/km' },
    { id: 2, name: 'Gym Workout', date: '2024-03-19', duration: '1h 10m', notes: 'Chest & triceps day' },
    { id: 3, name: 'Yoga Session', date: '2024-03-18', duration: '45m', notes: 'Morning flexibility routine' },
    { id: 4, name: 'Evening Walk (3km)', date: '2024-03-17', duration: '28m', notes: 'Recovery walk' },
    { id: 5, name: 'Swimming', date: '2024-03-16', duration: '45m', notes: '30 laps completed' },
]

export default function HealthPage() {
    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto px-8 py-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
                            <Activity size={20} className="text-green-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Health</h1>
                            <p className="text-slate-500 text-sm">Track your fitness, wellness, and healthy habits</p>
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
                                <span className="text-3xl font-extrabold text-green-600">21</span>
                                <span className="text-slate-400 text-sm mb-0.5">days</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                <Flame size={13} className="text-orange-400" fill="currentColor" />
                                <span className="text-xs text-slate-500">Amazing consistency!</span>
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
                            <p className="text-xs text-slate-500 mt-1">5h 20m total</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-slate-200 shadow-sm rounded-2xl">
                        <CardContent className="p-5">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Best Streak</p>
                            <div className="flex items-end gap-1">
                                <span className="text-3xl font-extrabold text-slate-800">30</span>
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
                                        <div className="h-9 w-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                                            <Heart size={16} className="text-green-600" />
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
