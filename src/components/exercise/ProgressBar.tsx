"use client";

interface Props {
  current: number;
  total: number;
  hearts: number;
}

export function ExerciseProgress({ current, total, hearts }: Props) {
  const progress = (current / total) * 100;

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-3 bg-secondary/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center gap-1 text-sm">
        <span className="text-red-500">❤️</span>
        <span className="font-medium">{hearts}</span>
      </div>
    </div>
  );
}
