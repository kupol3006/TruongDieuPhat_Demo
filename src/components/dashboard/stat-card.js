// File: src/components/dashboard/stat-card.js
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function StatCard({ title, value, icon: Icon, trend, trendValue, color }) {
  // Random mini chart data
  const chartData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
  const maxValue = Math.max(...chartData)
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-t-4" style={{ borderTopColor: color?.replace('/90', '') }}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {Icon && (
          <div className={`rounded-full p-2 ${color || 'bg-primary/10'}`}>
            <Icon className={`h-4 w-4 ${color ? 'text-white' : 'text-primary'}`} />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold">{value}</div>
            {trend && (
              <div className="flex items-center gap-1 mt-1">
                <span className={`flex items-center text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-0.5" />
                  )} 
                  {trendValue || '0%'}
                </span>
                <span className="text-xs text-muted-foreground">so với tuần trước</span>
              </div>
            )}
          </div>
          
          {/* Mini chart */}
          <div className="flex items-end h-[40px] gap-[2px]">
            {chartData.map((point, i) => (
              <div
                key={i}
                className={`w-[3px] rounded-t-sm ${color || 'bg-primary'} transition-all hover:opacity-100`}
                style={{
                  height: `${(point / maxValue) * 100}%`,
                  opacity: (i + 5) / chartData.length
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
