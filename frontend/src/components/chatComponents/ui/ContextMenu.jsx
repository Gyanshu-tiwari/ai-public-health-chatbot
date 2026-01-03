import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Share2, Users, Edit3, Folder, Pin, Archive, Trash2, Sparkles, Settings, LogOut, HelpCircle } from 'lucide-react';

const MenuButton = ({ icon, label, hasChild, color = "text-white" }) => (
  <button className={`w-full flex items-center justify-between p-2.5 hover:bg-white/10 rounded-xl transition-colors ${color}`}>
    <div className="flex items-center gap-3 text-sm font-medium">{icon} {label}</div>
    {hasChild && <ChevronRight size={14} className="opacity-50" />}
  </button>
);

export const AccountMenu = ({ anchor, onClose }) => {
  const rect = anchor.getBoundingClientRect();
  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="absolute bg-[#2D2D2D] text-white rounded-2xl p-2 w-64 shadow-2xl border border-white/10"
        style={{ left: rect.left, bottom: window.innerHeight - rect.top + 10 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-3 flex items-center gap-3 border-b border-white/10 mb-2">
           <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-xs">GT</div>
           <div>
             <p className="text-sm font-bold">Gyanshu Tiwari</p>
             <p className="text-[10px] text-slate-400">@gyanshu007</p>
           </div>
        </div>
        <MenuButton icon={<Sparkles size={16}/>} label="Upgrade plan" />
        <MenuButton icon={<Settings size={16}/>} label="Personalization" />
        <MenuButton icon={<Settings size={16}/>} label="Settings" />
        <div className="h-[1px] bg-white/10 my-1" />
        <MenuButton icon={<HelpCircle size={16}/>} label="Help" hasChild />
        <MenuButton icon={<LogOut size={16}/>} label="Log out" />
      </motion.div>
    </div>
  );
};

export const ChatContextMenu = ({ anchor, onClose, isFolder }) => {
  const rect = anchor.getBoundingClientRect();
  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="absolute bg-[#2D2D2D] text-white rounded-2xl p-2 w-56 shadow-2xl border border-white/10"
        style={{ left: rect.right + 10, top: rect.top }}
        onClick={e => e.stopPropagation()}
      >
        <MenuButton icon={<Share2 size={16}/>} label="Share" />
        {isFolder ? (
          <>
            <MenuButton icon={<Edit3 size={16}/>} label="Rename project" />
            <div className="h-[1px] bg-white/10 my-1" />
            <MenuButton icon={<Trash2 size={16}/>} label="Delete project" color="text-rose-400" />
          </>
        ) : (
          <>
            <MenuButton icon={<Users size={16}/>} label="Start a group chat" />
            <MenuButton icon={<Edit3 size={16}/>} label="Rename" />
            <MenuButton icon={<Folder size={16}/>} label="Move to project" hasChild />
            <div className="h-[1px] bg-white/10 my-1" />
            <MenuButton icon={<Pin size={16}/>} label="Pin chat" />
            <MenuButton icon={<Archive size={16}/>} label="Archive" />
            <MenuButton icon={<Trash2 size={16}/>} label="Delete" color="text-rose-400" />
          </>
        )}
      </motion.div>
    </div>
  );
};