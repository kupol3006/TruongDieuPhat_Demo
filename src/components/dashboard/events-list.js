// File: src/components/dashboard/events-list.js
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function EventsList({ events = [] }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState("")
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleAction = (event, action) => {
    setSelectedEvent(event)
    setDialogAction(action)
    setDialogOpen(true)
  }

  const confirmAction = () => {
    // Call API to approve/reject event
    console.log(`${dialogAction} event:`, selectedEvent)
    setDialogOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {events.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No pending events</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="space-y-1">
                  <p className="font-medium">{event.name}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleAction(event, "Approve")} size="sm">
                    Approve
                  </Button>
                  <Button onClick={() => handleAction(event, "Reject")} variant="outline" size="sm">
                    Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogAction} Event</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to {dialogAction.toLowerCase()} {selectedEvent?.name}?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmAction}
              variant={dialogAction === "Reject" ? "destructive" : "default"}
            >
              {dialogAction}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
