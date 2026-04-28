import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const videos = [
  // AI / Neural Networks / Deep Learning
  "https://cdn.pixabay.com/video/2023/10/20/185816-876735510_large.mp4",
  // MLOps / Cloud Infrastructure / Data Pipelines
  "https://cdn.pixabay.com/video/2021/04/12/70874-537443152_large.mp4",
  // Robotics / AI Hardware / Automation
  "https://cdn.pixabay.com/video/2023/10/19/185598-876251213_large.mp4",
  // Cyberpunk / Game Dev / 3D Environments
  "https://cdn.pixabay.com/video/2020/05/25/40105-424840842_large.mp4",
  // Data Visualization / Global Networks
  "https://cdn.pixabay.com/video/2022/10/18/135338-761923239_large.mp4"
];

export default function VideoBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 15000); // Slower rotation for more immersion
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Dark Cinematic Overlays */}
      <div className="absolute inset-0 bg-zinc-950/80 z-10" /> 
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 z-10" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={videos[index]}
          initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
          animate={{ opacity: 0.25, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={videos[index]} type="video/mp4" />
          </video>
        </motion.div>
      </AnimatePresence>
      
      {/* HUD Scanlines & Grain */}
      <div className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.03] to-transparent h-[200%] animate-scanline" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </div>
  );
}

