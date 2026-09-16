import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        work: "bg-work/15 text-work",
        alt: "bg-alt/15 text-alt",
        closed: "bg-closed/15 text-closed",
        stop: "bg-stop/15 text-stop",
        muted: "bg-bg text-muted",
        navy: "bg-navy text-primary-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
