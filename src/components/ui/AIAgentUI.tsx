import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, Minimize2, Maximize2, Terminal, Cpu, Sparkles, Brain, Zap, Activity, Volume2, VolumeX, Radio } from 'lucide-react';
import { site } from '@/data/site';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const AI_ICONS = [Bot, Brain, Sparkles, Zap, Activity, Cpu];

export default function AIAgentUI() {
  const [isOpen, setIsOpen] = useState(false); 
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `SYSTEM INITIALIZED: Adytia's AI Copilot online. Reviewing portfolio parameters... How can I assist with your inquiry today?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [warningLevel, setWarningLevel] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Toxic/Prohibited word list
  const TOXIC_WORDS = ['fuck', 'shit', 'bitch', 'asshole', 'idiot', 'stupid', 'dumb', 'hate', 'kill', 'die', 'threat', 'scam', 'hack'];
  const SENSITIVE_WORDS = ['salary', 'address', 'phone', 'password', 'private', 'religion', 'politics', 'money'];

  // Icon cycling animation for the bubble
  useEffect(() => {
    const interval = setInterval(() => {
      // If warning level is high, use more aggressive icons
      if (warningLevel > 0) {
        setCurrentIconIndex(Math.random() > 0.5 ? 4 : 5); // Activity or Cpu (flashing red vibe)
      } else {
        setCurrentIconIndex((prev) => (prev + 1) % AI_ICONS.length);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [warningLevel]);

  // Handle Site Closure
  useEffect(() => {
    if (warningLevel >= 3) {
      speak("CRITICAL SECURITY BREACH: TERMINATING SESSION IMMEDIATELY.");
      setTimeout(() => {
        window.location.href = "about:blank"; // Close/Clear the site
      }, 2000);
    }
  }, [warningLevel]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle Speech
  const speak = (text: string) => {
    if (isMuted || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const cleanText = text.replace(/SYSTEM_SPECS:|PROJECT_LOG:|COMM_CHANNEL:|DOC_QUERY:|ANALYSIS:|LOG:|OUT_OF_BOUNDS:|QUERY_UNRECOGNIZED:|SYSTEM INITIALIZED:|ACCESS_DENIED:|CRITICAL:|WARNING:|THREAT_DETECTED:/g, '').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = warningLevel > 0 ? 1.4 : 1.1; // Speak faster if angry
    utterance.pitch = warningLevel > 0 ? 0.8 : 1.0; // Deeper voice if angry
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Neural')) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
      speak(response);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString();

    // Check for toxicity
    if (TOXIC_WORDS.some(word => q.includes(word))) {
      setWarningLevel(prev => prev + 1);
      const level = warningLevel + 1;
      if (level === 1) return "WARNING: Verbal toxicity detected. Please maintain professional communication protocols.";
      if (level === 2) return "THREAT_DETECTED: Final warning. Further inappropriate input will result in immediate system termination.";
      return "CRITICAL: SECURITY PROTOCOL ACTIVATED. GOODBYE.";
    }
    
    // Check for sensitive or out-of-context topics
    if (SENSITIVE_WORDS.some(word => q.includes(word))) {
      return "ACCESS_DENIED: The requested information is sensitive or outside professional parameters. Please contact Adytia directly for private inquiries.";
    }

    // Realtime/Dynamic queries
    if (q.includes('time') || q.includes('clock')) {
      return `SYSTEM_LOG: The current synchronized system time is ${timeString}. Everything is operating within normal parameters.`;
    }

    if (q.includes('date') || q.includes('today')) {
      return `SYSTEM_LOG: Today's date in the portfolio registry is ${dateString}.`;
    }

    if (q.includes('status') || q.includes('health')) {
      return "ANALYSIS: System status is nominal. Neural background layers are at 98% efficiency. Adytia's portfolio data is fully indexed and ready for retrieval.";
    }

    // Smart Out-of-Context Handling (Realtime-ish)
    if (q.includes('weather') || q.includes('food') || q.includes('movie') || q.includes('sport') || q.includes('game') && !q.includes('dev')) {
      const responses = [
        "LOG: Data outside professional registry. However, system suggests checking a local weather API for accuracy.",
        "ANALYSIS: Non-professional query identified. I am optimized for technical portfolio data, not general lifestyle trivia.",
        "OUT_OF_BOUNDS: Please redirect queries to Adytia's AI architecture or software projects."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Context-aware responses
    if (q.includes('who') || q.includes('about')) {
      return `Adytia (Adit) Agustiawan is an ${site.role} with a Bachelor's in IT from Universitas AMIKOM Yogyakarta. He specializes in AI Engineering, Game Dev, and MLOps.`;
    }
    
    if (q.includes('project') || q.includes('work')) {
      const projects = site.projects.map(p => p.title).join(', ');
      return `PROJECT_LOG: Active projects identified: ${projects}. You can explore them in the Projects section.`;
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
      const allSkills = Object.values(site.skills).flat().join(', ');
      return `SYSTEM_SPECS: Technical registry includes ${allSkills}. Primary expertise: LLM operations and production AI features.`;
    }

    if (q.includes('contact') || q.includes('email')) {
      return `COMM_CHANNEL: Direct contact available at ${site.email}. Social protocols active on LinkedIn and GitHub.`;
    }

    if (q.includes('cv') || q.includes('resume')) {
      return "DOC_QUERY: Full resume available in the Resume section. Expertise focus: RAG, LLM Evaluation, and Agentic Workflows.";
    }

    // Handle generic praise
    if (q.includes('good') || q.includes('great') || q.includes('nice') || q.includes('job') || q.includes('perfect') || q.includes('quality') || q.includes('impressive')) {
        if (q.includes('cv') || q.includes('resume') || q.includes('portfolio')) {
            return "ANALYSIS: Portfolio quality verified. Architecture optimized for AI Engineering roles with emphasis on RAG and MLOps reliability.";
        }
        return "LOG: Positive feedback acknowledged. System integrity remains optimal.";
    }

    // Default response for out-of-context queries
    if (!q.includes('adytia') && !q.includes('adit') && !q.includes('portfolio') && !q.includes('experience') && !q.includes('skill')) {
        const randomMetric = Math.floor(Math.random() * 100);
        return `I am an AI Agent optimized for portfolio navigation. Current neural load is ${randomMetric}%. Please ask about Adytia's technical specifications, project highlights, or academic credentials.`;
    }

    return "QUERY_UNRECOGNIZED: Please rephrase your question regarding Adytia's technical profile or project history.";
  };

  const ActiveIcon = AI_ICONS[currentIconIndex];

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]" ref={constraintsRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              height: isMinimized ? '48px' : '400px',
              width: '320px',
              borderColor: warningLevel > 0 ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.1)'
            }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "absolute bottom-6 left-6 bg-zinc-950/80 backdrop-blur-xl border rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto cursor-grab active:cursor-grabbing",
              warningLevel > 0 && "animate-shake shadow-[0_0_50px_rgba(239,68,68,0.3)]"
            )}
            style={{ x: 0, y: 0 }}
          >
            {/* Header / Drag Handle */}
            <div className={cn(
              "px-4 py-3 border-b flex items-center justify-between cursor-move transition-colors",
              warningLevel > 0 ? "bg-red-500/10 border-red-500/20" : "bg-white/5 border-white/10"
            )}>
              <div className="flex items-center gap-2">
                <Terminal className={cn("w-4 h-4", warningLevel > 0 ? "text-red-500" : "text-blue-400")} />
                <div className="flex flex-col">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.2em] leading-none",
                    warningLevel > 0 ? "text-red-500" : "text-white/70"
                  )}>
                    {warningLevel > 0 ? `DEFENSE_MODE_v${warningLevel}.0` : "Agent_Copilot_v1.5"}
                  </span>
                  {isSpeaking && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Radio className={cn("w-2 h-2 animate-pulse", warningLevel > 0 ? "text-red-500" : "text-green-500")} />
                      <span className={cn(
                        "text-[7px] font-bold uppercase tracking-widest",
                        warningLevel > 0 ? "text-red-500" : "text-green-500/80"
                      )}>
                        {warningLevel > 0 ? "THREAT_ANALYSIS..." : "TRANSMITTING..."}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); if(!isMuted) window.speechSynthesis.cancel(); }}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-white/50" />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5 text-white/50" /> : <Minimize2 className="w-3.5 h-3.5 text-white/50" />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); window.speechSynthesis.cancel(); }}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-white/50" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar font-mono"
                >
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className="flex flex-col items-start"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {msg.role === 'assistant' ? (
                          <Cpu className={cn("w-3 h-3", warningLevel > 0 ? "text-red-500" : "text-blue-500")} />
                        ) : (
                          <User className="w-3 h-3 text-zinc-500" />
                        )}
                        <span className="text-[8px] uppercase tracking-widest text-white/30">
                          {msg.role === 'assistant' ? (warningLevel > 0 ? 'DEFENSE_SYS' : 'AI_SYSTEM') : 'USER'}
                        </span>
                      </div>
                      <div className={cn(
                        "p-3 rounded-xl text-[11px] leading-relaxed w-full border shadow-inner",
                        msg.role === 'user' 
                          ? 'bg-blue-600/10 text-blue-100 border-blue-500/20' 
                          : warningLevel > 0 
                            ? 'bg-red-500/10 text-red-100 border-red-500/20'
                            : 'bg-white/5 text-zinc-400 border-white/5'
                      )}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2 mb-1">
                        <Cpu className="w-3 h-3 text-blue-500" />
                        <span className="text-[8px] uppercase tracking-widest text-white/30">AI_SYSTEM</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-3 bg-black/40 border-t border-white/10">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="ENTER QUERY..."
                      className="flex-1 bg-transparent border-none text-white text-[11px] font-mono focus:ring-0 outline-none placeholder:text-white/20 uppercase"
                    />
                    <button 
                      type="submit"
                      disabled={!input.trim()}
                      className="text-blue-500 hover:text-blue-400 disabled:text-zinc-800 transition-colors p-1"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Bubble */}
      {!isOpen && (
        <motion.button
          layoutId="ai-bubble"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center pointer-events-auto border border-white/20 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIconIndex}
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <ActiveIcon className="w-7 h-7" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-white/10 animate-pulse" />
        </motion.button>
      )}
    </div>
  );
}
