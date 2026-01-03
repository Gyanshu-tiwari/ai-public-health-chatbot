import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

export const MessageItem = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} group w-full`}
    >
      <div className={`flex flex-col gap-2 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* AI Brand Header */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-1 ml-2">
            <div className="w-5 h-5 bg-gradient-to-tr from-indigo-500 to-pink-400 rounded-md shadow-sm" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Aetheris AI</span>
          </div>
        )}
        
        {/* Message Bubble */}
        <div className={`relative px-6 py-4 rounded-[2rem] text-sm shadow-sm border transition-all ${
          isUser 
            ? 'bg-blue-600 text-white rounded-tr-none border-blue-400' 
            : 'bg-white/50 backdrop-blur-md text-slate-800 rounded-tl-none border-white/60'
        }`}>
          {message.content}

          {/* Action buttons visible on hover (AI only) */}
          {!isUser && (
            <div className="absolute -right-12 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 bg-white/30 rounded-lg hover:bg-white hover:shadow-sm text-slate-400 transition-all">
                <Copy size={12} />
              </button>
              <button className="p-1.5 bg-white/30 rounded-lg hover:bg-white hover:shadow-sm text-slate-400 transition-all">
                <Check size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageItem;