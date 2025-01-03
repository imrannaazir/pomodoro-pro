"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, timeFormat } from "@/lib/utils";
import {
  resetTimer,
  selectTimer,
  setIsBreak,
  setIsRunning,
  setTimer,
} from "@/redux/features/timer-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Moon, Pause, Play, RotateCcw, Target } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./button";
import CircularProgress from "./circular-progress";

const PomodoroTimer = () => {
  const defaultFocusTime = Number(process.env.NEXT_PUBLIC_FOCUS_TIME) * 60;
  const defaultBreakTime = Number(process.env.NEXT_PUBLIC_BREAK_TIME) * 60;
  const { isBreak, isRunning, timeLeft } = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();
  const totalTime = isBreak ? defaultBreakTime : defaultFocusTime;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch(setTimer(timeLeft - 1));
      }, 1000);
    }

    if (interval) {
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        dispatch(setTimer(defaultBreakTime));
        dispatch(setIsBreak(true));
      } else {
        dispatch(setTimer(defaultFocusTime));
        dispatch(setIsBreak(true));
      }
      dispatch(setIsRunning(false));
    }
  }, [
    defaultBreakTime,
    defaultFocusTime,
    dispatch,
    isBreak,
    isRunning,
    timeLeft,
  ]);

  const handleResetTimer = () => {
    dispatch(resetTimer());
  };
  return (
    <Card className={cn(isBreak && "bg-accent")}>
      <CardHeader>
        <div className="flex justify-between items-center ">
          <div className="space-y-1">
            <CardTitle>Pomodoro timer</CardTitle>
            <CardDescription>
              {isBreak ? "Break" : "Focus"} Time
            </CardDescription>
          </div>
          <div className="flex text-sm text-muted-foreground gap-1 items-center">
            {!isBreak ? (
              <Target className="" size={16} />
            ) : (
              <Moon className="" size={16} />
            )}
            {!isBreak ? "Focus" : "Break"} Session
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <CircularProgress progress={progress} isPaused={!isRunning}>
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-6xl font-bold ">{timeFormat(timeLeft)}</h1>
            <div className="text-sm text-muted-foreground">
              {isBreak ? "Until Focus" : "Until Break"}
            </div>
          </div>
        </CircularProgress>
      </CardContent>
      <CardFooter className="flex gap-2 justify-center">
        <Button
          variant={isBreak ? "secondary" : "default"}
          size={"lg"}
          className=" font-semibold border-0"
          onClick={() => dispatch(setIsRunning(!isRunning))}
        >
          {isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button
          variant={isBreak ? "default" : "secondary"}
          size={"lg"}
          className="  font-semibold border-0"
          onClick={handleResetTimer}
        >
          <RotateCcw className="mr-2" />
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PomodoroTimer;
