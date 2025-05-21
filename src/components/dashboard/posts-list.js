// File: src/components/dashboard/posts-list.js
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function PostsList({ posts = [] }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const handleView = (post) => {
    setSelectedPost(post)
    setDialogOpen(true)
  }

  const handleAction = (action) => {
    // Call API to take action on post
    console.log(`${action} post:`, selectedPost)
    setDialogOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Reported Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No reported posts</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="space-y-1">
                  <p className="font-medium">{post.title}</p>
                </div>
                <Button onClick={() => handleView(post)} variant="outline" size="sm">
                  View
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Reported {selectedPost?.reportCount} times
            </div>
            <div className="border rounded-md p-4 bg-muted/30 text-sm">
              {selectedPost?.content}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleAction("Ignore")} variant="secondary">
              Ignore Report
            </Button>
            <Button onClick={() => handleAction("Remove")} variant="destructive">
              Remove Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
