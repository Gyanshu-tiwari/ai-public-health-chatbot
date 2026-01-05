import React from 'react'
import {
  ArrowRight,
} from "lucide-react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => (
  <section className="py-24 px-6 relative overflow-hidden">
    <div className="max-w-5xl mx-auto relative group">
      {/* Background Glow */}

      <div className="absolute bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[3.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

      {/* Main Glassmorphic Card */}

      <div className="relative bg-gradient-to-br from-indigo-500/20 to-purple-600/40 backdrop-blur-3xl border border-white/30 rounded-[3.5rem] p-12 md:p-20 text-center overflow-hidden">
        {/* Internal decorative gradients */}

        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full"></div>

        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            Ready to transform <br /> your health?
          </h2>

          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Join thousands of individuals taking control of their medical
            journeys with personalized AI guidance.
          </p>

          <div className="flex justify-center">
            <button className="relative group px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg overflow-hidden transition-all shadow-2xl shadow-indigo-500/20 hover:scale-105 active:scale-95">
              <Link to="/register" className="relative z-10 flex items-center gap-2">
                Start Free Consultation <ArrowRight size={20} />
              </Link>

              {/* Button shimmer effect */}

              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
            </button>
          </div>

          <p className="mt-10 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
            Secure • Private • No Credit Card Required
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default CTASection