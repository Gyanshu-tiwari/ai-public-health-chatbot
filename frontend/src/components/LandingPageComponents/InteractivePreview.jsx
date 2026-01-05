import React from 'react'
import {
  Heart,
  Zap,
  Activity,
  CheckCircle,
  Smartphone,
} from "lucide-react";

const InteractivePreview = () => (
  <section className="py-24 px-6 relative">
    <div className="max-w-7xl mx-auto bg-indigo-600/10 border border-white/5 rounded-[4rem] p-12 lg:p-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-500/20 blur-[100px] pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Advanced Monitoring, <br /> Zero Effort.
          </h2>

          <p className="text-slate-400 text-lg mb-10">
            Aetheris connects with your wearables to provide real-time
            correlation between your physical activity and medical health
            queries.
          </p>

          <ul className="space-y-4 mb-10">
            {[
              "Syncs with Apple Health & Google Fit",
              "24/7 Real-time anomaly detection",
              "Personalized nutrition & sleep advice",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-slate-300 font-medium"
              >
                <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                  <CheckCircle size={14} />
                </div>

                {item}
              </li>
            ))}
          </ul>

          <button className="bg-white text-black px-8 py-4 rounded-2xl font-black transition-transform hover:scale-105">
            Explore Integrations
          </button>
        </div>

        <div className="relative lg:ml-auto">
          <div className="w-full aspect-square max-w-md bg-white/5 border border-white/10 rounded-full flex items-center justify-center relative">
            <div className="w-16 h-16 bg-white/10 rounded-full border border-white/20 absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <Smartphone className="text-indigo-400" />
            </div>

            <div className="w-16 h-16 bg-white/10 rounded-full border border-white/20 absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <Zap className="text-yellow-400" />
            </div>

            <div className="w-16 h-16 bg-white/10 rounded-full border border-white/20 absolute left-[-32px] top-1/2 -translate-y-1/2 flex items-center justify-center">
              <Heart className="text-rose-400" />
            </div>

            <div className="w-24 h-24 bg-indigo-600 rounded-full shadow-[0_0_50px_rgba(79,70,229,0.5)] flex items-center justify-center animate-pulse">
              <Activity className="text-white" size={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);


export default InteractivePreview