import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export interface CategoryStreak {
    category: string
    count: number
    lastActivity: string | null
}

export interface HeatmapData {
    date: string
    count: number
}

export interface ActivitySummary {
    streaks: CategoryStreak[]
    heatmap: HeatmapData[]
    warnings: string[]
}

async function fetchSummary(): Promise<ActivitySummary> {
    const res = await api.get('/activities/summary')
    return res.data
}

export function useActivitySummary() {
    return useQuery<ActivitySummary>({
        queryKey: ['activity-summary'],
        queryFn: fetchSummary,
        staleTime: 30_000,
        retry: false,
    })
}

export async function logActivity(categoryId: number, activityName: string) {
    const res = await api.post('/activities/log', { categoryId, activityName })
    return res.data
}
