import React from 'react';
import { motion } from 'framer-motion';
import { Search, Check, MessageSquare } from 'lucide-react';

export const SearchDialog = ({ onClose, items, onSelect }) => {
  const [q, setQ] = React.useState('');
  const filtered = items.filter(i => i.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-md p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-neutral-400/40 backdrop-blur-2xl w-full max-w-lg rounded-[2.5rem] border border-white/50 p-6 shadow-2xl">
        <div className="flex items-center gap-3 bg-neutral-400/40 p-4 rounded-2xl border border-white/50 mb-4">
          <Search size={20} className="text-slate-400" />
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} className="outline-none w-full" placeholder="Search your chats..." />
        </div>
        <div className="max-h-60 overflow-y-auto no-scrollbar space-y-1">
          {filtered.map(item => (
            <div key={item.id} onClick={() => onSelect(item.id)} className="p-3 hover:bg-blue-400/40 hover:text-zinc-200 rounded-xl cursor-pointer flex items-center gap-3 transition-colors font-medium text-sm">
              <MessageSquare size={16} /> {item.title}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const NewFolderDialog = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-sm">
    <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="bg-neutral-400/40 rounded-3xl p-6 border border-white/50 shadow-sm transition-all group w-80">
      <h3 className="font-bold mb-4">New Folder</h3>
      <div className="flex gap-2">
        <input className="flex-1 bg-neutral-400/40 rounded-xl px-4 py-2 border-none outline-none" placeholder="Folder name..." />
        <button onClick={onClose} className="bg-blue-600 text-white p-2 rounded-xl"><Check size={20}/></button>
      </div>
    </motion.div>
  </div>
);