import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export interface Category {
    id: number
    name: string
}

export function useCategories() {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => (await api.get('/activities/categories')).data,
        staleTime: 5 * 60 * 1000, // 5 minutes — categories rarely change
        retry: false,
    })
}
