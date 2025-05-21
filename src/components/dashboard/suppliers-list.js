// File: src/components/dashboard/suppliers-list.js
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function SuppliersList({ suppliers = [] }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null)

  const handleApprove = (supplier) => {
    setSelectedSupplier(supplier)
    setDialogOpen(true)
  }

  const confirmApprove = () => {
    // Call API to approve supplier
    console.log("Approved supplier:", selectedSupplier)
    setDialogOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Suppliers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suppliers.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No pending suppliers</p>
          ) : (
            suppliers.map((supplier) => (
              <div key={supplier.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="space-y-1">
                  <p className="font-medium">{supplier.name}</p>
                </div>
                <Button onClick={() => handleApprove(supplier)} size="sm">
                  Approve
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Supplier</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to approve {selectedSupplier?.name}?</p>
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
