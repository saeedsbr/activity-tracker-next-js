'use client'

import AppLayout from "@/components/layout/AppLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Flame, AlertTriangle, CheckCircle2 } from "lucide-react"
import { ActivityLogForm } from "@/components/activities/ActivityLogForm"
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap"
import { StreakCounter } from "@/components/dashboard/StreakCounter"
import { WarningAlerts } from "@/components/dashboard/WarningAlerts"

const demoHeatmapData = [
    { date: '2026-04-16', count: 2 },
    { date: '2026-04-15', count: 3 },
    { date: '2026-04-14', count: 1 },
    { date: '2026-04-10', count: 4 },
    { date: '2026-04-09', count: 2 },
]

const demoStreaks = [
    { category: 'STUDY', count: 5, lastActivity: '2026-04-16' },
    { category: 'BUSINESS', count: 12, lastActivity: '2026-04-16' },
    { category: 'HEALTH', count: 3, lastActivity: '2026-04-15' },
]

const demoWarnings = [
    { id: 1, message: 'Missed HEALTH yesterday! Two-Day Rule violation risk.', type: 'TWO_DAY_RULE' as const },
]

export default function DashboardPage() {
    return (
        <AppLayout>
            <div className="space-y-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">Here is your performance overview for today.</p>
                    </div>
                    <div className="w-80">
                        <ActivityLogForm />
                    </div>
                </div>

                <WarningAlerts warnings={demoWarnings} />

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Active Streaks</h3>
                    <StreakCounter streaks={demoStreaks} />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Activity Heatmap</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ActivityHeatmap values={demoHeatmapData} />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Consistency Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <div>
                                        <p className="text-sm font-medium">Business Streak: 12 Days</p>
                                        <p className="text-xs text-muted-foreground">Excellent work!</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                                    <div>
                                        <p className="text-sm font-medium">Study Streak: 5 Days</p>
                                        <p className="text-xs text-muted-foreground">Keep it up.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}
