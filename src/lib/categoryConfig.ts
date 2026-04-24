import {
    BookOpen, Briefcase, Activity, Church, Wallet,
    Users, Palette, Sparkles, LucideIcon
} from 'lucide-react'

export interface CategoryStyle {
    icon: LucideIcon
    color: string
    bg: string
}

const categoryStyles: Record<string, CategoryStyle> = {
    Academics: { icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    Business: { icon: Briefcase, color: 'text-violet-600', bg: 'bg-violet-50' },
    Health: { icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    Religion: { icon: Church, color: 'text-amber-600', bg: 'bg-amber-50' },
    Finance: { icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    Social: { icon: Users, color: 'text-pink-600', bg: 'bg-pink-50' },
    Creativity: { icon: Palette, color: 'text-orange-600', bg: 'bg-orange-50' },
    'Personal Development': { icon: Sparkles, color: 'text-cyan-600', bg: 'bg-cyan-50' },
}

const defaultStyle: CategoryStyle = { icon: Sparkles, color: 'text-slate-600', bg: 'bg-slate-50' }

export function getCategoryStyle(name: string): CategoryStyle {
    return categoryStyles[name] || defaultStyle
}
