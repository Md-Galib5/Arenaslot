"use client";

import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-100 px-6">

      <div className="text-center max-w-md">

        <h1 className="text-[120px] font-extrabold text-green-600 leading-none">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-2">
          The page you are looking for does not exist.
        </p>

        <div className="flex gap-3 justify-center mt-6">

          <Link href="/">
            <button className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl">
              <Home size={18} />
              Home
            </button>
          </Link>

          <Link href="/facilities">
            <button className="flex items-center gap-2 px-5 py-3 border border-green-500 text-green-600 rounded-xl">
              <Search size={18} />
              Explore
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}