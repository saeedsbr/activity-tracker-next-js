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
        <div className="w-64 bg-card border-r h-full flex flex-col">
            <div className="p-6">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Flame className="text-orange-500" />
                    PerfTracker
                </h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <Icon size={18} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <Settings size={18} />
                    Settings
                </Link>
            </div>
        </div>
    )
}
