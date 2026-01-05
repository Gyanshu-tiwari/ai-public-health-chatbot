import React from 'react'
import {
  Star,
  Quote,
} from "lucide-react";
import { motion } from 'framer-motion';


const ReviewsSection = () => {
  const reviews = [
    {
      name: "Dr. Sarah Chen",
      role: "MD, Internal Medicine",
      text: "Aetheris has completely transformed how I track patient symptoms. The AI's accuracy in preliminary diagnosis is remarkably helpful.",
      img: "https://i.pravatar.cc/150?u=sarah",
    },

    {
      name: "Mark Williams",
      role: "Fitness Coach",
      text: "The wearable integration is a game-changer. Seeing how my recovery metrics correlate with my daily health queries is fascinating.",
      img: "https://i.pravatar.cc/150?u=mark",
    },

    {
      name: "Elena Rodriguez",
      role: "Health Enthusiast",
      text: "I've tried many health apps, but Aetheris's chat interface is the most intuitive. It feels like talking to a real professional who knows my history.",
      img: "https://i.pravatar.cc/150?u=elena",
    },

    {
      name: "James Patterson",
      role: "Tech Executive",
      text: "Privacy was my main concern. Knowing my medical data is encrypted and secure while getting instant insights gives me real peace of mind.",
      img: "https://i.pravatar.cc/150?u=james",
    },
  ];

  return (
    <section id="reviews" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 italic">
            "The future of preventative care."
          </h2>

          <div className="flex justify-center gap-1 text-yellow-500 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={20} fill="currentColor" />
            ))}
          </div>

          <p className="text-slate-400">
            Trusted by 500+ clinics and over 10,000 active users.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-md border border-white/10 flex flex-col justify-between group hover:bg-white/[0.05] transition-all"
            >
              <div className="mb-6 relative">
                <Quote className="absolute -top-4 -left-4 text-white/5 w-12 h-12" />

                <p className="text-slate-300 italic leading-relaxed relative z-10">
                  "{r.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-12 h-12 rounded-full border border-white/20"
                />

                <div>
                  <h4 className="text-sm font-bold text-white">{r.name}</h4>

                  <p className="text-[11px] text-slate-500 uppercase tracking-widest">
                    {r.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ReviewsSection