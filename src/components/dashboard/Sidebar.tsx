'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    BookOpen,
    Briefcase,
    Activity,
    History,
    BarChart3,
    Settings,
    Flame
} from 'lucide-react'

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Academics', href: '/academics', icon: BookOpen },
    { name: 'Business', href: '/business', icon: Briefcase },
    { name: 'Health', href: '/health', icon: Activity },
    { name: 'Activities', href: '/activities', icon: History },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 bg-white border-r border-slate-200 h-full flex flex-col shadow-sm">
            <div className="p-6 border-b border-slate-100">
                <h1 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                    <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
                        <Flame className="text-white" fill="currentColor" size={18} />
                    </div>
                    <span>PerfTracker</span>
                </h1>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-0.5">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                                isActive
                                    ? "bg-green-50 text-green-700 font-semibold"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-green-600" : ""} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-3 border-t border-slate-100">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-150"
                >
                    <Settings size={18} />
                    Settings
                </Link>
            </div>
        </div>
    )
}
