'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StreakCounter } from "@/components/dashboard/StreakCounter"
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap"
import { ActivityLogForm } from "@/components/activities/ActivityLogForm"
import { WarningAlerts } from "@/components/dashboard/WarningAlerts"
import AppLayout from "@/components/layout/AppLayout"
import { CheckCircle2 } from "lucide-react"

// Demo Data
const demoStreaks = [
    { category: 'Academics', count: 12, lastActivity: '2024-03-20' },
    { category: 'Business', count: 5, lastActivity: '2024-03-20' },
    { category: 'Health', count: 21, lastActivity: '2024-03-20' },
]

const demoWarnings: any[] = [
    { id: 1, type: 'TWO_DAY_RULE', message: "Warning: You haven't logged Business activity today. Don't break the two-day rule!" }
]

const demoHeatmapData = [
    { date: '2024-03-01', count: 1 },
    { date: '2024-03-02', count: 2 },
    { date: '2024-03-03', count: 4 },
    { date: '2024-03-04', count: 0 },
    { date: '2024-03-15', count: 3 },
    { date: '2024-03-18', count: 2 },
    { date: '2024-03-20', count: 4 },
]

const recentActivities = [
    { id: 1, name: 'MERN Coding Session', category: 'Business', time: '2 hours ago' },
    { id: 2, name: 'Morning Run (5km)', category: 'Health', time: '5 hours ago' },
    { id: 3, name: 'Advanced Calculus Study', category: 'Academics', time: 'Yesterday' },
]

export default function DashboardPage() {
    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto p-8 space-y-10">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Daily Dashboard</h1>
                    <p className="text-gray-400">Keep up the momentum. You're doing great.</p>
                </div>

                {/* Hero Section: Streaks */}
                <section className="space-y-4">
                    <StreakCounter streaks={demoStreaks} />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content: Heatmap & Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Consistency Heatmap</h2>
                            </div>
                            <Card className="bg-[#111827] border-[#1f2937] rounded-2xl shadow-xl p-6">
                                <ActivityHeatmap values={demoHeatmapData} />
                            </Card>
                        </section>

                        <section className="space-y-4">
                            <WarningAlerts warnings={demoWarnings} />
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Recent Activities</h2>
                            <Card className="bg-[#111827] border-[#1f2937] rounded-2xl overflow-hidden">
                                <ul className="divide-y divide-[#1f2937]">
                                    {recentActivities.map((activity) => (
                                        <li key={activity.id} className="flex items-center justify-between p-5 hover:bg-gray-800/30 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                                                    <CheckCircle2 size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-200">{activity.name}</p>
                                                    <p className="text-xs text-gray-500">{activity.category}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500">{activity.time}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </section>
                    </div>

                    {/* Sidebar Area: Logging Form */}
                    <div className="space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Quick Log</h2>
                            <ActivityLogForm />
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
