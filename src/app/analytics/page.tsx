'use client'

import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import { BarChart3, TrendingUp, BookOpen, Briefcase, Activity, Flame, Award } from "lucide-react"

const weeklyData = [
    { day: 'Mon', academic: 2, business: 1, health: 1 },
    { day: 'Tue', academic: 1, business: 2, health: 1 },
    { day: 'Wed', academic: 0, business: 1, health: 2 },
    { day: 'Thu', academic: 2, business: 0, health: 1 },
    { day: 'Fri', academic: 1, business: 2, health: 1 },
    { day: 'Sat', academic: 1, business: 1, health: 2 },
    { day: 'Sun', academic: 0, business: 0, health: 1 },
]

const maxVal = 4

export default function AnalyticsPage() {
    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto px-8 py-8 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <BarChart3 size={20} className="text-slate-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
                        <p className="text-slate-500 text-sm">Insights into your performance and habits</p>
                    </div>
                </div>

                {/* Summary KPIs */}
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { label: 'Total Activities', value: '124', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Best Streak', value: '30d', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
                        { label: 'Avg / Day', value: '2.1', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Active Months', value: '4', icon: Award, color: 'text-violet-600', bg: 'bg-violet-50' },
                    ].map((k) => {
                        const Icon = k.icon
                        return (
                            <Card key={k.label} className="border border-slate-200 shadow-sm rounded-2xl">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{k.label}</p>
                                        <div className={`h-7 w-7 rounded-lg ${k.bg} flex items-center justify-center`}>
                                            <Icon size={14} className={k.color} />
                                        </div>
                                    </div>
                                    <p className={`text-2xl font-extrabold ${k.color}`}>{k.value}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Weekly Bar Chart (Pure CSS) */}
                <div>
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Weekly Activity Breakdown</h2>
                    <Card className="border border-slate-200 shadow-sm rounded-2xl">
                        <CardContent className="p-6">
                            <div className="flex items-end justify-around gap-2 h-40">
                                {weeklyData.map((d) => (
                                    <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
                                        <div className="flex flex-col justify-end gap-0.5 w-full" style={{ height: 120 }}>
                                            {d.academic > 0 && (
                                                <div className="w-full rounded-t-sm bg-blue-400 transition-all" style={{ height: `${(d.academic / maxVal) * 100}%` }} />
                                            )}
                                            {d.business > 0 && (
                                                <div className="w-full bg-violet-400 transition-all" style={{ height: `${(d.business / maxVal) * 100}%` }} />
                                            )}
                                            {d.health > 0 && (
                                                <div className="w-full rounded-b-sm bg-green-400 transition-all" style={{ height: `${(d.health / maxVal) * 100}%` }} />
                                            )}
                                            {d.academic === 0 && d.business === 0 && d.health === 0 && (
                                                <div className="w-full rounded-sm bg-slate-100 transition-all" style={{ height: '8px' }} />
                                            )}
                                        </div>
                                        <span className="text-xs text-slate-400">{d.day}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Legend */}
                            <div className="flex gap-5 mt-4 justify-center">
                                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-blue-400" /><span className="text-xs text-slate-500">Academics</span></div>
                                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-violet-400" /><span className="text-xs text-slate-500">Business</span></div>
                                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-green-400" /><span className="text-xs text-slate-500">Health</span></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Current Streaks Breakdown */}
                <div>
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Current Streaks</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { category: 'Academics', streak: 12, best: 24, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', bar: 'bg-blue-500' },
                            { category: 'Business', streak: 5, best: 18, icon: Briefcase, color: 'text-violet-600', bg: 'bg-violet-50', bar: 'bg-violet-500' },
                            { category: 'Health', streak: 21, best: 30, icon: Activity, color: 'text-green-600', bg: 'bg-green-50', bar: 'bg-green-500' },
                        ].map((s) => {
                            const Icon = s.icon
                            const pct = Math.round((s.streak / s.best) * 100)
                            return (
                                <Card key={s.category} className="border border-slate-200 shadow-sm rounded-2xl">
                                    <CardContent className="p-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className={`h-7 w-7 rounded-lg ${s.bg} flex items-center justify-center`}>
                                                <Icon size={14} className={s.color} />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700">{s.category}</span>
                                        </div>
                                        <div className="flex items-end gap-1 mb-3">
                                            <span className={`text-2xl font-extrabold ${s.color}`}>{s.streak}</span>
                                            <span className="text-xs text-slate-400 mb-0.5">/ {s.best} days best</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${s.bar} rounded-full`} style={{ width: `${pct}%` }} />
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">{pct}% of best</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
