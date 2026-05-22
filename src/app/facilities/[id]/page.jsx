import React from "react";
import BookingForm from "@/component/BookingForm";
import Image from "next/image";
import Link from "next/link";

const DetailsPage = async ({ params }) => {
    const { id } = await params;
    console.log(id)

    const res = await fetch(
        `http://localhost:8080/facilities/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold text-red-500">
                    Failed to load facility
                </h1>
            </div>
        );
    }

    const facility = await res.json();

    if (!facility) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold text-red-500">
                    Facility Not Found
                </h1>
            </div>
        );
    }

    const {
        facilityName,
        facilityType,
        image,
        location,
        pricePerHour,
        capacity,
        description,
        timeSlots: availableSlots,
    } = facility;

    const slotsArray = Array.isArray(availableSlots)
        ? availableSlots
        : typeof availableSlots === "string"
        ? availableSlots.split(",")
        : [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10">
            <div className="w-11/12 max-w-6xl mx-auto">

                <Link
                    href="/facilities"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 text-white text-sm font-semibold shadow-sm hover:bg-green-600 hover:shadow-md hover:-translate-x-1 transition-all duration-200"
                >
                    <span className="text-lg leading-none">←</span>
                    Back to Facilities
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-5">

                    {/* Left Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">

                        <div className="relative w-full h-[260px] sm:h-[420px]">
                            <Image
                                src={image}
                                alt={facilityName}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        </div>

                        <div className="p-7 sm:p-10 space-y-7 flex-1">

                            <div>
                                <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                                    {facilityType}
                                </span>

                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
                                    {facilityName}
                                </h1>

                                <div className="flex flex-wrap gap-4 mt-4 text-gray-500 text-sm">
                                    <p>📍 {location}</p>
                                    <p>👥 {capacity} people</p>
                                </div>
                            </div>

                            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Price</p>
                                    <p className="text-xs text-gray-400">per hour</p>
                                </div>

                                <div className="text-3xl font-bold text-green-600">
                                    ${pricePerHour}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    About this facility
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Available slots
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {slotsArray.map((slot, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200 hover:bg-green-50 hover:text-green-700 transition"
                                        >
                                            {slot.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="h-full">
                        <BookingForm
  facility={facility}
  facilityName={facilityName}
  image={image}
  pricePerHour={pricePerHour}
  slotsArray={slotsArray}
/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DetailsPage;

// import React from 'react';

// const DetailsPage = async({params}) => {
//   const {id} = await params
//   return (
//     <div>
      
//     </div>
//   );
// };

// export default DetailsPage;