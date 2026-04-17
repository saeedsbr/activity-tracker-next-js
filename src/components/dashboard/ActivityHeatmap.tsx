'use client'

import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const today = new Date()

export function ActivityHeatmap({ values }: { values: { date: string, count: number }[] }) {
    return (
        <div className="heatmap-container">
            <CalendarHeatmap
                startDate={new Date(today.getFullYear(), today.getMonth() - 5, 1)}
                endDate={today}
                values={values}
                classForValue={(value: { date: string, count: number } | undefined) => {
                    if (!value) return 'color-empty'
                    return `color-github-${value.count}`
                }}
                tooltipDataAttrs={(value: { date: string, count: number }) => {
                    return {
                        'data-tip': `${value.date || ''} has count: ${value.count || 0}`,
                    }
                }}
            />
            <style jsx global>{`
        .react-calendar-heatmap .color-github-1 { fill: #d1fae5; }
        .react-calendar-heatmap .color-github-2 { fill: #6ee7b7; }
        .react-calendar-heatmap .color-github-3 { fill: #10b981; }
        .react-calendar-heatmap .color-github-4 { fill: #047857; }
        .react-calendar-heatmap .color-empty { fill: #f3f4f6; }
        .react-calendar-heatmap rect { rx: 2; ry: 2; }
      `}</style>
        </div>
    )
}
