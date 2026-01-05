import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Share2, MoreHorizontal, Plus, Mic, Database, ArrowUp } from 'lucide-react';

const ChatWindow = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', content: `Started conversation in session ${id}. How can I assist you?` }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // AI Mock Response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        content: "I'm processing that information now. Would you like me to save this to your folder?"
      }]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Window Header */}
      <header className="px-6 py-2 flex justify-between items-center border-b border-white/10">
        <div className=" px-4 py-2  text-sm font-semibold text-slate-600 flex items-center gap-2 cursor-pointer transition-all ">
          Aetheris AI Chat <ChevronDown size={14} />
        </div>
        <div className="flex gap-3 text-slate-500">
          <Share2 size={18} className="cursor-pointer hover:text-slate-800" />
          <MoreHorizontal size={18} className="cursor-pointer hover:text-slate-800" />
        </div>
      </header>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 md:px-8 w-200 mx-auto py-4 space-y-8 no-scrollbar scroll-smooth">
        <AnimatePresence mode="popLayout">
          {messages.map((m) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] px-6 py-4 rounded-[2rem] text-sm shadow-sm border ${
                m.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-tr-none border-blue-400/40' 
                  : 'bg-neutral-300/90 backdrop-blur-md text-neutral-900 rounded-tl-none border-white/40'
              }`}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dynamic Input Bar */}
      <div className="px-8 py-6 pt-2 w-200 mx-auto" >
        <motion.form 
          onSubmit={handleSend}
          className=" bg-neutral-600/40  border border-white/50 shadow-sm  hover:bg-neutral-500/40 
 rounded-[2.5rem] p-4 "
        >
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend(e)}
            placeholder="Write your symptoms..." 
            className="w-full bg-transparent border-none focus:ring-0 text-[15px] resize-none h-9 overflow-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden outline-none px-4 py-2"
          />
          <div className="flex justify-between items-center mt-2 px-2">
            <div className="flex gap-5 items-center">
              <Plus size={20} className="text-slate-400 cursor-pointer" />
              <Mic size={20} className="text-slate-400 cursor-pointer" />
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-white/80 px-4 py-2 rounded-full border border-white cursor-pointer">
                <Database size={14} /> DATA SOURCE <ChevronDown size={12} />
              </div>
            </div>
            <button type="submit" className="bg-blue-500 p-3 rounded-[1.2rem] text-white shadow-lg">
              <ArrowUp size={22} />
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default ChatWindow;