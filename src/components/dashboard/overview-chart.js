"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Download, ChevronDown, BarChart2, LineChart as LineChartIcon, Info, EyeOff, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, 
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { useTheme } from 'next-themes'

// Enhanced mock chart data with multiple data series
// Data for May 21, 2025
const generateRealisticData = () => {
  // Create data with users, content, and interactions series
  const daily = [
    { 
      date: "May 15, 2025", 
      label: "Fri", 
      users: 24, 
      content: 18, 
      interactions: 32, 
      total: 74 
    },
    { 
      date: "May 16, 2025", 
      label: "Sat", 
      users: 18, 
      content: 12, 
      interactions: 22, 
      total: 52 
    },
    { 
      date: "May 17, 2025", 
      label: "Sun", 
      users: 15, 
      content: 10, 
      interactions: 19, 
      total: 44 
    },
    { 
      date: "May 18, 2025", 
      label: "Mon", 
      users: 32, 
      content: 26, 
      interactions: 45, 
      total: 103 
    },
    { 
      date: "May 19, 2025", 
      label: "Tue", 
      users: 35, 
      content: 31, 
      interactions: 42, 
      total: 108 
    },
    { 
      date: "May 20, 2025", 
      label: "Wed", 
      users: 38, 
      content: 29, 
      interactions: 48, 
      total: 115 
    },
    { 
      date: "May 21, 2025", 
      label: "Thu", 
      users: 31, 
      content: 25, 
      interactions: 38, 
      total: 94 
    }
  ];
  
  const weekly = [
    { date: "Mar 31 - Apr 6", label: "W1", users: 168, content: 124, interactions: 201, total: 493 },
    { date: "Apr 7 - Apr 13", label: "W2", users: 175, content: 132, interactions: 215, total: 522 },
    { date: "Apr 14 - Apr 20", label: "W3", users: 154, content: 118, interactions: 198, total: 470 },
    { date: "Apr 21 - Apr 27", label: "W4", users: 185, content: 145, interactions: 228, total: 558 },
    { date: "Apr 28 - May 4", label: "W5", users: 202, content: 156, interactions: 241, total: 599 },
    { date: "May 5 - May 11", label: "W6", users: 193, content: 149, interactions: 232, total: 574 },
    { date: "May 12 - May 18", label: "W7", users: 178, content: 138, interactions: 219, total: 535 },
    { date: "May 19 - May 21", label: "W8", users: 104, content: 85, interactions: 128, total: 317 }
  ];
  
  const monthly = [
    { date: "May 2024", label: "May", users: 745, content: 582, interactions: 924, total: 2251 },
    { date: "Jun 2024", label: "Jun", users: 685, content: 524, interactions: 862, total: 2071 },
    { date: "Jul 2024", label: "Jul", users: 723, content: 568, interactions: 905, total: 2196 },
    { date: "Aug 2024", label: "Aug", users: 765, content: 621, interactions: 942, total: 2328 },
    { date: "Sep 2024", label: "Sep", users: 712, content: 543, interactions: 875, total: 2130 },
    { date: "Oct 2024", label: "Oct", users: 752, content: 595, interactions: 932, total: 2279 },
    { date: "Nov 2024", label: "Nov", users: 798, content: 632, interactions: 967, total: 2397 },
    { date: "Dec 2024", label: "Dec", users: 827, content: 658, interactions: 983, total: 2468 },
    { date: "Jan 2025", label: "Jan", users: 778, content: 612, interactions: 945, total: 2335 },
    { date: "Feb 2025", label: "Feb", users: 735, content: 573, interactions: 912, total: 2220 },
    { date: "Mar 2025", label: "Mar", users: 762, content: 602, interactions: 938, total: 2302 },
    { date: "Apr 2025", label: "Apr", users: 795, content: 628, interactions: 958, total: 2381 },
    { date: "May 2025", label: "May", users: 423, content: 342, interactions: 486, total: 1251 }
  ];
  
  return { daily, weekly, monthly };
};

const chartData = generateRealisticData();

export function OverviewChart() {
  const [timeRange, setTimeRange] = useState("daily");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [chartType, setChartType] = useState("column"); // "column" or "line"
  const [activeSeries, setActiveSeries] = useState(["users", "content", "interactions"]); // Track which series are active
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Effect to detect dark mode
  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);
  
  // Chart colors based on theme
  const gridColor = isDarkMode ? '#374151' : '#e5e7eb'; // dark: gray-700, light: gray-200
  const textColor = isDarkMode ? '#9ca3af' : '#6b7280'; // dark: gray-400, light: gray-500
  
  // Get the data for the selected time range
  const data = chartData[timeRange];
  
  // Toggle data series visibility
  const toggleSeries = (series) => {
    if (activeSeries.includes(series)) {
      if (activeSeries.length > 1) { // Ensure at least one series is always visible
        setActiveSeries(activeSeries.filter(s => s !== series));
      }
    } else {
      setActiveSeries([...activeSeries, series]);
    }
  };
  
  // Calculate maximums for scaling
  const maxUsers = Math.max(...data.map(d => d.users));
  const maxContent = Math.max(...data.map(d => d.content));
  const maxInteractions = Math.max(...data.map(d => d.interactions));
  const maxTotal = Math.max(...data.map(d => d.total));
  
  // Calculate column color based on value
  const getColumnColor = (value, type) => {
    const max = type === "users" ? maxUsers : 
               type === "content" ? maxContent : 
               type === "interactions" ? maxInteractions : maxTotal;
    const percent = value / max;
    
    if (type === "users") {
      return percent > 0.7 ? "bg-blue-600" : percent > 0.4 ? "bg-blue-500" : "bg-blue-400";
    } else if (type === "content") {
      return percent > 0.7 ? "bg-amber-600" : percent > 0.4 ? "bg-amber-500" : "bg-amber-400";
    } else if (type === "interactions") {
      return percent > 0.7 ? "bg-green-600" : percent > 0.4 ? "bg-green-500" : "bg-green-400";
    } else {
      return percent > 0.8 ? "bg-violet-600" : 
             percent > 0.6 ? "bg-violet-500" : 
             percent > 0.4 ? "bg-violet-400" : "bg-violet-300";
    }
  };
  
  // Helper function to create line points
  const createLinePoints = (data, field, maxValue, height) => {
    const width = 100 / (data.length - 1);
    return data.map((item, index) => {
      const x = index * width;
      const y = 100 - ((item[field] / maxValue) * 100);
      return `${x}% ${y}%`;
    }).join(", ");
  };
  
  return (
    <Card className="col-span-full overflow-hidden shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-blue-500/70">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base md:text-lg">Activity Overview</CardTitle>
              <div className="relative inline-block">
                <Info 
                  className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onMouseEnter={() => setShowInfoTooltip(true)}
                  onMouseLeave={() => setShowInfoTooltip(false)}
                />
                {showInfoTooltip && (
                  <div className="absolute left-full ml-2 top-0 z-50 w-72 rounded-md border bg-popover p-3 text-xs shadow-md">
                    <p className="font-medium mb-1">About Activity Overview</p>
                    <p className="text-muted-foreground mb-2">This chart shows total activity across all system modules including:</p>
                    <ul className="text-muted-foreground mb-2 space-y-1">
                      <li className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        <span>User activities (registrations, logins, profile updates)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                        <span>Content activities (posts, comments, uploads)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        <span>Interactions (likes, shares, views, downloads)</span>
                      </li>
                    </ul>
                    <p className="text-muted-foreground text-[10px]">Data updated: Today at 08:30 AM</p>
                  </div>
                )}
              </div>
            </div>
            <CardDescription>
              {timeRange === "daily" 
                ? "Activity counts for the past 7 days" 
                : timeRange === "weekly" 
                ? "Activity counts for the past 8 weeks" 
                : "Activity counts for the past 13 months"}
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Chart Type Toggle */}
            <div className="flex items-center gap-1 border rounded-md p-0.5 bg-muted/50">
              <button 
                onClick={() => setChartType("column")}
                className={`px-2 py-1 text-xs rounded-sm transition-colors flex items-center ${chartType === "column" 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"}`}
              >
                <BarChart2 className="h-3 w-3 mr-1" />
                <span className="hidden xs:inline">Column</span>
              </button>
              <button 
                onClick={() => setChartType("line")}
                className={`px-2 py-1 text-xs rounded-sm transition-colors flex items-center ${chartType === "line" 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"}`}
              >
                <LineChartIcon className="h-3 w-3 mr-1" />
                <span className="hidden xs:inline">Line</span>
              </button>
            </div>
            
            {/* Dropdown Menu */}
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-xs h-7 md:h-8 px-2"
              >
                <span className="hidden xs:inline">Export</span>
                <span className="xs:hidden">
                  <Download className="h-3 w-3" />
                </span>
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
            <div className="flex items-center gap-0.5 md:gap-1 border rounded-md p-0.5 bg-muted/50">
              <button 
                onClick={() => setTimeRange("daily")}
                className={`px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-sm transition-colors ${timeRange === "daily" 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"}`}
              >
                Day
              </button>
              <button 
                onClick={() => setTimeRange("weekly")}
                className={`px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-sm transition-colors ${timeRange === "weekly" 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"}`}
              >
                Week
              </button>
              <button 
                onClick={() => setTimeRange("monthly")}
                className={`px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-sm transition-colors ${timeRange === "monthly" 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"}`}
              >
                Month
              </button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 md:px-6">
        {/* Activity Summary */}
        <div className="mb-4 md:mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-muted/30 p-2 md:p-3 rounded-md border-l-4 border-l-blue-500">
            <div className="text-[10px] md:text-xs text-muted-foreground mb-1">Users</div>
            <div className="text-xl md:text-2xl font-bold">
              {data.reduce((sum, item) => sum + item.users, 0)}
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground mt-1">
              Peak: {Math.max(...data.map(d => d.users))} on {data[data.findIndex(d => d.users === Math.max(...data.map(d => d.users)))].date}
            </div>
          </div>
          
          <div className="bg-muted/30 p-2 md:p-3 rounded-md border-l-4 border-l-amber-500">
            <div className="text-[10px] md:text-xs text-muted-foreground mb-1">Content</div>
            <div className="text-xl md:text-2xl font-bold">
              {data.reduce((sum, item) => sum + item.content, 0)}
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground mt-1">
              Peak: {Math.max(...data.map(d => d.content))} on {data[data.findIndex(d => d.content === Math.max(...data.map(d => d.content)))].date}
            </div>
          </div>
          
          <div className="bg-muted/30 p-2 md:p-3 rounded-md border-l-4 border-l-green-500">
            <div className="text-[10px] md:text-xs text-muted-foreground mb-1">Interactions</div>
            <div className="text-xl md:text-2xl font-bold">
              {data.reduce((sum, item) => sum + item.interactions, 0)}
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground mt-1">
              Peak: {Math.max(...data.map(d => d.interactions))} on {data[data.findIndex(d => d.interactions === Math.max(...data.map(d => d.interactions)))].date}
            </div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="pt-2 pb-3 -mx-3 px-3 md:-mx-0 md:px-0">
          <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "column" ? (
                // Bar Chart using Recharts
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis 
                    dataKey="label" 
                    tick={{ fontSize: 12, fill: textColor }}
                    tickLine={{ stroke: gridColor }}
                    axisLine={{ stroke: gridColor }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: textColor }}
                    tickLine={{ stroke: gridColor }}
                    axisLine={{ stroke: gridColor }}
                  />
                  <RechartsTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-popover text-popover-foreground p-2 rounded border shadow-md text-xs">
                            <p className="font-medium mb-1">{data.date}</p>
                            {activeSeries.includes("users") && (
                              <p className="flex justify-between gap-3">
                                <span className="text-blue-500">Users:</span>
                                <span>{data.users}</span>
                              </p>
                            )}
                            {activeSeries.includes("content") && (
                              <p className="flex justify-between gap-3">
                                <span className="text-amber-500">Content:</span>
                                <span>{data.content}</span>
                              </p>
                            )}
                            {activeSeries.includes("interactions") && (
                              <p className="flex justify-between gap-3">
                                <span className="text-green-500">Interactions:</span>
                                <span>{data.interactions}</span>
                              </p>
                            )}
                            <p className="flex justify-between gap-3 border-t mt-1 pt-1">
                              <span className="font-medium">Total:</span>
                              <span className="font-medium">{data.total}</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    align="right"
                    verticalAlign="top"
                    iconType="circle"
                    wrapperStyle={{ 
                      paddingBottom: 10,
                      fontSize: '12px',
                      color: textColor
                    }}
                    onClick={(e) => toggleSeries(e.dataKey)}
                    formatter={(value, entry) => {
                      const { dataKey } = entry;
                      const isActive = activeSeries.includes(dataKey);
                      return (
                        <span style={{ 
                          color: isActive ? undefined : '#9ca3af',
                          textDecoration: isActive ? undefined : 'line-through'
                        }}>
                          {value}
                        </span>
                      );
                    }}
                  />
                  {activeSeries.includes("users") && (
                    <Bar 
                      dataKey="users" 
                      name="Users" 
                      fill="#3b82f6" 
                      radius={[4, 4, 0, 0]} 
                      animationDuration={1200}
                      isAnimationActive={true}
                      barSize={timeRange === "monthly" ? 12 : 24}
                    />
                  )}
                  {activeSeries.includes("content") && (
                    <Bar 
                      dataKey="content" 
                      name="Content" 
                      fill="#f59e0b" 
                      radius={[4, 4, 0, 0]} 
                      animationDuration={1200}
                      isAnimationActive={true}
                      barSize={timeRange === "monthly" ? 12 : 24}
                    />
                  )}
                  {activeSeries.includes("interactions") && (
                    <Bar 
                      dataKey="interactions" 
                      name="Interactions" 
                      fill="#22c55e" 
                      radius={[4, 4, 0, 0]} 
                      animationDuration={1200}
                      isAnimationActive={true}
                      barSize={timeRange === "monthly" ? 12 : 24}
                    />
                  )}
                </BarChart>
              ) : (
                // Line Chart using Recharts
                <LineChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis 
                    dataKey="label" 
                    tick={{ fontSize: 12, fill: textColor }}
                    tickLine={{ stroke: gridColor }}
                    axisLine={{ stroke: gridColor }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: textColor }}
                    tickLine={{ stroke: gridColor }}
                    axisLine={{ stroke: gridColor }}
                  />
                  <RechartsTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-popover text-popover-foreground p-2 rounded border shadow-md text-xs">
                            <p className="font-medium mb-1">{data.date}</p>
                            {activeSeries.includes("users") && (
                              <p className="flex justify-between gap-3">
                                <span className="text-blue-500">Users:</span>
                                <span>{data.users}</span>
                              </p>
                            )}
                            {activeSeries.includes("content") && (
                              <p className="flex justify-between gap-3">
                                <span className="text-amber-500">Content:</span>
                                <span>{data.content}</span>
                              </p>
                            )}
                            {activeSeries.includes("interactions") && (
                              <p className="flex justify-between gap-3">
                                <span className="text-green-500">Interactions:</span>
                                <span>{data.interactions}</span>
                              </p>
                            )}
                            <p className="flex justify-between gap-3 border-t mt-1 pt-1">
                              <span className="font-medium">Total:</span>
                              <span className="font-medium">{data.total}</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    align="right"
                    verticalAlign="top"
                    iconType="circle"
                    wrapperStyle={{ 
                      paddingBottom: 10,
                      fontSize: '12px',
                      color: textColor
                    }}
                    onClick={(e) => toggleSeries(e.dataKey)}
                    formatter={(value, entry) => {
                      const { dataKey } = entry;
                      const isActive = activeSeries.includes(dataKey);
                      return (
                        <span style={{ 
                          color: isActive ? undefined : '#9ca3af',
                          textDecoration: isActive ? undefined : 'line-through'
                        }}>
                          {value}
                        </span>
                      );
                    }}
                  />
                  {activeSeries.includes("users") && (
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      name="Users" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ stroke: '#3b82f6', strokeWidth: 2, fill: '#fff', r: 3 }}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
                      isAnimationActive={true}
                      animationDuration={1200}
                    />
                  )}
                  {activeSeries.includes("content") && (
                    <Line 
                      type="monotone" 
                      dataKey="content" 
                      name="Content" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ stroke: '#f59e0b', strokeWidth: 2, fill: '#fff', r: 3 }}
                      activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
                      isAnimationActive={true}
                      animationDuration={1200}
                    />
                  )}
                  {activeSeries.includes("interactions") && (
                    <Line 
                      type="monotone" 
                      dataKey="interactions" 
                      name="Interactions" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      dot={{ stroke: '#22c55e', strokeWidth: 2, fill: '#fff', r: 3 }}
                      activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2, fill: '#fff' }}
                      isAnimationActive={true}
                      animationDuration={1200}
                    />
                  )}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
          
          {/* Custom Legend */}
          <div className="flex flex-wrap justify-between mt-4 gap-2">
            <div className="flex items-center flex-wrap gap-3">
              <button 
                onClick={() => toggleSeries("users")}
                className={`flex items-center gap-1 px-2 py-1 rounded-sm transition-colors ${activeSeries.includes("users") ? "bg-blue-50 dark:bg-blue-950/30" : "hover:bg-muted/50"}`}
              >
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className={`text-xs ${activeSeries.includes("users") ? "text-foreground font-medium" : "text-muted-foreground"}`}>Users</span>
                {!activeSeries.includes("users") ? (
                  <EyeOff className="h-3 w-3 ml-1 text-muted-foreground/70" />
                ) : (
                  <Eye className="h-3 w-3 ml-1 text-blue-500/70" />
                )}
              </button>
              
              <button 
                onClick={() => toggleSeries("content")}
                className={`flex items-center gap-1 px-2 py-1 rounded-sm transition-colors ${activeSeries.includes("content") ? "bg-amber-50 dark:bg-amber-950/30" : "hover:bg-muted/50"}`}
              >
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span className={`text-xs ${activeSeries.includes("content") ? "text-foreground font-medium" : "text-muted-foreground"}`}>Content</span>
                {!activeSeries.includes("content") ? (
                  <EyeOff className="h-3 w-3 ml-1 text-muted-foreground/70" />
                ) : (
                  <Eye className="h-3 w-3 ml-1 text-amber-500/70" />
                )}
              </button>
              
              <button 
                onClick={() => toggleSeries("interactions")}
                className={`flex items-center gap-1 px-2 py-1 rounded-sm transition-colors ${activeSeries.includes("interactions") ? "bg-green-50 dark:bg-green-950/30" : "hover:bg-muted/50"}`}
              >
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className={`text-xs ${activeSeries.includes("interactions") ? "text-foreground font-medium" : "text-muted-foreground"}`}>Interactions</span>
                {!activeSeries.includes("interactions") ? (
                  <EyeOff className="h-3 w-3 ml-1 text-muted-foreground/70" />
                ) : (
                  <Eye className="h-3 w-3 ml-1 text-green-500/70" />
                )}
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
