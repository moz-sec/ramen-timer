import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AddTimerButtonProps {
  onAddTimer: (minutes: number, seconds: number) => void;
}

export function AddTimerButton({ onAddTimer }: AddTimerButtonProps) {
  const [open, setOpen] = useState(false);
  const [minutes, setMinutes] = useState("3");
  const [seconds, setSeconds] = useState("0");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const mins = Number.parseInt(minutes) || 0;
    const secs = Number.parseInt(seconds) || 0;
    if (mins === 0 && secs === 0) return;
    onAddTimer(mins, secs);
    setOpen(false);
    setMinutes("3");
    setSeconds("0");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          size="lg"
          className="w-full font-semibold md:w-auto"
          onClick={() => setOpen(true)}
        >
          カスタムタイマーを追加
        </Button>
      </DialogTrigger>
      {open && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>カスタムタイマー</DialogTitle>
            <DialogDescription>
              お好みの時間を設定してタイマーを追加できます
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minutes">分</Label>
                <Input
                  id="minutes"
                  type="number"
                  min={0}
                  max={1440}
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seconds">秒</Label>
                <Input
                  id="seconds"
                  type="number"
                  min={0}
                  max={59}
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="text-lg"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              タイマーを追加
            </Button>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default AddTimerButton;
