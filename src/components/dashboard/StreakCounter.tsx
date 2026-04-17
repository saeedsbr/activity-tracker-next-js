'use client'

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Flame } from "lucide-react"

interface Streak {
    category: string
    count: number
    lastActivity: string
}

export function StreakCounter({ streaks }: { streaks: Streak[] }) {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            {streaks.map((streak) => (
                <motion.div
                    key={streak.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className="bg-[#111827] border-[#1f2937] rounded-2xl overflow-hidden shadow-lg shadow-black/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                {streak.category}
                            </CardTitle>
                            <Flame className="h-4 w-4 text-green-500" fill="currentColor" />
                        </CardHeader>
                        <CardContent className="pt-2">
                            <div className="text-5xl font-bold text-green-500 tracking-tighter">
                                {streak.count} <span className="text-2xl font-medium opacity-80 text-gray-400">days</span>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="h-1.5 flex-1 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 transition-all duration-1000"
                                        style={{ width: `${Math.min(streak.count * 10, 100)}%` }}
                                    />
                                </div>
                                <span className="text-[10px] text-gray-500 font-medium uppercase">
                                    Streak 🔥
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
