import React from "react";
import { cn } from "@/lib/utils";

// Minimal Slot implementation to support `asChild` like shadcn/ui
function Slot({ children, className, ...props }) {
  const child = React.Children.only(children);
  return React.cloneElement(child, {
    ...props,
    className: cn(child.props.className, className),
  });
}

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const base =
      "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background";

    const variants = {
      // Primary eco-green button that adapts to light/dark via CSS vars
      default:
        "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]",
      // Subtle green outline button
      outline:
        "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
      // Soft, low-emphasis button
      ghost:
        "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
      // Secondary green-filled button (e.g. for less primary actions)
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
      // Destructive red button for dangerous actions (e.g. remove)
      destructive:
        "bg-destructive text-primary-foreground hover:bg-destructive/90",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-9 w-9",
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };

