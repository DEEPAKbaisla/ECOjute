import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

function AlertDialog({ open, onOpenChange, children }) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in-0"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Content */}
      <div className="relative z-50 grid w-full max-w-md gap-6 border bg-background p-6 shadow-xl duration-200 animate-in fade-in-0 zoom-in-95 rounded-lg border-muted">
        {children}
      </div>
    </div>,
    document.body
  );
}

function AlertDialogHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col space-y-2 text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-4",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-lg font-semibold text-foreground leading-none", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-muted-foreground mt-2", className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
};
