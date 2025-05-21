import * as React from "react"
import { cn } from "@/lib/utils"

const Dialog = ({ isOpen, onClose, children, className }) => {
  // Close dialog on ESC key press
  React.useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener("keydown", handleEscPress)
    return () => document.removeEventListener("keydown", handleEscPress)
  }, [isOpen, onClose])
  
  // Stop interaction with the background
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} aria-hidden="true" />
      <div 
        className={cn(
          "fixed z-50 max-h-[85vh] w-[90vw] max-w-md overflow-auto rounded-lg bg-background p-6 shadow-lg",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

const DialogContent = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("relative flex flex-col gap-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const DialogHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const DialogFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const DialogTitle = ({ children, className, ...props }) => {
  return (
    <h2
      className={cn("text-lg font-semibold", className)}
      {...props}
    >
      {children}
    </h2>
  )
}

const DialogDescription = ({ children, className, ...props }) => {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  )
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
}
