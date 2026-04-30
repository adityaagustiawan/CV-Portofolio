import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, Minimize2, Maximize2, Terminal, Cpu } from 'lucide-react';
import { site } from '@/data/site';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAgentUI() {
  const [isOpen, setIsOpen] = useState(true); 
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `SYSTEM INITIALIZED: Adytia's AI Copilot online. Reviewing portfolio parameters... How can I assist with your inquiry today?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Check for sensitive or out-of-context topics
    const sensitiveWords = ['salary', 'address', 'phone', 'password', 'private', 'religion', 'politics'];
    if (sensitiveWords.some(word => q.includes(word))) {
      return "ACCESS_DENIED: The requested information is sensitive or outside professional parameters. Please contact Adytia directly for private inquiries.";
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

    // Handle generic praise or out-of-context opinions about the CV itself
    if (q.includes('good') || q.includes('great') || q.includes('nice') || q.includes('job') || q.includes('perfect') || q.includes('quality') || q.includes('impressive')) {
        if (q.includes('cv') || q.includes('resume') || q.includes('portfolio')) {
            return "ANALYSIS: Portfolio quality verified. Architecture optimized for AI Engineering roles with emphasis on RAG and MLOps reliability.";
        }
        return "LOG: Positive feedback acknowledged. System integrity remains optimal.";
    }

    // Handle out-of-context topics that aren't about the CV
    if (q.includes('weather') || q.includes('food') || q.includes('sport') || q.includes('movie') || q.includes('game') && !q.includes('dev')) {
        return "OUT_OF_BOUNDS: Topic exceeds professional scope. Please focus queries on Adytia's technical background or portfolio data.";
    }

    // Default response for out-of-context queries
    if (!q.includes('adytia') && !q.includes('adit') && !q.includes('portfolio') && !q.includes('experience') && !q.includes('skill')) {
        return "I am an AI Agent designed to assist with portfolio navigation. Ask about technical specifications, project highlights, or academic credentials.";
    }

    return "QUERY_UNRECOGNIZED: Please rephrase your question regarding Adytia's technical profile or project history.";
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              height: isMinimized ? '48px' : '380px',
              width: '300px'
            }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden mb-4 flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">Agent_Copilot_v1</span>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-3 h-3 text-white/50" /> : <Minimize2 className="w-3 h-3 text-white/50" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X className="w-3 h-3 text-white/50" />
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
                        {msg.role === 'assistant' ? <Cpu className="w-2.5 h-2.5 text-blue-500" /> : <User className="w-2.5 h-2.5 text-zinc-500" />}
                        <span className="text-[7px] uppercase tracking-widest text-white/30">{msg.role === 'assistant' ? 'AI_SYSTEM' : 'USER'}</span>
                      </div>
                      <div className={`p-2.5 rounded-md text-[11px] leading-relaxed w-full ${
                        msg.role === 'user' 
                          ? 'bg-blue-600/10 text-blue-100 border border-blue-500/20' 
                          : 'bg-white/5 text-zinc-400 border border-white/5'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2 mb-1">
                        <Cpu className="w-2.5 h-2.5 text-blue-500" />
                        <span className="text-[7px] uppercase tracking-widest text-white/30">AI_SYSTEM</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-md border border-white/5">
                        <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-2.5 bg-black/40 border-t border-white/10">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="TYPE QUERY..."
                      className="flex-1 bg-transparent border-none text-white text-[10px] font-mono focus:ring-0 outline-none placeholder:text-white/20 uppercase"
                    />
                    <button 
                      type="submit"
                      disabled={!input.trim()}
                      className="text-blue-500 hover:text-blue-400 disabled:text-zinc-800 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 bg-zinc-900 border border-white/10 text-blue-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group pointer-events-auto"
        >
          <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
}
