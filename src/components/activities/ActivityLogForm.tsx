'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
    { id: 1, name: 'STUDY', color: 'bg-blue-500' },
    { id: 2, name: 'BUSINESS', color: 'bg-green-500' },
    { id: 3, name: 'HEALTH', color: 'bg-red-500' },
]

export function ActivityLogForm() {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [activityName, setActivityName] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedCategory || !activityName) return

        console.log('Logging activity:', {
            categoryId: selectedCategory,
            activityName,
            logDate: new Date().toISOString().split('T')[0],
            isCompleted: true
        })

        // Reset form
        setActivityName('')
        setSelectedCategory(null)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Log New Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Activity Name</label>
                        <input
                            type="text"
                            value={activityName}
                            onChange={(e) => setActivityName(e.target.value)}
                            placeholder="e.g. MERN Coding, Morning Run"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Domain</label>
                        <div className="flex gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                                        selectedCategory === cat.id
                                            ? "ring-2 ring-primary ring-offset-2 bg-primary text-primary-foreground"
                                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    )}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={!selectedCategory || !activityName}>
                        Log Activity
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
