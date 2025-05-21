// File: src/components/dashboard/suppliers-list.js
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Clock, Building, Tag, CheckCircle, XCircle, MoreHorizontal, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SuppliersList({ suppliers = [] }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [actionDropdownId, setActionDropdownId] = useState(null)

  const handleApprove = (supplier) => {
    setSelectedSupplier(supplier)
    setDialogOpen(true)
  }

  const confirmApprove = () => {
    // Call API to approve supplier
    console.log("Approved supplier:", selectedSupplier)
    setDialogOpen(false)
  }

  const toggleActionDropdown = (id) => {
    setActionDropdownId(actionDropdownId === id ? null : id)
  }

  return (
    <>
      <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-500" />
              Pending Suppliers
            </CardTitle>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              <span>View All</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {suppliers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle className="h-10 w-10 text-muted-foreground/30 mb-2" />
              <p className="text-muted-foreground">No pending suppliers</p>
            </div>
          ) : (
            <div className="space-y-1">
              {suppliers.map((supplier) => (
                <div 
                  key={supplier.id} 
                  className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors relative group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{supplier.name}</p>
                      <Badge variant="outline" className="text-xs py-0 h-5 bg-blue-500/10 text-blue-500 border-blue-200">
                        {supplier.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground gap-4">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" /> {supplier.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {supplier.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => handleApprove(supplier)} 
                      size="sm" 
                      className="transition-all hover:shadow-md"
                    >
                      Approve
                    </Button>
                    
                    {/* Actions Dropdown */}
                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => toggleActionDropdown(supplier.id)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      
                      {actionDropdownId === supplier.id && (
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
                                console.log("View details:", supplier)
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
                                console.log("Edit supplier:", supplier)
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
                                console.log("Reject supplier:", supplier)
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
            <DialogTitle>Approve Supplier</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to approve <span className="font-semibold">{selectedSupplier?.name}</span>?</p>
          <p className="text-sm text-muted-foreground">This action will make the supplier visible in the marketplace.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmApprove}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
