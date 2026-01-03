import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, ChevronDown, MoreHorizontal } from 'lucide-react';
import { ChatNavItem } from './ChatNavItem';
import { ChatContextMenu } from '../ui/ContextMenu';

export const FolderItem = ({ label, items, color }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  return (
    <div className="mt-1 px-2">
      {/* Folder Header */}
      <div 
        className="flex items-center justify-between py-2 px-2 hover:bg-neutral-500/30 rounded-xl cursor-pointer group transition-all" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 font-bold text-sm text-slate-500">
          <Folder size={18} className={color} /> 
          <span className="truncate">{label}</span>
        </div>
        
        <div className="flex items-center gap-1">
          {/* 3-Dots visible on hover */}
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              setMenuAnchor(e.currentTarget); 
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/50 rounded-md transition-opacity"
          >
            <MoreHorizontal size={14} className="text-slate-300" />
          </button>
          
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} className="text-slate-400" />
          </motion.div>
        </div>
      </div>

      {/* Sub-items (Chats inside folder) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden ml-8 border-l border-white/20 mt-1"
          >
            {items.map(chat => (
              <ChatNavItem key={chat.id} chat={chat} />
            ))}
            {items.length === 0 && (
              <div className="pl-4 py-2 text-[10px] text-slate-400 italic">Empty folder</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Folder Context Menu (Dark Theme) */}
      <AnimatePresence>
        {menuAnchor && (
          <ChatContextMenu 
            anchor={menuAnchor} 
            onClose={() => setMenuAnchor(null)} 
            isFolder={true} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FolderItem;