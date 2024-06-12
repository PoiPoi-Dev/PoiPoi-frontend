import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center rounded-full justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors  shadow-xl disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        active: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "p-4",
        sm: "p-2",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  text?: string;
}

const ButtonIconCircle = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-fit pb-4 w-14">
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
        {text ? (
          <span className="text-xs uppercase font-medium">{text}</span>
        ) : null}
      </div>
    );
  }
);
ButtonIconCircle.displayName = "Button";

export { ButtonIconCircle, buttonVariants };
