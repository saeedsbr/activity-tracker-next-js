'use client'

import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import { BarChart3, TrendingUp, BookOpen, Briefcase, Activity, Flame, Award, Loader2, AlertCircle } from "lucide-react"
import { useActivitySummary } from "@/hooks/useActivitySummary"

export default function AnalyticsPage() {
    const { data: summary, isLoading, isError } = useActivitySummary()
    const streaks = summary?.streaks ?? []

    const totalActivities = summary?.heatmap.reduce((sum, d) => sum + d.count, 0) ?? 0
    const bestStreak = streaks.reduce((max, s) => Math.max(max, s.count), 0)
    const activeDays = summary?.heatmap.filter(d => d.count > 0).length ?? 0

    const categoryConf = [
        { name: 'Academics', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', bar: 'bg-blue-500' },
        { name: 'Business', icon: Briefcase, color: 'text-violet-600', bg: 'bg-violet-50', bar: 'bg-violet-500' },
        { name: 'Health', icon: Activity, color: 'text-green-600', bg: 'bg-green-50', bar: 'bg-green-500' },
    ]

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto px-8 py-8 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <BarChart3 size={20} className="text-slate-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
                        <p className="text-slate-500 text-sm">Insights into your performance and habits</p>
                    </div>
                </div>

                {isError && (
                    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                        <AlertCircle size={16} className="text-amber-500 shrink-0" />
                        <p className="text-sm text-amber-700">Backend not running — start Spring Boot server for real data.</p>
                    </div>
                )}

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { label: 'Total Activities', value: isLoading ? '...' : String(totalActivities), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Best Streak', value: isLoading ? '...' : `${bestStreak}d`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
                        { label: 'Active Days', value: isLoading ? '...' : String(activeDays), icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Categories', value: '3', icon: Award, color: 'text-violet-600', bg: 'bg-violet-50' },
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
                                    {isLoading ? (
                                        <Loader2 size={18} className="animate-spin text-slate-300" />
                                    ) : (
                                        <p className={`text-2xl font-extrabold ${k.color}`}>{k.value}</p>
                                    )}
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Current Streaks */}
                <div>
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Current Streaks</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {categoryConf.map((cfg) => {
                            const Icon = cfg.icon
                            const streakData = streaks.find(s => s.category === cfg.name)
                            const count = streakData?.count ?? 0
                            return (
                                <Card key={cfg.name} className="border border-slate-200 shadow-sm rounded-2xl">
                                    <CardContent className="p-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className={`h-7 w-7 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                                                <Icon size={14} className={cfg.color} />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700">{cfg.name}</span>
                                        </div>
                                        {isLoading ? (
                                            <Loader2 size={18} className="animate-spin text-slate-300" />
                                        ) : (
                                            <>
                                                <div className="flex items-end gap-1 mb-3">
                                                    <span className={`text-2xl font-extrabold ${cfg.color}`}>{count}</span>
                                                    <span className="text-xs text-slate-400 mb-0.5">day streak</span>
                                                </div>
                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${cfg.bar} rounded-full transition-all`} style={{ width: `${Math.min(count * 5, 100)}%` }} />
                                                </div>
                                                <p className="text-xs text-slate-400 mt-1">Last: {streakData?.lastActivity ?? '—'}</p>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* Heatmap data summary */}
                {!isLoading && !isError && summary?.heatmap && summary.heatmap.length > 0 && (
                    <div>
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Activity Heatmap Data</h2>
                        <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                            <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                                {summary.heatmap.sort((a, b) => b.date.localeCompare(a.date)).map((d) => (
                                    <div key={d.date} className="flex items-center justify-between px-5 py-2.5">
                                        <span className="text-sm text-slate-600">{d.date}</span>
                                        <span className="text-sm font-semibold text-green-600">{d.count} {d.count === 1 ? 'activity' : 'activities'}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
