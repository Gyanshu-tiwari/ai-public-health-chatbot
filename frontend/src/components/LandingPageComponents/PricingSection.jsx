import React from 'react'
import {
  CheckCircle, 
} from "lucide-react";

const PricingSection = () => (
  <section id="pricing" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Simple, Transparent Pricing
        </h2>

        <p className="text-slate-400">Start for free, upgrade as you grow.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <PricingCard
          title="Basic"
          price="0"
          credits= "100"
          features={[
            "Limited Chats",
            "Standard support",
            "Basic Health Logs",
            "Secure Data Storage",
          ]}
        />

        <PricingCard
          title="Pro"
          price="19"
          premium
          credits="500"
          features={[
            "500+ Chats",
            "AI Specialist Insights",
            "Wearable Sync",
            "Family Sharing",
          ]}
        />
      </div>
    </div>
  </section>
);

const PricingCard = ({ title, price, features, premium = false }) => (
  <div
    className={`p-10 rounded-[2.5rem] border ${
      premium
        ? "border-indigo-500 bg-indigo-500/5"
        : "border-white/5 bg-white/[0.02]"
    } relative`}
  >
    {premium && (
      <div className="absolute top-0 right-10 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
        Most Popular
      </div>
    )}

    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>

    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-bold text-white">${price}</span>

      <span className="text-slate-500 text-sm">/month</span>
    </div>

    <ul className="space-y-4 mb-10">
      {features.map((f, i) => (
        <li
          key={i}
          className="flex items-center gap-3 text-sm text-slate-300 font-medium"
        >
          <CheckCircle size={16} className="text-indigo-400" /> {f}
        </li>
      ))}
    </ul>

    <button
      className={`w-full py-4 rounded-2xl font-bold transition-all ${
        premium
          ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-500"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      Choose {title}
    </button>
  </div>
);


export default PricingSection