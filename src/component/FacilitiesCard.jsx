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
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group">

            {/* Image Section */}
            <div className="relative overflow-hidden">

                <Image
                    alt={facilityName}
                    src={image}
                    width={400}
                    height={400}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Facility Type Badge */}
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-xs font-semibold text-gray-700 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">

                    <Trophy size={14} />

                    {facilityType}

                </span>

                {/* Rating Badge */}
                <div className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">

                    <span className="text-sm font-semibold text-gray-800">
                        4.8
                    </span>

                    <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                    />

                </div>
            </div>

            {/* Content */}
            <div className="p-5">

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {facilityName}
                </h2>

                {/* Location */}
                <div className="flex items-center gap-1 mt-2 text-gray-500">

                    <MapPin size={15} />

                    <p className="text-sm">
                        {location}
                    </p>

                </div>

                {/* Capacity */}
                <div className="flex items-center gap-2 mt-4 text-gray-600">

                    <Users size={16} />

                    <span className="text-sm">
                        Up to {capacity} Players
                    </span>

                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between mt-6">

                    {/* Price */}
                    <div>

                        <h3 className="text-2xl font-bold text-blue-600">
                            ${pricePerHour}

                            <span className="text-sm text-gray-500 ml-1">
                                / hour
                            </span>
                        </h3>

                    </div>

                    {/* Book Button */}
                    <NextLink
                        href={`/facilities/${_id}`}
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-700 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                    >

                        <CalendarCheck
                            size={18}
                            className="text-white"
                        />

                        <span className="text-white">
                            Book Now
                        </span>

                    </NextLink>

                </div>
            </div>
        </div>
    );
};

export default FacilitiesCard;