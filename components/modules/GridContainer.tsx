const styles = {
  primary:
    "mx-auto mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:gap-11",
  secondary:
    "mx-auto mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 2xl:gap-11",
};

import { cn } from "@/lib/utils";
import React from "react";

type GridContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof styles;
  className?: string;
};

export default function GridContainer({
  variant = "primary",
  className,
  ...props
}: GridContainerProps) {
  className = cn(styles[variant], className);

  return <div className={className} {...props} />;
}
