import { Button } from "./ui/button";

interface PresetButtonsProps {
  onAddTimer: (minutes: number, seconds?: number) => void;
}

const presets = [
  { label: "3分", minutes: 3, emoji: "🍜" },
  { label: "4分", minutes: 4, emoji: "🍜" },
  { label: "5分", minutes: 5, emoji: "🍜" },
  { label: "30秒", minutes: 0, seconds: 30, emoji: "⚡" },
] as const;

export function PresetButtons({ onAddTimer }: PresetButtonsProps) {
  return (
    <div className="mb-6">
      <h2 className="mb-3 font-semibold text-sm text-muted-foreground uppercase tracking-wide">
        プリセット
      </h2>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            variant="outline"
            size="lg"
            className="font-semibold bg-transparent"
            onClick={() => onAddTimer(preset.minutes, (preset as any).seconds)}
          >
            <span className="mr-2">{preset.emoji}</span>
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default PresetButtons;
