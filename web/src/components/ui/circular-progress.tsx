import { cn } from "@/lib/utils";
import { selectTimer } from "@/redux/features/timer-slice";
import { useAppSelector } from "@/redux/hooks";
import "@/styles/progress.css";
import { ClassValue } from "clsx";
import { FC, ReactNode } from "react";

type TCircularProgressProps = {
  className?: ClassValue;
  size?: number;
  strokeWidth?: number;
  children?: ReactNode;
  progress: number;
  isPaused: boolean;
};
const CircularProgress: FC<TCircularProgressProps> = ({
  className,
  size = 300,
  strokeWidth = 12,
  children,
  progress,
  isPaused,
}) => {
  const { isBreak } = useAppSelector(selectTimer);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={cn(className, "relative")}
      style={{
        width: size,
        height: size,
      }}
    >
      <div className="inset-0 absolute  hidden">
        <div className="w-full   h-full inset-full flex items-center justify-center">
          <div
            className=" rounded-full animate-rotate circle-glow before:bg-primary before:shadow-secondary"
            style={{
              width: size - strokeWidth * 4,
              height: size - strokeWidth * 4,
              animationPlayState: isPaused ? "paused" : "running",
              animation:
                progress === 0
                  ? "none"
                  : "rotateCircles 60000ms linear infinite",
            }}
          ></div>
        </div>
      </div>
      <svg
        className="transform -rotate-90"
        style={{
          width: size,
          height: size,
        }}
      >
        <circle
          className={cn("stroke-current", isBreak ? "text-card" : "text-muted")}
          strokeWidth={strokeWidth}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        ></circle>
        <circle
          className={cn(
            " stroke-current  transition-all duration-500 ease-in-out",
            isBreak ? "text-secondary" : "text-primary"
          )}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        ></circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default CircularProgress;
