"use client";
import Achievements from "@/components/home/achievements";
import TodaysStats from "@/components/home/todays-stats";
import PomodoroTimer from "@/components/ui/pomodoro-timer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {});
  return (
    <main className="grid lg:grid-cols-2 my-8 gap-6">
      <PomodoroTimer />
      <div className="grid gap-6">
        <Achievements />
        <TodaysStats />
      </div>
    </main>
  );
}
