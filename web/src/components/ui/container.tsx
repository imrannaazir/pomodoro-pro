import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

const Container = ({
  className,
  children,
}: {
  className?: ClassValue;
  children: ReactNode;
}) => {
  return (
    <main className={cn(className, "mx-auto max-w-6xl px-4")}>{children}</main>
  );
};

export default Container;
