'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import { TrendingUp, Flame, CheckCircle2, Loader2, AlertCircle, CalendarCheck } from "lucide-react"
import { useActivitySummary, logActivity } from '@/hooks/useActivitySummary'
import { useRoutinePlan, useRoutineConsistency, useCheckPlanItem } from '@/hooks/useRoutinePlan'
import { useCategories } from '@/hooks/useCategories'
import { getCategoryStyle } from '@/lib/categoryConfig'

export default function DashboardPage() {
    const { data: summary, isLoading, isError } = useActivitySummary()
    const { data: categories } = useCategories()
    const queryClient = useQueryClient()
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
    const [activityName, setActivityName] = useState('')
    const [isLogging, setIsLogging] = useState(false)
    const [logMessage, setLogMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const handleLog = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedCategoryId || !activityName.trim()) return
        setIsLogging(true)
        setLogMessage(null)
        try {
            await logActivity(selectedCategoryId, activityName.trim())
            setLogMessage({ type: 'success', text: 'Activity logged! 🔥' })
            setActivityName('')
            setSelectedCategoryId(null)
            queryClient.invalidateQueries({ queryKey: ['activity-summary'] })
        } catch (err: any) {
            setLogMessage({ type: 'error', text: err?.response?.data?.message || 'Failed to log activity' })
        } finally {
            setIsLogging(false)
        }
    }

    const streaks = summary?.streaks ?? []
    const warnings = summary?.warnings ?? []

    const { data: planItems } = useRoutinePlan()
    const todayStr = new Date().toISOString().split('T')[0]
    const { data: todayConsistency } = useRoutineConsistency(1)
    const checkItem = useCheckPlanItem()

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Daily Dashboard</h1>
                    <p className="text-slate-500 mt-1">Keep up the momentum. You're doing great.</p>
                </div>

                {/* Streak Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <Card key={i} className="border border-slate-200 shadow-sm rounded-2xl">
                                <CardContent className="p-5 flex items-center justify-center h-24">
                                    <Loader2 size={20} className="animate-spin text-slate-300" />
                                </CardContent>
                            </Card>
                        ))
                    ) : isError ? (
                        <div className="col-span-full bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center gap-3">
                            <AlertCircle size={18} className="text-amber-500 shrink-0" />
                            <p className="text-sm text-amber-700">Backend is not running. Start the Spring Boot server to see real data.</p>
                        </div>
                    ) : (
                        streaks.map((streakData) => {
                            const style = getCategoryStyle(streakData.category)
                            const Icon = style.icon
                            return (
                                <Card key={streakData.category} className="border border-slate-200 shadow-sm rounded-2xl">
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{streakData.category}</span>
                                            <div className={`h-7 w-7 rounded-lg ${style.bg} flex items-center justify-center`}>
                                                <Icon size={14} className={style.color} />
                                            </div>
                                        </div>
                                        <div className="flex items-end gap-1">
                                            <span className={`text-3xl font-extrabold ${style.color}`}>{streakData.count}</span>
                                            <span className="text-slate-400 text-xs mb-0.5 ml-1">day streak</span>
                                        </div>
                                        <div className="mt-3 flex items-center gap-1.5">
                                            <Flame size={12} className="text-orange-400" fill="currentColor" />
                                            <span className="text-xs text-slate-500">
                                                {streakData.lastActivity ? `Last: ${streakData.lastActivity}` : 'No activity yet'}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                    )}
                </div>

                {/* Today's Routine Checklist */}
                {planItems && planItems.length > 0 && (
                    <div>
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <CalendarCheck size={14} />
                            Today's Routine
                        </h2>
                        <Card className="border border-slate-200 shadow-sm rounded-2xl">
                            <CardContent className="p-5 space-y-2">
                                {planItems.map((item) => {
                                    const isDone = todayConsistency?.items
                                        ?.find(c => c.planItemId === item.id)
                                        ?.dailyStatus[todayStr] ?? false
                                    const style = getCategoryStyle(item.category.name)
                                    return (
                                        <div key={item.id} className="flex items-center gap-3 py-1.5">
                                            <input
                                                type="checkbox"
                                                checked={isDone}
                                                disabled={isDone || checkItem.isPending}
                                                onChange={() => checkItem.mutate(item.id)}
                                                className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500 accent-green-600"
                                            />
                                            <span className={`text-sm font-medium ${isDone ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                {item.activityName}
                                            </span>
                                            <span className={`text-xs font-medium ${style.color}`}>
                                                {item.category.name}
                                            </span>
                                        </div>
                                    )
                                })}
                            </CardContent>
                        </Card>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Warnings</h2>
                        {warnings.length > 0 ? (
                            <div className="space-y-2">
                                {warnings.map((w, i) => (
                                    <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
                                        <TrendingUp size={16} className="text-amber-500 mt-0.5 shrink-0" />
                                        <p className="text-xs text-amber-700 font-medium">{w}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (!isLoading && !isError) ? (
                            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
                                <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                                <p className="text-xs text-green-700 font-medium">You're on track! All categories logged today.</p>
                            </div>
                        ) : null}
                    </div>

                    {/* Quick Log */}
                    <div>
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Log</h2>
                        <Card className="border border-slate-200 shadow-sm rounded-2xl">
                            <CardContent className="p-5">
                                <form onSubmit={handleLog} className="space-y-4">
                                    {logMessage && (
                                        <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium ${logMessage.type === 'success'
                                            ? 'bg-green-50 border border-green-200 text-green-700'
                                            : 'bg-red-50 border border-red-200 text-red-700'
                                            }`}>
                                            {logMessage.text}
                                        </div>
                                    )}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Activity</label>
                                        <input
                                            type="text"
                                            value={activityName}
                                            onChange={(e) => setActivityName(e.target.value)}
                                            placeholder="What did you achieve today?"
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 placeholder:text-slate-400"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Domain</label>
                                        <div className="flex flex-wrap gap-2">
                                            {(categories ?? []).map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setSelectedCategoryId(cat.id)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${selectedCategoryId === cat.id
                                                        ? 'bg-green-600 border-green-600 text-white'
                                                        : 'border-slate-200 text-slate-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50'
                                                        }`}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLogging || !selectedCategoryId || !activityName.trim()}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isLogging ? <><Loader2 size={14} className="animate-spin" /> Logging...</> : 'Update My Progress'}
                                    </button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
