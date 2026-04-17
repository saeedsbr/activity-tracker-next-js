'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
    { id: 1, name: 'STUDY', color: 'bg-gray-900' },
    { id: 2, name: 'BUSINESS', color: 'bg-green-500' },
    { id: 3, name: 'HEALTH', color: 'bg-gray-800' },
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
        // Alert or Toast could be added here
        alert('Activity logged successfully! 🔥')
    }

    return (
        <Card className="bg-[#111827] border-[#1f2937] rounded-2xl shadow-xl">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-white">Log Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Activity Name</label>
                        <input
                            type="text"
                            value={activityName}
                            onChange={(e) => setActivityName(e.target.value)}
                            placeholder="What did you achieve today?"
                            className="w-full bg-[#0f172a] border border-[#1f2937] text-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Domain</label>
                        <div className="grid grid-cols-3 gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={cn(
                                        "px-2 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-tight transition-all duration-200 border",
                                        selectedCategory === cat.id
                                            ? "bg-green-500 border-green-400 text-[#0f172a]"
                                            : "bg-[#0f172a] border-[#1f2937] text-gray-400 hover:border-gray-600 hover:text-gray-200"
                                    )}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-[#0f172a] font-bold py-6 rounded-xl transition-all shadow-lg shadow-green-500/10" disabled={!selectedCategory || !activityName}>
                        Update My Progress
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
