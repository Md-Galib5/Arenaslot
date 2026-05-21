"use client";

import React from "react";
import {
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaTrophy,
  FaMapMarkerAlt,
  FaSmile,
} from "react-icons/fa";

const features = [
  {
    icon: FaShieldAlt,
    title: "Secure Booking",
    desc: "Safe and verified facility reservations with full protection.",
  },
  {
    icon: FaClock,
    title: "Instant Confirmation",
    desc: "Get real-time booking confirmation without waiting.",
  },
  {
    icon: FaUsers,
    title: "Trusted Community",
    desc: "Thousands of verified users trust our platform daily.",
  },
  {
    icon: FaTrophy,
    title: "Top Facilities",
    desc: "Access premium-rated sports grounds and courts.",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Easy Discovery",
    desc: "Find nearby sports venues instantly with smart search.",
  },
  {
    icon: FaSmile,
    title: "User Friendly",
    desc: "Simple UI designed for smooth booking experience.",
  },
];

const ChooseUs = () => {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-green-50 via-white to-emerald-100 overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-green-300/20 blur-3xl rounded-full -translate-x-1/2" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Why Choose <span className="text-green-600">Us</span>
        </h2>
        <p className="text-gray-600 mt-4">
          We provide a modern sports booking experience with trust, speed, and convenience.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {features.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="group relative bg-white/70 backdrop-blur-xl border border-green-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >

              {/* green glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-200/20 to-emerald-300/10 opacity-0 group-hover:opacity-100 transition" />

              {/* ICON */}
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md group-hover:scale-110 transition">
                <Icon size={22} />
              </div>

              {/* TEXT */}
              <h3 className="text-xl font-bold text-gray-800 mt-5">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {item.desc}
              </p>

              {/* bottom accent */}
              <div className="mt-6 h-1 w-12 bg-green-500 rounded-full group-hover:w-20 transition-all" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ChooseUs;