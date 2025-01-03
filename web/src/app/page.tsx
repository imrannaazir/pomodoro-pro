"use client";
import PomodoroTimer from "@/components/ui/pomodoro-timer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {});
  return (
    <main className="grid lg:grid-cols-2 my-8 ">
      <PomodoroTimer />
    </main>
  );
}
