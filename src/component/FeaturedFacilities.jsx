"use client";

import React, { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  ArrowRight,
  BadgeCheck,
  Trophy,
} from "lucide-react";

const FeaturedFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch("http://localhost:8080/facilities");
        const data = await res.json();
        setFacilities(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-emerald-50 via-white to-green-50">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-black text-gray-900">
          Featured <span className="text-green-600">Facilities</span>
        </h2>
        <p className="text-gray-500 mt-3">
          Discover premium sports venues and book instantly
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {facilities.slice(0, 6).map((item) => (
          <div
            key={item._id}
            className="group bg-white rounded-[28px] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
          >

            {/* IMAGE */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={item.image}
                alt={item.facilityName}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* badge */}
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow">
                <BadgeCheck size={14} />
                Verified
              </div>

              {/* price (NO $ sign) */}
              <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-green-600 shadow">
                ${item.pricePerHour}/hr
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h3 className="text-xl font-bold text-gray-800">
                {item.facilityName}
              </h3>

              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <MapPin size={16} />
                <span className="text-sm">{item.location}</span>
              </div>

              {/* capacity only */}
              <div className="flex items-center gap-2 mt-4 text-gray-600">
                <Trophy size={16} />
                <span className="text-sm">
                  Capacity: {item.capacity}
                </span>
              </div>

              {/* description */}
              <p className="text-sm text-gray-500 mt-4 line-clamp-2">
                {item.description}
              </p>

              {/* button */}
              <button className="mt-5 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
                Book Now
                <ArrowRight size={16} />
              </button>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default FeaturedFacilities;