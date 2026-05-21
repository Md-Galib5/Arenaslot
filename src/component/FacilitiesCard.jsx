"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { MapPin, Users, ArrowRight, Sparkles } from "lucide-react";

const FacilitiesCard = ({ facilities }) => {
  const {
    _id,
    facilityName,
    facilityType,
    image,
    location,
    pricePerHour,
    capacity,
  } = facilities;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={facilityName}
          fill
          className="object-cover group-hover:scale-110 transition duration-700"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* badge */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-green-700">
            <Sparkles size={14} />
            {facilityType}
          </span>
        </div>

        {/* price */}
        <div className="absolute bottom-3 right-3 bg-green-600 text-white px-3 py-2 rounded-xl shadow-lg">
          <p className="text-xs">Price</p>
          <p className="font-bold">${pricePerHour}/hr</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition">
          {facilityName}
        </h2>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin size={14} />
          {location}
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Users size={14} />
          Capacity: {capacity}
        </div>

        {/* BUTTON */}
        <Link href={`/facilities/${_id}`}>
          <button className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition">
            Book Now
            <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FacilitiesCard;