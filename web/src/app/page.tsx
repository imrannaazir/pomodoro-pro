"use client";
import { Button } from "@/components/ui/button";
import CircularProgress from "@/components/ui/circular-progress";
import { selectTimer, setIsRunning } from "@/redux/features/timer-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Home() {
  const { isBreak, isRunning, timeLeft } = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();
  const totalTime = !isBreak ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  return (
    <main>
      <CircularProgress progress={progress} isPaused={!isRunning}>
        <Button onClick={() => dispatch(setIsRunning())}>Click</Button>
      </CircularProgress>
    </main>
  );
}
