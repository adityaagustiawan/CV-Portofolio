type WebGLFallbackProps = {
  label?: string;
  description?: string;
  className?: string;
};

export default function WebGLFallback({
  label = "3D preview",
  description = "Your device/browser doesn’t support WebGL.",
  className,
}: WebGLFallbackProps) {
  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[30rem] -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-white/60">{label}</div>
          <div className="mt-2 text-sm text-white/70">{description}</div>
        </div>
      </div>
    </div>
  );
}

