// File: src/components/dashboard/posts-list.js
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Flag, User, Clock, AlertTriangle, CheckCircle, MoreHorizontal, ExternalLink, Info, X } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function PostsList({ posts = [] }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [actionDropdownId, setActionDropdownId] = useState(null)

  const handleView = (post) => {
    setSelectedPost(post)
    setDialogOpen(true)
  }

  const handleAction = (action) => {
    // Call API to take action on post
    console.log(`${action} post:`, selectedPost)
    setDialogOpen(false)
  }

  const toggleActionDropdown = (id) => {
    setActionDropdownId(actionDropdownId === id ? null : id)
  }

  // Helper function to get badge color based on report count
  const getReportBadge = (count) => {
    if (count >= 10) return "destructive";
    if (count >= 5) return "warning";
    return "info";
  }

  return (
    <>
      <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Flag className="h-5 w-5 text-amber-500" />
              Bài viết bị báo cáo
            </CardTitle>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              <span>Xem tất cả</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle className="h-10 w-10 text-muted-foreground/30 mb-2" />
              <p className="text-muted-foreground">Không có bài viết nào bị báo cáo</p>
            </div>
          ) : (
            <div className="space-y-1">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors relative group"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        {post.avatar}
                      </div>
                    </Avatar>
                    <div className="space-y-1 max-w-sm">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium">{post.title}</p>
                        <Badge variant={getReportBadge(post.reportCount)} className="text-xs py-0 h-5">
                          <AlertTriangle className="h-3 w-3 mr-1" /> {post.reportCount} reports
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground gap-3 flex-wrap">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" /> {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Info className="h-3 w-3" /> {post.reportReason}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => handleView(post)} 
                      variant="outline" 
                      size="sm"
                      className="transition-all hover:shadow-md hover:bg-amber-500/10 hover:text-amber-500 border-amber-200"
                    >
                      <Info className="h-3.5 w-3.5 mr-1" />
                      <span>View</span>
                    </Button>
                    
                    {/* Actions Dropdown */}
                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => toggleActionDropdown(post.id)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      
                      {actionDropdownId === post.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-50" 
                            onClick={() => setActionDropdownId(null)}
                          />
                          <div className="absolute right-0 top-full z-50 mt-1 w-36 rounded-md border bg-popover p-1 shadow-md">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="w-full justify-start text-xs"
                              onClick={() => {
                                handleAction("Ignore")
                                setActionDropdownId(null)
                              }}
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
                              <span>Ignore Report</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="w-full justify-start text-xs"
                              onClick={() => {
                                console.log("Contact author:", post.author)
                                setActionDropdownId(null)
                              }}
                            >
                              <User className="h-3.5 w-3.5 mr-1" />
                              <span>Contact Author</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="w-full justify-start text-xs text-red-500 hover:text-red-500 hover:bg-red-50/10"
                              onClick={() => {
                                handleAction("Remove")
                                setActionDropdownId(null)
                              }}
                            >
                              <X className="h-3.5 w-3.5 mr-1" />
                              <span>Remove Post</span>
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>{selectedPost?.title}</span>
              {selectedPost && (
                <Badge variant={getReportBadge(selectedPost.reportCount)} className="ml-2">
                  {selectedPost.reportCount} reports
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  {selectedPost?.avatar}
                </div>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{selectedPost?.author}</p>
                <p className="text-xs text-muted-foreground">{selectedPost?.time}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-amber-500">
                <AlertTriangle className="h-4 w-4" />
                <span>Reported for: {selectedPost?.reportReason}</span>
              </div>
              <div className="border rounded-md p-4 bg-muted/30 text-sm">
                {selectedPost?.content}
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleAction("Ignore")} variant="secondary">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Ignore Report</span>
            </Button>
            <Button onClick={() => handleAction("Remove")} variant="destructive">
              <X className="h-4 w-4 mr-1" />
              <span>Remove Post</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
