export function playAlarm(): void {
  // TODO: hook real sound later
  try {
    const audio = new Audio("/sounds/notification1.mp3");
    void audio.play().catch(() => {});
  } catch {
    // no-op
  }
}

export function sendNotification(title: string): void {
  // TODO: integrate with Tauri notification later
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification(title);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }
}

export function vibrate(): void {
  // TODO: integrate haptics later
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
}
