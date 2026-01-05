import React from 'react'
import {
  Activity,
} from "lucide-react";

const Footer = () => (
  <footer className="py-16 border-t border-white/5 px-6 relative z-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg rotate-12 flex items-center justify-center">
          <Activity size={16} className="text-indigo-400" />
        </div>

        <span className="font-bold text-xl text-white">Aetheris</span>
      </div>

      <div className="flex gap-8 text-sm text-slate-500">
        <a href="#" className="hover:text-white transition-colors">
          Privacy
        </a>

        <a href="#" className="hover:text-white transition-colors">
          Terms
        </a>

        <a href="#" className="hover:text-white transition-colors">
          Security
        </a>
      </div>

      <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
        © 2026 Aetheris AI Health. Global Inc.
      </p>
    </div>
  </footer>
);

export default Footer