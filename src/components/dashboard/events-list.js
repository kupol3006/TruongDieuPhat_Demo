// File: src/components/dashboard/events-list.js
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { CalendarClock, MapPin, Clock, Calendar, CheckCircle, Users, MoreHorizontal, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function EventsList({ events = [] }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState("")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [actionDropdownId, setActionDropdownId] = useState(null)

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

  const toggleActionDropdown = (id) => {
    setActionDropdownId(actionDropdownId === id ? null : id)
  }

  return (
    <>
      <Card className="border-l-4 border-l-violet-500 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-violet-500" />
              Sự kiện đang chờ duyệt
            </CardTitle>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              <span>Xem tất cả</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle className="h-10 w-10 text-muted-foreground/30 mb-2" />
              <p className="text-muted-foreground">Không có sự kiện nào đang chờ duyệt</p>
            </div>
          ) : (
            <div className="space-y-1">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors relative group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{event.name}</p>
                      <Badge variant="outline" className="text-xs py-0 h-5 bg-violet-500/10 text-violet-500 border-violet-200">
                        Upcoming
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground gap-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {event.attendees} người tham dự
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {event.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => handleAction(event, "Approve")} 
                      size="sm"
                      variant="outline"
                      className="transition-all hover:shadow-md hover:bg-green-500/10 hover:text-green-500 border-green-200"
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      <span>Approve</span>
                    </Button>
                    
                    {/* Actions Dropdown */}
                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => toggleActionDropdown(event.id)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      
                      {actionDropdownId === event.id && (
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
                                console.log("View details:", event)
                                setActionDropdownId(null)
                              }}
                            >
                              View details
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="w-full justify-start text-xs"
                              onClick={() => {
                                console.log("Edit event:", event)
                                setActionDropdownId(null)
                              }}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="w-full justify-start text-xs text-red-500 hover:text-red-500 hover:bg-red-50/10"
                              onClick={() => {
                                handleAction(event, "Reject")
                                setActionDropdownId(null)
                              }}
                            >
                              Reject
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogAction} Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>Are you sure you want to {dialogAction.toLowerCase()} <span className="font-semibold">{selectedEvent?.name}</span>?</p>
            {selectedEvent && (
              <div className="bg-muted/50 rounded-md p-3 text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" /> 
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" /> 
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" /> 
                  <span>{selectedEvent.attendees} người tham dự</span>
                </div>
              </div>
            )}
          </div>
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
