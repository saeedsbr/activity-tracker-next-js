'use client'

import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/components/layout/AppLayout"
import { Briefcase, Flame, PlusCircle, Loader2, AlertCircle } from "lucide-react"
import { useActivitySummary } from "@/hooks/useActivitySummary"

export default function BusinessPage() {
    const { data: summary, isLoading, isError } = useActivitySummary()
    const streak = summary?.streaks.find(s => s.category === 'Business')

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto px-8 py-8 space-y-8">
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

                {isError && (
                    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                        <AlertCircle size={16} className="text-amber-500 shrink-0" />
                        <p className="text-sm text-amber-700">Backend not running — start Spring Boot server for real data.</p>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                    <Card className="border border-slate-200 shadow-sm rounded-2xl">
                        <CardContent className="p-5">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Streak</p>
                            {isLoading ? <Loader2 size={20} className="animate-spin text-slate-300" /> : (
                                <>
                                    <div className="flex items-end gap-1">
                                        <span className="text-3xl font-extrabold text-violet-600">{streak?.count ?? 0}</span>
                                        <span className="text-slate-400 text-sm mb-0.5">days</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Flame size={13} className="text-orange-400" fill="currentColor" />
                                        <span className="text-xs text-slate-500">{streak?.count ? 'Keep it going!' : 'Start your streak!'}</span>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="border border-slate-200 shadow-sm rounded-2xl">
                        <CardContent className="p-5">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Last Activity</p>
                            <p className="text-base font-bold text-slate-700">{streak?.lastActivity ?? '—'}</p>
                            <p className="text-xs text-slate-400 mt-1">Most recent log date</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-slate-200 shadow-sm rounded-2xl">
                        <CardContent className="p-5">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Status</p>
                            <p className="text-base font-bold text-slate-700">
                                {streak?.count ? '✅ Active' : '⚠️ Not started'}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Session History</h2>
                    <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                        <div className="px-6 py-8 text-center text-slate-400 text-sm">
                            Log activities from the <span className="font-semibold text-green-600">Dashboard Quick Log</span> to populate this history.
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}
