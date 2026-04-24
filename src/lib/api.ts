import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message,
            code: error.code,
            data: error.response?.data
        })
        const status = error.response?.status
        if ((status === 401 || status === 403) && typeof window !== 'undefined') {
            // Don't redirect for auth endpoints (login/register may return 401 for bad credentials)
            const url = error.config?.url || ''
            if (!url.includes('/auth/')) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default api
