'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import {
    CalendarCheck, PlusCircle,
    Trash2, Loader2, CheckCircle2, XCircle
} from "lucide-react"
import {
    useRoutinePlan, useRoutineConsistency,
    useAddPlanItem, useRemovePlanItem
} from "@/hooks/useRoutinePlan"
import { useCategories } from "@/hooks/useCategories"
import { getCategoryStyle } from "@/lib/categoryConfig"

export default function RoutinePage() {
    const { data: planItems, isLoading: planLoading } = useRoutinePlan()
    const { data: consistency, isLoading: consistencyLoading } = useRoutineConsistency(14)
    const { data: categories } = useCategories()
    const addItem = useAddPlanItem()
    const removeItem = useRemovePlanItem()

    const [activityName, setActivityName] = useState('')
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()
        if (!categoryId || !activityName.trim()) return
        addItem.mutate(
            { categoryId, activityName: activityName.trim() },
            {
                onSuccess: () => {
                    setActivityName('')
                    setCategoryId(null)
                    setShowAddForm(false)
                },
            }
        )
    }

    // Get sorted dates for the consistency grid
    const dates = consistency?.items?.[0]?.dailyStatus
        ? Object.keys(consistency.items[0].dailyStatus).sort()
        : []

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                            <CalendarCheck size={20} className="text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Daily Routine</h1>
                            <p className="text-slate-500 text-sm">Plan your daily targets and track consistency</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                        <PlusCircle size={16} />
                        Add to Routine
                    </button>
                </div>

                {/* Add Form */}
                {showAddForm && (
                    <Card className="border border-slate-200 shadow-sm rounded-2xl">
                        <CardContent className="p-5">
                            <p className="text-sm font-semibold text-slate-700 mb-3">Add a planned activity to your daily routine</p>
                            <form onSubmit={handleAdd} className="space-y-3">
                                <input
                                    type="text"
                                    value={activityName}
                                    onChange={(e) => setActivityName(e.target.value)}
                                    placeholder="e.g., Study DSA, Workout, Quran reading, Budget review"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 placeholder:text-slate-400"
                                    required
                                />
                                <div className="flex flex-wrap gap-2">
                                    {(categories ?? []).map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setCategoryId(cat.id)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${categoryId === cat.id
                                                ? 'bg-green-600 border-green-600 text-white'
                                                : 'border-slate-200 text-slate-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50'
                                                }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        disabled={addItem.isPending || !categoryId || !activityName.trim()}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 transition-colors flex items-center gap-2"
                                    >
                                        {addItem.isPending ? <Loader2 size={14} className="animate-spin" /> : <PlusCircle size={14} />}
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Plan Items List */}
                <div>
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">My Planned Activities</h2>
                    <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                        {planLoading ? (
                            <div className="p-8 flex items-center justify-center">
                                <Loader2 size={20} className="animate-spin text-slate-300" />
                            </div>
                        ) : !planItems || planItems.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 text-sm">
                                No routine items yet. Click <span className="font-semibold text-green-600">"Add to Routine"</span> to plan your daily activities.
                            </div>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {planItems.map((item) => {
                                    const style = getCategoryStyle(item.category.name)
                                    const Icon = style.icon
                                    return (
                                        <li key={item.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-8 w-8 rounded-lg ${style.bg} flex items-center justify-center shrink-0`}>
                                                    <Icon size={15} className={style.color} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800 text-sm">{item.activityName}</p>
                                                    <span className={`text-xs font-medium ${style.color}`}>{item.category.name}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem.mutate(item.id)}
                                                disabled={removeItem.isPending}
                                                className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                                title="Remove from routine"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </Card>
                </div>

                {/* Consistency Matrix */}
                {planItems && planItems.length > 0 && (
                    <div>
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                            Consistency Overview (Last 14 Days)
                        </h2>
                        <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                            {consistencyLoading ? (
                                <div className="p-8 flex items-center justify-center">
                                    <Loader2 size={20} className="animate-spin text-slate-300" />
                                </div>
                            ) : !consistency || consistency.items.length === 0 ? (
                                <div className="p-8 text-center text-slate-400 text-sm">
                                    No consistency data yet. Start logging your routine activities!
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100">
                                                <th className="text-left px-4 py-3 font-semibold text-slate-600 sticky left-0 bg-white min-w-[160px]">
                                                    Activity
                                                </th>
                                                {dates.map((date) => {
                                                    const d = new Date(date + 'T00:00:00')
                                                    const day = d.getDate()
                                                    const month = d.toLocaleString('default', { month: 'short' })
                                                    return (
                                                        <th key={date} className="px-1.5 py-3 font-medium text-slate-400 text-center min-w-[36px]">
                                                            <div>{month}</div>
                                                            <div className="text-slate-600">{day}</div>
                                                        </th>
                                                    )
                                                })}
                                                <th className="px-4 py-3 font-semibold text-slate-600 text-right min-w-[60px]">Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {consistency.items.map((item) => {
                                                const style = getCategoryStyle(item.categoryName)
                                                const rate = Math.round(item.completionRate * 100)
                                                return (
                                                    <tr key={item.planItemId} className="border-b border-slate-50 hover:bg-slate-50/50">
                                                        <td className="px-4 py-3 sticky left-0 bg-white">
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-xs font-medium ${style.color}`}>{item.categoryName}</span>
                                                                <span className="text-slate-400">|</span>
                                                                <span className="font-semibold text-slate-700">{item.activityName}</span>
                                                            </div>
                                                        </td>
                                                        {dates.map((date) => {
                                                            const done = item.dailyStatus[date]
                                                            const isToday = date === new Date().toISOString().split('T')[0]
                                                            return (
                                                                <td key={date} className="px-1.5 py-3 text-center">
                                                                    {done === undefined ? (
                                                                        <span className="text-slate-200">-</span>
                                                                    ) : done ? (
                                                                        <CheckCircle2 size={16} className="text-green-500 mx-auto" />
                                                                    ) : (
                                                                        <XCircle size={16} className={`mx-auto ${isToday ? 'text-amber-400' : 'text-red-300'}`} />
                                                                    )}
                                                                </td>
                                                            )
                                                        })}
                                                        <td className="px-4 py-3 text-right">
                                                            <span className={`font-bold ${rate >= 80 ? 'text-green-600' : rate >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
                                                                {rate}%
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
