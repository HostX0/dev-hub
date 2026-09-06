/** Animated 1px gradient ring. Rotates a composited layer (transform only) instead of repainting a gradient every frame. */
export function BorderBeam({ duration = 5 }: { duration?: number }) {
  return (
    <div aria-hidden className="beam-ring">
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2 animate-beam-spin bg-[conic-gradient(from_0deg,transparent_0_70%,#6366F1_85%,#6366F1_95%,transparent_100%)] will-change-transform"
        style={{ animationDuration: `${duration}s` }}
      />
    </div>
  );
}
