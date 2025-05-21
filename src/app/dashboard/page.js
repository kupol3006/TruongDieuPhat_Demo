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
  Activity 
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

// Dữ liệu nhà cung cấp phong phú hơn
const suppliersMock = [
  { id: 1, name: "Công ty TNHH ABC", category: "Đồ điện tử", time: "2 giờ trước", status: "pending" },
  { id: 2, name: "XYZ Solutions Inc.", category: "Phần mềm", time: "5 giờ trước", status: "pending" },
  { id: 3, name: "Việt Nam Textile", category: "Dệt may", time: "1 ngày trước", status: "pending" },
  { id: 4, name: "Phương Nam Foods", category: "Thực phẩm", time: "2 ngày trước", status: "pending" }
]

// Dữ liệu sự kiện phong phú hơn
const eventsMock = [
  { id: 1, name: "Tech Conference 2025", location: "Hà Nội", date: "15/06/2025", time: "8 giờ trước", attendees: 350 },
  { id: 2, name: "Product Launch: Alpha X", location: "TP.HCM", date: "22/06/2025", time: "1 ngày trước", attendees: 120 },
  { id: 3, name: "Annual Stakeholder Meeting", location: "Đà Nẵng", date: "30/06/2025", time: "2 ngày trước", attendees: 85 }
]

// Dữ liệu bài viết phong phú hơn
const postsMock = [
  { 
    id: 1, 
    title: "Các xu hướng phát triển CNTT năm 2025", 
    author: "Nguyễn Văn A",
    avatar: "NA",
    content: "Bài viết này chứa nội dung không phù hợp về chính trị và vi phạm tiêu chuẩn cộng đồng của chúng tôi.",
    reportCount: 12,
    time: "3 giờ trước",
    reportReason: "Nội dung không phù hợp"
  },
  { 
    id: 2, 
    title: "Đánh giá sản phẩm mới nhất từ Apple", 
    author: "Trần Thị B",
    avatar: "TB",
    content: "Bài viết này chứa thông tin sai lệch về sản phẩm và có dấu hiệu quảng cáo trá hình theo báo cáo của người dùng.",
    reportCount: 8,
    time: "5 giờ trước",
    reportReason: "Thông tin sai lệch"
  },
  { 
    id: 3, 
    title: "Cách tối ưu hiệu suất trong React", 
    author: "Lê Văn C",
    avatar: "LC",
    content: "Bài viết này bị báo cáo vì sao chép nội dung từ nhiều nguồn khác nhau mà không ghi rõ nguồn tham khảo.",
    reportCount: 5,
    time: "1 ngày trước",
    reportReason: "Vi phạm bản quyền"
  }
]

export default function DashboardPage() {
  // Lấy ngày hiện tại
  const today = new Date().toLocaleDateString('vi-VN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="space-y-8">
      {/* Header with today's date and system status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-1">
            <Clock className="h-4 w-4" /> {today}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-muted/30 rounded-md p-2 shadow-sm">
          <span className="text-sm font-medium">Trạng thái hệ thống:</span>
          <span className="flex items-center text-green-500 text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
            Hoạt động bình thường
          </span>
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
          <h2 className="text-xl font-semibold tracking-tight">Tổng quan hoạt động</h2>
        </div>
        <OverviewChart />
      </div>
      
      {/* Two-column layout for suppliers and events */}
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <div className="flex items-center gap-2 mb-0 md:hidden">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Hoạt động cần duyệt</h2>
        </div>
        <SuppliersList suppliers={suppliersMock} />
        <EventsList events={eventsMock} />
      </div>
      
      {/* Reported posts */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-semibold tracking-tight">Nội dung bị báo cáo</h2>
        </div>
        <PostsList posts={postsMock} />
      </div>
    </div>
  )
}

