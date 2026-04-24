import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

export interface RoutinePlanItem {
    id: number
    activityName: string
    category: { id: number; name: string }
    active: boolean
}

export interface PlanItemConsistency {
    planItemId: number
    activityName: string
    categoryName: string
    completedDays: number
    totalDays: number
    completionRate: number
    dailyStatus: Record<string, boolean>
}

export interface RoutineConsistencyData {
    items: PlanItemConsistency[]
    totalDays: number
    startDate: string
    endDate: string
}

export function useRoutinePlan() {
    return useQuery<RoutinePlanItem[]>({
        queryKey: ['routine-plan'],
        queryFn: async () => (await api.get('/routine/plan')).data,
        staleTime: 30_000,
        retry: false,
    })
}

export function useRoutineConsistency(days = 14) {
    return useQuery<RoutineConsistencyData>({
        queryKey: ['routine-consistency', days],
        queryFn: async () => (await api.get(`/routine/consistency?days=${days}`)).data,
        staleTime: 60_000,
        retry: false,
    })
}

export function useAddPlanItem() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (data: { categoryId: number; activityName: string }) =>
            api.post('/routine/plan', data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['routine-plan'] }),
    })
}

export function useRemovePlanItem() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => api.delete(`/routine/plan/${id}`),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['routine-plan'] })
            qc.invalidateQueries({ queryKey: ['routine-consistency'] })
        },
    })
}

export function useCheckPlanItem() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (planItemId: number) =>
            api.post('/routine/check', { planItemId }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['routine-plan'] })
            qc.invalidateQueries({ queryKey: ['routine-consistency'] })
            qc.invalidateQueries({ queryKey: ['activity-summary'] })
        },
    })
}
