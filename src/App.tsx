import { useState, useEffect } from "react";
import "./App.css";
import { TimerCard } from "./components/timer-card";
import { AddTimerButton } from "./components/add-timer-button";
import { PresetButtons } from "./components/preset-buttons";
import type { Timer } from "./types/timer";
import { loadTimers, saveTimers } from "./lib/storage";

function App() {
  const [timers, setTimers] = useState<Timer[]>(() => loadTimers());

  const addTimer = (minutes: number, seconds = 0) => {
    const totalSeconds = minutes * 60 + seconds;
    const deadline = Date.now() + totalSeconds * 1000; // ms精度
    const newTimer: Timer = {
      id: Date.now().toString(),
      name: `ラーメン ${minutes}分${seconds > 0 ? seconds + "秒" : ""}`,
      deadline,
      totalSeconds,
      isRunning: true,
      isCompleted: false,
    };
    setTimers((prev) => [...prev, newTimer]);
  };

  const removeTimer = (id: string) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((timer) => {
        if (timer.id === id) {
          if (timer.isRunning) {
            const remaining = Math.max(0, timer.deadline - Date.now());
            return { ...timer, isRunning: false, remainingMs: remaining };
          } else {
            const newDeadline = Date.now() + (timer.remainingMs || 0);
            return { ...timer, isRunning: true, deadline: newDeadline };
          }
        }
        return timer;
      })
    );
  };

  const resetTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((timer) => {
        if (timer.id === id) {
          const newDeadline = Date.now() + timer.totalSeconds * 1000;
          return {
            ...timer,
            deadline: newDeadline,
            isRunning: true,
            isCompleted: false,
          };
        }
        return timer;
      })
    );
  };

  // タイマーが変更されるとlocalStorageに保存
  useEffect(() => {
    saveTimers(timers);
  }, [timers]);

  // アプリ起動時に期限切れのタイマーをクリーンアップ
  useEffect(() => {
    const now = Date.now();
    setTimers((prev) =>
      prev.filter((timer) => {
        // 期限切れのタイマーを一定時間保持(5分)
        if (timer.isCompleted) {
          const completedTime = timer.deadline;
          return now - completedTime < 5 * 60 * 1000;
        }
        return true;
      })
    );
  }, []);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-4xl text-balance md:text-5xl">
            🍜 ラーメンタイマー
          </h1>
          <p className="text-muted-foreground text-pretty">
            複数のラーメンを同時に管理できる正確なタイマー
          </p>
        </header>

        <PresetButtons onAddTimer={addTimer} />

        <div className="mb-6">
          <AddTimerButton onAddTimer={addTimer} />
        </div>

        {timers.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-12 text-center">
            <div className="mx-auto mb-4 text-6xl">🍜</div>
            <h3 className="mb-2 font-semibold text-lg">タイマーがありません</h3>
            <p className="text-muted-foreground text-sm">
              プリセットを選ぶか、カスタムタイマーを追加してください
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {timers.map((timer) => (
              <TimerCard
                key={timer.id}
                timer={timer}
                onRemove={removeTimer}
                onToggle={toggleTimer}
                onReset={resetTimer}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
