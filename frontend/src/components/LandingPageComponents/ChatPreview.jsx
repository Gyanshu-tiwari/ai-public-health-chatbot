import React from 'react'
import {
  Activity,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useState } from 'react';

const ChatPreview = () => {
  const [messages] = useState([
    { role: "user", content: "I've had a persistent cough for 3 days." },

    {
      role: "ai",
      content:
        "I understand. Is the cough dry, or is it producing phlegm? Are you experiencing any other symptoms like fever or shortness of breath?",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
            <Activity className="text-white" size={20} />
          </div>

          <div>
            <h4 className="text-sm font-bold text-white">Aetheris HealthBot</h4>

            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />

              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                Always Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Lock size={14} className="text-slate-500" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                m.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-white/10 border border-white/10 text-slate-300 rounded-tl-none"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-black/20 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
        <span className="text-slate-500 text-xs">
          Analyze these symptoms...
        </span>

        <button className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};


export default ChatPreview;