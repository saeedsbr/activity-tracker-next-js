'use client'

import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

const today = new Date()

export function ActivityHeatmap({ values }: { values: { date: string, count: number }[] }) {
    return (
        <div className="heatmap-container p-2">
            <CalendarHeatmap
                startDate={new Date(today.getFullYear(), today.getMonth() - 5, 1)}
                endDate={today}
                values={values}
                classForValue={(value: any) => {
                    if (!value || value.count === 0) return 'color-empty'
                    return `color-scale-${Math.min(value.count || 0, 4)}`
                }}
                gutterSize={3}
            />
            <style jsx global>{`
        .react-calendar-heatmap .color-scale-0 { fill: #1f2937; }
        .react-calendar-heatmap .color-scale-1 { fill: #064e3b; }
        .react-calendar-heatmap .color-scale-2 { fill: #065f46; }
        .react-calendar-heatmap .color-scale-3 { fill: #059669; }
        .react-calendar-heatmap .color-scale-4 { fill: #34d399; }
        .react-calendar-heatmap .color-empty { fill: #1f2937; }
        .react-calendar-heatmap rect { rx: 3; ry: 3; }
      `}</style>
        </div>
    )
}
