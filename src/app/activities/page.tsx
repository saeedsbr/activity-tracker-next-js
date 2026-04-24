'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import { History, BookOpen, Briefcase, Activity, Clock, Search, Loader2, AlertCircle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { useActivitySummary } from "@/hooks/useActivitySummary"

interface ActivityLog {
    id: number
    activityName: string
    category: {
        id: number
        name: string
    }
    logDate: string
}

const categoryConfig: Record<string, { icon: any; color: string; bg: string }> = {
    Business: { icon: Briefcase, color: 'text-violet-600', bg: 'bg-violet-50' },
    Health: { icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    Academics: { icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
}

export default function ActivitiesPage() {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("All")

    const { data: activities, isLoading: logsLoading, isError } = useQuery<ActivityLog[]>({
        queryKey: ['activities'],
        queryFn: () => api.get('/activities').then(res => res.data)
    })

    const { data: summary, isLoading: summaryLoading } = useActivitySummary()

    const filteredActivities = activities?.filter(a => {
        const matchesSearch = a.activityName.toLowerCase().includes(search.toLowerCase())
        const matchesFilter = filter === 'All' || a.category.name === filter
        return matchesSearch && matchesFilter
    }) ?? []

    const totalActivities = summary?.heatmap.reduce((sum, d) => sum + d.count, 0) ?? 0
    const activeDays = summary?.heatmap.filter(d => d.count > 0).length ?? 0

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

                {isError && (
                    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                        <AlertCircle size={16} className="text-amber-500 shrink-0" />
                        <p className="text-sm text-amber-700">Failed to load activities. Ensure backend is running.</p>
                    </div>
                )}

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Total Activities', value: summaryLoading ? '...' : String(totalActivities), sub: 'All time' },
                        { label: 'Total Categories', value: '3', sub: 'Active goals' },
                        { label: 'Active Days', value: summaryLoading ? '...' : String(activeDays), sub: 'Consistency' },
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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/30 placeholder:text-slate-400"
                        />
                    </div>
                    {['All', 'Academics', 'Business', 'Health'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${filter === f ? 'bg-green-600 text-white border-green-600' : 'bg-white border-slate-200 text-slate-600 hover:border-green-400 hover:text-green-700'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Activity List */}
                <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                    {logsLoading ? (
                        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
                            <Loader2 className="animate-spin" size={24} />
                            <p className="text-sm">Fetching history...</p>
                        </div>
                    ) : filteredActivities.length > 0 ? (
                        <ul className="divide-y divide-slate-100">
                            {filteredActivities.map((a) => {
                                const cfg = categoryConfig[a.category.name] || { icon: History, color: 'text-slate-600', bg: 'bg-slate-50' }
                                const Icon = cfg.icon
                                return (
                                    <li key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-9 w-9 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                                                <Icon size={16} className={cfg.color} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800 text-sm">{a.activityName}</p>
                                                <span className={`text-xs font-medium ${cfg.color}`}>{a.category.name}</span>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-xs font-medium text-slate-600">{a.logDate}</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">Logged successfully</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <div className="p-12 text-center text-slate-400">
                            <p className="text-sm">No activities found matching your criteria.</p>
                        </div>
                    )}
                </Card>
            </div>
        </AppLayout>
    )
}
