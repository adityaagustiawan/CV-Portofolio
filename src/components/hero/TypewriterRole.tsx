import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterRoleProps {
  roles: string[];
}

export default function TypewriterRole({ roles }: TypewriterRoleProps) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentRole = roles[index];
    
    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setTypingSpeed(150);

        if (displayText === currentRole) {
          // Pause at the end of typing
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setTypingSpeed(100);

        if (displayText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, roles, typingSpeed]);

  return (
    <span className="block text-zinc-600 dark:text-white/70 min-h-[1.5em] relative">
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-blue-500 ml-1 align-middle"
      />
    </span>
  );
}
