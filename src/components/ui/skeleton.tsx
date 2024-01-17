import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Skeleton = forwardRef(
  ({ className }: { className?: string }, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div className={cn("rounded-md bg-primary/10", className)} ref={ref} />
    );
  }
);

export { Skeleton };
