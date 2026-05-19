import FacilitiesCard from '@/component/FacilitiesCard';
import React from 'react';

const AllFacilities = async() => {
    const result = await fetch('http://localhost:8080/facilities')
    const facilities = await result.json(result)

    // console.log(facilities);
    return (
        <div className='max-w-7xl mx-auto'>
            <h1 className='text-2xl font-bold mb-5 mt-5'>All Facilities</h1>

            <div className='grid grid-cols-3 gap-4'>
                {
                    facilities.map(facilities =>
                        <FacilitiesCard key={facilities._id} facilities={facilities} />
                     )
                }
            </div>
        </div>
    );
};

export default AllFacilities;