import type { Timer } from "../types/timer";

const STORAGE_KEY = "ramen-timers";

export function saveTimers(timers: Timer[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
  } catch (error) {
    console.warn("Failed to save timers to localStorage:", error);
  }
}

export function loadTimers(): Timer[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const timers: Timer[] = JSON.parse(saved);

    return timers.filter(validateTimer);
  } catch (error) {
    console.warn("Failed to load timers from localStorage:", error);
    return [];
  }
}

function validateTimer(timer: any): timer is Timer {
  return (
    timer &&
    typeof timer.id === "string" &&
    typeof timer.name === "string" &&
    typeof timer.deadline === "number" &&
    typeof timer.totalSeconds === "number" &&
    typeof timer.isRunning === "boolean" &&
    typeof timer.isCompleted === "boolean"
  );
}

export function clearTimers(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear timers from localStorage:", error);
  }
}
