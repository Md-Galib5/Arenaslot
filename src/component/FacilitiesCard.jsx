import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';

import {
    MapPin,
    Users,
    CalendarCheck,
    Trophy,
    Star,
} from 'lucide-react';

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
    <div className="group relative overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-emerald-100/60 transition-all duration-500 hover:-translate-y-2">

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-green-100/0 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition duration-500 z-0" />

        {/* IMAGE SECTION */}
        <div className="relative overflow-hidden h-60">

            <Image
                alt={facilityName}
                src={image}
                width={500}
                height={500}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

       
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

    
            <div className="absolute top-4 left-4">

                <span className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-semibold text-emerald-700 shadow-lg border border-white/40">

                    <Trophy size={14} />

                    {facilityType}

                </span>

            </div>

            <div className="absolute bottom-4 right-4">

                <div className="rounded-2xl bg-emerald-500 px-4 py-2 text-white shadow-xl">

                    <p className="text-xs opacity-90">
                        Price / Hour
                    </p>

                    <h2 className="text-2xl font-bold">
                        ${pricePerHour}
                    </h2>

                </div>

            </div>

        </div>

        <div className="relative p-6 z-10">

            <div>

                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition duration-300">

                    {facilityName}

                </h2>

            </div>

            <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

                        <MapPin size={18} />

                    </div>

                    <div>

                        <p className="text-xs text-gray-400">
                            Location
                        </p>

                        <p className="text-sm font-semibold text-gray-700">
                            {location}
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">

                        <Users size={18} />

                    </div>

                    <div>

                        <p className="text-xs text-gray-400">
                            Capacity
                        </p>

                        <p className="text-sm font-semibold text-gray-700">
                            Up to {capacity} Players
                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-6">

                <NextLink
                    href={`/facilities/${_id}`}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all duration-300 hover:scale-[1.02]"
                >

                    <CalendarCheck size={18} />

                    Book Now

                </NextLink>

            </div>

        </div>

    </div>
);
};

export default FacilitiesCard;