'use client'

import { useState } from 'react'
import { AlertTriangle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Warning {
    id: number
    type: 'TWO_DAY_RULE' | 'CONSISTENCY'
    message: string
}

export function WarningAlerts({ warnings: initialWarnings }: { warnings: Warning[] }) {
    const [warnings, setWarnings] = useState(initialWarnings)

    if (warnings.length === 0) return null

    return (
        <div className="space-y-4">
            {warnings.map((warning) => (
                <motion.div
                    key={warning.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border backdrop-blur-sm",
                        warning.type === 'TWO_DAY_RULE'
                            ? "bg-red-500/10 border-red-500/50 text-red-400"
                            : "bg-amber-500/10 border-amber-500/50 text-amber-400"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5" />
                        <p className="text-sm font-medium tracking-tight">{warning.message}</p>
                    </div>
                    <button
                        onClick={() => setWarnings(prev => prev.filter(w => w.id !== warning.id))}
                        className="p-1.5 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <X size={16} />
                    </button>
                </motion.div>
            ))}
        </div>
    )
}
