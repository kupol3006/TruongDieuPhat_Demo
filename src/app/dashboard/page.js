// File: src/app/dashboard/page.js
import { StatCard } from "@/components/dashboard/stat-card"
import { SuppliersList } from "@/components/dashboard/suppliers-list"
import { EventsList } from "@/components/dashboard/events-list"
import { PostsList } from "@/components/dashboard/posts-list"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { 
  FileText, 
  Users, 
  FileCheck, 
  AlertTriangle,
  TrendingUp,
  Clock,
  BarChart2,
  Activity,
  Calendar,
  Mail 
} from "lucide-react"

// Mock data
const stats = [
  { 
    title: "Submissions",
    value: "821",
    icon: FileText,
    trend: "up",
    trendValue: "12%",
    color: "bg-blue-500/90"
  },
  {
    title: "Total Users",
    value: "2,874",
    icon: Users,
    trend: "up",
    trendValue: "8.5%",
    color: "bg-green-500/90"
  },
  {
    title: "Active Posts",
    value: "154",
    icon: FileCheck,
    trend: "up",
    trendValue: "24.3%",
    color: "bg-violet-500/90"
  },
  {
    title: "Reported Content",
    value: "19",
    icon: AlertTriangle,
    trend: "down",
    trendValue: "5.7%",
    color: "bg-amber-500/90"
  }
]

// Enhanced suppliers mock data in English
const suppliersMock = [
  { id: 1, name: "ABC Electronics Ltd.", category: "Electronics", time: "2 hours ago", status: "pending" },
  { id: 2, name: "XYZ Solutions Inc.", category: "Software", time: "5 hours ago", status: "pending" },
  { id: 3, name: "Vietnam Textile Co.", category: "Textiles", time: "1 day ago", status: "pending" },
  { id: 4, name: "Southern Foods Ltd.", category: "Food & Beverage", time: "2 days ago", status: "pending" }
]

// Enhanced events mock data in English
const eventsMock = [
  { id: 1, name: "Tech Conference 2025", location: "Hanoi", date: "Jun 15, 2025", time: "8 hours ago", attendees: 350 },
  { id: 2, name: "Product Launch: Alpha X", location: "Ho Chi Minh City", date: "Jun 22, 2025", time: "1 day ago", attendees: 120 },
  { id: 3, name: "Annual Stakeholder Meeting", location: "Da Nang", date: "Jun 30, 2025", time: "2 days ago", attendees: 85 }
]

// Enhanced posts mock data in English
const postsMock = [
  { 
    id: 1, 
    title: "IT Development Trends in 2025", 
    author: "John Smith",
    avatar: "JS",
    content: "This post contains inappropriate political content and violates our community standards.",
    reportCount: 12,
    time: "3 hours ago",
    reportReason: "Inappropriate content"
  },
  { 
    id: 2, 
    title: "Review of Apple's Latest Products", 
    author: "Sarah Johnson",
    avatar: "SJ",
    content: "This post contains misleading information about products and shows signs of hidden advertising according to user reports.",
    reportCount: 8,
    time: "5 hours ago",
    reportReason: "Misinformation"
  },
  { 
    id: 3, 
    title: "Optimizing React Performance", 
    author: "Michael Chen",
    avatar: "MC",
    content: "This post was reported for copying content from multiple sources without clear references.",
    reportCount: 5,
    time: "1 day ago",
    reportReason: "Copyright violation"
  }
]

export default function DashboardPage() {
  // Get current date in English
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  
  // Get current time in English
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="space-y-8">
      {/* Improved header with more information and better layout */}
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pb-6">
          {/* Welcome and date section */}
          <div className="md:col-span-2 xl:col-span-3 flex flex-col justify-center space-y-2">
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Welcome to Admin Dashboard</h1>
              <span className="text-sm text-muted-foreground">v2.0</span>
            </div>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> 
                <span>{today}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> 
                <span>{currentTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" /> 
                <span>3 unread messages</span>
              </div>
            </div>
          </div>
          
          {/* System status and quick actions */}
          <div className="flex flex-col space-y-2 p-4 rounded-lg border bg-card shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">System Status</span>
              <span className="flex items-center text-green-500 text-sm">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                Operational
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Last updated: 5 minutes ago
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t">
              <span className="text-xs">Server load: 23%</span>
              <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "23%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick summary cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            trendValue={stat.trendValue}
            color={stat.color}
          />
        ))}
      </div>
      
      {/* Activity Overview */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <BarChart2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Activity Overview</h2>
        </div>
        <OverviewChart />
      </div>
      
      {/* Two-column layout for suppliers and events */}
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <div className="flex items-center gap-2 mb-0 md:hidden">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Pending Approvals</h2>
        </div>
        <SuppliersList suppliers={suppliersMock} />
        <EventsList events={eventsMock} />
      </div>
      
      {/* Reported posts */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-semibold tracking-tight">Reported Content</h2>
        </div>
        <PostsList posts={postsMock} />
      </div>
    </div>
  )
}

