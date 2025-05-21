// File: src/app/dashboard/page.js
import { StatCard } from "@/components/dashboard/stat-card"
import { SuppliersList } from "@/components/dashboard/suppliers-list"
import { EventsList } from "@/components/dashboard/events-list"
import { PostsList } from "@/components/dashboard/posts-list"
import { 
  FileText, 
  Users, 
  FileCheck, 
  AlertTriangle 
} from "lucide-react"

// Mock data
const stats = [
  { 
    title: "Submissions",
    value: "8",
    icon: FileText
  },
  {
    title: "Total Users",
    value: "150",
    icon: Users
  },
  {
    title: "Active Posts",
    value: "24",
    icon: FileCheck
  },
  {
    title: "Reported Content",
    value: "2",
    icon: AlertTriangle
  }
]

const suppliersMock = [
  { id: 1, name: "Supplier Name" },
  { id: 2, name: "Supplier Name" }
]

const eventsMock = [
  { id: 1, name: "Event Name" },
  { id: 2, name: "Event Name" }
]

const postsMock = [
  { 
    id: 1, 
    title: "Post Title", 
    content: "This is a reported post content that has been flagged by users for review.",
    reportCount: 3
  },
  { 
    id: 2, 
    title: "Post Title", 
    content: "This is another reported post content that has been flagged by users for review.",
    reportCount: 5
  }
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <SuppliersList suppliers={suppliersMock} />
        <EventsList events={eventsMock} />
      </div>
      
      <PostsList posts={postsMock} />
    </div>
  )
}
