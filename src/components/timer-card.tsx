import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import type { Timer } from "../types/timer";
import { playAlarm, sendNotification, vibrate } from "../lib/notifications";

interface TimerCardProps {
  timer: Timer;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onReset: (id: string) => void;
}

export function TimerCard({
  timer,
  onRemove,
  onToggle,
  onReset,
}: TimerCardProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    if (!timer.isRunning) {
      setTimeLeft(Math.max(0, Math.floor((timer.remainingMs || 0) / 1000)));
      return;
    }
    const interval = setInterval(() => {
      const remaining = timer.deadline - Date.now();
      const seconds = Math.max(0, Math.ceil(remaining / 1000));
      setTimeLeft(seconds);
      if (remaining <= 0 && !hasNotified) {
        setHasNotified(true);
        playAlarm();
        sendNotification(timer.name);
        vibrate();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [
    timer.isRunning,
    timer.deadline,
    timer.remainingMs,
    hasNotified,
    timer.name,
  ]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((timer.totalSeconds - timeLeft) / timer.totalSeconds) * 100;
  const isCompleted = timeLeft === 0;

  return (
    <Card
      className={`relative overflow-hidden transition-all ${
        isCompleted ? "border-accent ring-2 ring-accent/20" : ""
      }`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 transition-all"
        style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
      />
      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{timer.name}</CardTitle>
          <Button
            variant="ghost"
            className="h-8 w-8 -mr-2 -mt-1"
            onClick={() => onRemove(timer.id)}
          >
            ✕
          </Button>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div className="text-center">
          <div
            className={`font-mono font-bold text-6xl tabular-nums transition-colors ${
              isCompleted ? "text-primary" : "text-foreground"
            }`}
          >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
          {isCompleted && (
            <div className="mt-2 font-semibold text-primary text-lg">
              🎉 完成！
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => onToggle(timer.id)}
            disabled={isCompleted}
          >
            {timer.isRunning ? "一時停止" : "再開"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setHasNotified(false);
              onReset(timer.id);
            }}
          >
            ⟲
          </Button>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default TimerCard;
