import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

const GradientText = ({
  children,
  className,
}: {
  className?: ClassValue;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        className,
        "bg-gradient-to-r from-primary via-primary to-secondary inline-block text-transparent bg-clip-text text-xl font-semibold"
      )}
    >
      {children}
    </div>
  );
};

export default GradientText;
