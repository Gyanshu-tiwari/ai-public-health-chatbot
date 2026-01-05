import React from 'react'
import {
  ArrowRight,
  Sparkles,
  Play,
} from "lucide-react";
import { motion } from 'framer-motion';
import ChatPreview from './ChatPreview';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="relative pt-16 pb-24 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
          <Sparkles size={14} className="text-indigo-400" />

          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
            Next Gen Health Assistant
          </span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white mb-6 tracking-tight">
          Your Personal AI <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
            Health Companion
          </span>
        </h1>

        <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
          Instant medical insights, symptom tracking, and personalized wellness
          plans. The most secure AI-powered health assistant for your daily
          life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all shadow-xl shadow-indigo-500/20">
            Get Started{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
            <Play size={18} fill="currentColor" /> <a href="#">Watch Demo</a>
          </button>
        </div>

        <div className="mt-12 flex items-center gap-4 text-sm text-slate-500">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full border-2 border-[#0B0C10] bg-slate-800 flex items-center justify-center text-[10px] font-bold overflow-hidden`}
              >
                <img
                  src={`https://i.pravatar.cc/100?u=${i}`}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <p>
            Join <span className="text-white font-bold">10k+</span> users
            tracking their health daily
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full animate-pulse" />

        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] shadow-2xl overflow-hidden">
          <ChatPreview />
        </div>
      </motion.div>
    </div>
  </section>
);


export default HeroSection