import React from 'react'
import {
  Stethoscope,
  Pill,
  ClipboardList,
  Lock,
} from "lucide-react";
import { motion } from 'framer-motion';


const FeaturesGrid = () => {
  const features = [
    {
      icon: <Stethoscope />,
      title: "Symptom Checker",
      desc: "Clinically-backed insights for any ailment instantly.",
    },

    {
      icon: <Pill />,
      title: "Medication Reminders",
      desc: "Never miss a dose with smart adaptive notifications.",
    },

    {
      icon: <ClipboardList />,
      title: "Health Journal",
      desc: "Keep track of your vitals and mood trends over time.",
    },

    {
      icon: <Lock />,
      title: "Secure Data",
      desc: "Bank-level encryption for your most sensitive medical info.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Powerful Features for <br /> Your Better Self
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Our AI engine works around the clock to ensure you have the best
            medical support at the tip of your fingers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all group"
            >
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>

              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid