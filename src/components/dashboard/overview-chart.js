"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock chart data
const chartData = {
  daily: Array.from({ length: 7 }).map((_, i) => ({
    value: 20 + Math.floor(Math.random() * 40),
    label: new Date(Date.now() - i * 86400000).toLocaleDateString('en-US', { weekday: 'short' })
  })).reverse(),
  weekly: Array.from({ length: 8 }).map((_, i) => ({
    value: 120 + Math.floor(Math.random() * 200),
    label: `Week ${i+1}`
  })),
  monthly: Array.from({ length: 12 }).map((_, i) => ({
    value: 500 + Math.floor(Math.random() * 1000),
    label: new Date(0, i).toLocaleDateString('en-US', { month: 'short' })
  }))
}

export function OverviewChart() {
  const [timeRange, setTimeRange] = useState('daily')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const data = chartData[timeRange]
  const max = Math.max(...data.map(d => d.value))
  
  // Calculate column color based on value
  const getColumnColor = (value) => {
    const percent = value / max
    if (percent > 0.8) return "bg-blue-500"
    if (percent > 0.6) return "bg-blue-400"
    if (percent > 0.4) return "bg-blue-300"
    return "bg-blue-200"
  }
  
  return (
    <Card className="col-span-full overflow-hidden shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-blue-500/70">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>
              {timeRange === 'daily' 
                ? 'Activity counts for the past 7 days' 
                : timeRange === 'weekly' 
                ? 'Activity counts for the past 8 weeks' 
                : 'Activity counts for this year'}
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Dropdown Menu */}
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-xs"
              >
                Export Data
                <ChevronDown className="h-3 w-3" />
              </Button>
              
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-md border bg-popover p-1 shadow-md">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => {
                        console.log("Export to Excel")
                        setIsDropdownOpen(false)
                      }}
                    >
                      <Download className="h-3 w-3 mr-2" />
                      Excel (.xlsx)
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => {
                        console.log("Export to CSV")
                        setIsDropdownOpen(false)
                      }}
                    >
                      <Download className="h-3 w-3 mr-2" />
                      CSV (.csv)
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => {
                        console.log("Export to PDF")
                        setIsDropdownOpen(false)
                      }}
                    >
                      <Download className="h-3 w-3 mr-2" />
                      PDF (.pdf)
                    </Button>
                  </div>
                </>
              )}
            </div>
            
            {/* Time Range Buttons */}
            <div className="flex items-center gap-1 border rounded-md p-0.5 bg-muted/50">
              <button 
                onClick={() => setTimeRange('daily')}
                className={`px-3 py-1 text-xs rounded-sm transition-colors ${timeRange === 'daily' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'}`}
              >
                Daily
              </button>
              <button 
                onClick={() => setTimeRange('weekly')}
                className={`px-3 py-1 text-xs rounded-sm transition-colors ${timeRange === 'weekly' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'}`}
              >
                Weekly
              </button>
              <button 
                onClick={() => setTimeRange('monthly')}
                className={`px-3 py-1 text-xs rounded-sm transition-colors ${timeRange === 'monthly' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'}`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="pt-2">
          <div className="flex items-end h-60 gap-2">
            {data.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full relative flex justify-center items-end h-full">
                  <div 
                    className={`w-full max-w-[40px] rounded-t-md transition-all duration-500 ${getColumnColor(item.value)}`} 
                    style={{ 
                      height: `${(item.value / max) * 100}%`,
                      transform: `scaleY(${timeRange === 'daily' ? '1' : '0.95'})`,
                      transformOrigin: 'bottom',
                      opacity: 0.9
                    }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap shadow-md transition-opacity z-10">
                      {item.value}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-end mt-6 gap-4">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
              <span className="text-xs text-muted-foreground">80-100%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-blue-400"></div>
              <span className="text-xs text-muted-foreground">60-80%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-blue-300"></div>
              <span className="text-xs text-muted-foreground">40-60%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-blue-200"></div>
              <span className="text-xs text-muted-foreground">0-40%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
