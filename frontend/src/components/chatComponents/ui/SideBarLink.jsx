import React from 'react';
import { motion } from 'framer-motion';

export const SidebarLink = ({ icon, label, onClick }) => (
  <motion.div 
    whileHover={{ x: 4 }}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-zinc-400 hover:bg-neutral-500/40 rounded-2xl cursor-pointer transition-all truncate"
  >
    {icon} <span className="truncate">{label}</span>
  </motion.div>
);