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
    Settings,
    AlertTriangle,
    Flame
} from 'lucide-react'

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Academics', href: '/academics', icon: BookOpen },
    { name: 'Business', href: '/business', icon: Briefcase },
    { name: 'Health', href: '/health', icon: Activity },
    { name: 'Activities', href: '/activities', icon: History },
    { name: 'Analytics', href: '/analytics', icon: Flame },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 bg-[#111827] border-r border-[#1f2937] h-full flex flex-col">
            <div className="p-8">
                <h1 className="text-xl font-bold flex items-center gap-2 text-white">
                    <Flame className="text-green-500" fill="currentColor" size={24} />
                    <span>PerfTracker</span>
                </h1>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-green-500/10 text-green-500"
                                    : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                            )}
                        >
                            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-6 border-t border-[#1f2937]">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 transition-all duration-200"
                >
                    <Settings size={18} />
                    Settings
                </Link>
            </div>
        </div>
    )
}
