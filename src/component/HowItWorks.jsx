"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, ShieldCheck, Trophy } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Find Facility",
      desc: "Discover sports venues near you in seconds.",
    },
    {
      icon: CalendarCheck,
      title: "Book Slot",
      desc: "Pick your date and available time easily.",
    },
    {
      icon: ShieldCheck,
      title: "Confirm Securely",
      desc: "Safe and instant booking confirmation.",
    },
    {
      icon: Trophy,
      title: "Play & Enjoy",
      desc: "Walk in and enjoy your game hassle-free.",
    },
  ];

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">

      {/* soft green glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-400/10 blur-3xl rounded-full" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          How It <span className="text-green-600">Works</span>
        </h2>
        <p className="text-gray-600 mt-4">
          A smooth booking journey designed for speed and simplicity.
        </p>
      </div>

      {/* FLOW */}
      <div className="relative max-w-6xl mx-auto">

        {/* line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-green-300/60 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">

          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="flex flex-col text-center"
              >

                {/* ICON */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-green-100 border border-green-200 text-green-600 shadow-sm hover:bg-green-200 transition">
                    <Icon size={24} />
                  </div>
                </div>

                {/* CARD */}
                <div className="bg-white/70 backdrop-blur-xl border border-green-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">

                  <div className="text-xs font-bold text-green-600 mb-2 tracking-wide">
                    STEP {i + 1}
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                </div>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;