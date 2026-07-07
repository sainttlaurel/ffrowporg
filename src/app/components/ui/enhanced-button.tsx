import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
        xl: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  tooltip?: string;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText = "Loading...",
      children,
      disabled,
      onClick,
      tooltip,
      ...props
    },
    ref,
  ) => {
    const [isPending, setIsPending] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);

    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || isPending || isLoading;

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      setIsPending(true);
      try {
        if (onClick) {
          const result = onClick(e);
          if (result instanceof Promise) {
            await result;
          }
        }
      } finally {
        setIsPending(false);
      }
    };

    return (
      <div className="relative inline-block">
        <Comp
          ref={ref}
          data-slot="button"
          className={cn(
            buttonVariants({ variant, size, className }),
            "relative overflow-hidden",
          )}
          disabled={isDisabled}
          onClick={handleClick}
          onMouseEnter={() => tooltip && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          {...props}
        >
          {/* Ripple effect background */}
          <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-300" />

          {/* Content */}
          <span className="relative flex items-center gap-2">
            {(isPending || isLoading) && (
              <Loader2 className="size-4 animate-spin" />
            )}
            {isPending || isLoading ? loadingText : children}
          </span>
        </Comp>

        {/* Tooltip */}
        {tooltip && showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap pointer-events-none z-50">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </div>
        )}
      </div>
    );
  },
);

EnhancedButton.displayName = "EnhancedButton";

export { EnhancedButton, buttonVariants };
