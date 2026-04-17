'use client'

import { AlertTriangle, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Warning {
    id: number
    message: string
    type: 'TWO_DAY_RULE' | 'WEEKEND_SLIP' | 'ZERO_WEEK'
}

export function WarningAlerts({ warnings: initialWarnings }: { warnings: Warning[] }) {
    const [warnings, setWarnings] = useState(initialWarnings)

    if (warnings.length === 0) return null

    return (
        <div className="space-y-4">
            {warnings.map((warning) => (
                <div
                    key={warning.id}
                    className={cn(
                        "flex items-center justify-between p-4 rounded-lg border",
                        warning.type === 'TWO_DAY_RULE'
                            ? "bg-red-50 border-red-200 text-red-800"
                            : "bg-orange-50 border-orange-200 text-orange-800"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5" />
                        <p className="text-sm font-medium">{warning.message}</p>
                    </div>
                    <button
                        onClick={() => setWarnings(prev => prev.filter(w => w.id !== warning.id))}
                        className="p-1 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    )
}
