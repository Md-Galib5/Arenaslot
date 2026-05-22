"use client";

import React from "react";
import Image from "next/image";
import IMG from "../../public/Assests/arenaslot-logo.png";

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Camera,
  Send,
  Play,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Image
              src={IMG}
              alt="ArenaSlot"
              width={140}
              height={140}
              className="w-[120px]"
            />
          </div>

          <p className="text-sm text-white/70 leading-relaxed">
            ArenaSlot is your all-in-one sports facility booking platform.
            Book football grounds, basketball courts, tennis courts, and more instantly.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-xl font-bold mb-5">
            Contact Information
          </h2>

          <div className="space-y-4 text-sm text-white/80">

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>Dhaka, Bangladesh</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>+880 1234 567 890</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>support@arenaslot.com</span>
            </div>

          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h2 className="text-xl font-bold mb-5">
            Social Links
          </h2>

          <div className="flex gap-4">

            <a className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition">
              <Globe size={18} />
            </a>

            <a className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition">
              <Camera size={18} />
            </a>

            <a className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition">
              <Send size={18} />
            </a>

            <a className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition">
              <Play size={18} />
            </a>

          </div>

          <p className="text-sm text-white/70 mt-6">
            Follow us for updates, offers & sports events.
          </p>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        © {new Date().getFullYear()} ArenaSlot. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;