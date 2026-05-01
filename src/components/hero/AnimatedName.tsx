import { motion } from "framer-motion";
import { useMemo } from "react";

type AnimatedNameProps = {
  value: string;
  reducedMotion: boolean;
  className?: string;
};

export default function AnimatedName({ value, reducedMotion, className }: AnimatedNameProps) {
  const parts = useMemo(() => value.split(" ").filter(Boolean), [value]);
  const letters = useMemo(() => value.split(""), [value]);

  if (reducedMotion) {
    return (
      <span className={className}>
        {value}
      </span>
    );
  }

  return (
    <span className={cn(className, "transform-gpu")}>
      <span className="relative inline-block isolate">
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-6 -inset-y-2 transform-gpu"
          initial={{ opacity: 0, filter: "blur(18px)", scale: 0.98 }}
          animate={{ opacity: 1, filter: "blur(18px)", scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              "radial-gradient(260px circle at 40% 50%, rgba(59,130,246,0.30), transparent 60%), radial-gradient(260px circle at 70% 60%, rgba(147,197,253,0.16), transparent 62%)",
            backfaceVisibility: "hidden"
          }}
        />

        <motion.span
          className="relative inline-flex flex-wrap items-baseline gap-x-3 transform-gpu"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
          }}
          style={{ backfaceVisibility: "hidden" }}
        >
          {parts.map((word) => (
            <motion.span
              key={word}
              className="relative inline-block transform-gpu"
              variants={{
                hidden: { y: 10, opacity: 0, filter: "blur(8px)" },
                show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="bg-gradient-to-b from-zinc-900 to-zinc-700 bg-clip-text text-transparent dark:from-white dark:to-white/70">
                {word}
              </span>
            </motion.span>
          ))}
        </motion.span>

        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-2 h-px transform-gpu"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          style={{
            transformOrigin: "left",
            background: "linear-gradient(90deg, rgba(59,130,246,0.0), rgba(59,130,246,0.55), rgba(147,197,253,0.15), rgba(59,130,246,0.0))",
            backfaceVisibility: "hidden"
          }}
        />

        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transform-gpu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            maskImage: "linear-gradient(120deg, transparent 35%, rgba(0,0,0,0.85) 45%, transparent 60%)",
            WebkitMaskImage: "linear-gradient(120deg, transparent 35%, rgba(0,0,0,0.85) 45%, transparent 60%)",
            backfaceVisibility: "hidden"
          }}
        >
          <motion.span
            className="absolute inset-y-0 -left-1/2 w-[200%] transform-gpu"
            initial={{ x: "-15%" }}
            animate={{ x: "15%" }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            style={{ 
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
              backfaceVisibility: "hidden"
            }}
          />
        </motion.span>

        <span className="sr-only">{letters.join("")}</span>
      </span>
    </span>
  );
}

