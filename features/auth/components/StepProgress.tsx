const TOTAL_STEPS = 6;

export function StepProgress({ current }: { current: number }) {
  const pct = Math.round((current / TOTAL_STEPS) * 100);
  return (
    <div className="w-full h-1.25 bg-muted-bg rounded-full overflow-hidden">
      <div
        className="h-full bg-brand-solid-bg rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
