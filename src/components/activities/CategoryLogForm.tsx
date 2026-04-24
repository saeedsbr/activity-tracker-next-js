'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { logActivity } from '@/hooks/useActivitySummary'
import { Loader2, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface CategoryLogFormProps {
    categoryId: number
    categoryName: string
    onClose: () => void
}

export function CategoryLogForm({ categoryId, categoryName, onClose }: CategoryLogFormProps) {
    const queryClient = useQueryClient()
    const [activityName, setActivityName] = useState('')
    const [isLogging, setIsLogging] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!activityName.trim()) return
        setIsLogging(true)
        setMessage(null)
        try {
            await logActivity(categoryId, activityName.trim())
            setMessage({ type: 'success', text: 'Activity logged successfully!' })
            setActivityName('')
            queryClient.invalidateQueries({ queryKey: ['activity-summary'] })
        } catch (err: any) {
            setMessage({ type: 'error', text: err?.response?.data?.message || 'Failed to log activity' })
        } finally {
            setIsLogging(false)
        }
    }

    return (
        <Card className="border border-slate-200 shadow-sm rounded-2xl">
            <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-700">Log {categoryName} Activity</span>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={16} />
                    </button>
                </div>
                {message && (
                    <div className={`text-xs px-3 py-2 rounded-lg mb-3 font-medium ${message.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-700'
                        : 'bg-red-50 border border-red-200 text-red-700'
                        }`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
                        placeholder="What did you achieve?"
                        className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 placeholder:text-slate-400"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLogging || !activityName.trim()}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 transition-colors flex items-center gap-2"
                    >
                        {isLogging ? <Loader2 size={14} className="animate-spin" /> : 'Log'}
                    </button>
                </form>
            </CardContent>
        </Card>
    )
}
