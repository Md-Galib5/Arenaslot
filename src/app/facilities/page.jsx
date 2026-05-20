import FacilitiesCard from '@/component/FacilitiesCard';
import React from 'react';

const AllFacilities = async () => {

    const result = await fetch(
        'http://localhost:8080/facilities',
        {
            cache: "no-store",
        }
    );

    const facilities = await result.json();

    return (

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                All Facilities
            </h1>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {facilities.map((facility) => (

                    <FacilitiesCard
                        key={facility._id}
                        facilities={facility}
                    />

                ))}

            </div>

        </div>
    );
};

export default AllFacilities;