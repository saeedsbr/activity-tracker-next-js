'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Flame } from "lucide-react"

interface Streak {
    category: string
    count: number
    lastActivity: string
}

export function StreakCounter({ streaks }: { streaks: Streak[] }) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {streaks.map((streak) => (
                <Card key={streak.category}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{streak.category} Streak</CardTitle>
                        <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{streak.count} Days</div>
                        <p className="text-xs text-muted-foreground">
                            Last: {new Date(streak.lastActivity).toLocaleDateString()}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
