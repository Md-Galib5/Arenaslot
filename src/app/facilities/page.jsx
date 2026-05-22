"use client";

import { useEffect, useState } from "react";
import FacilitiesCard from "@/component/FacilitiesCard";
import { Search, Filter } from "lucide-react";

const AllFacilities = () => {
  const [facilities, setFacilities] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        let url = "http://localhost:8080/facilities?";

        // SEARCH
        if (search) {
          url += `search=${search}&`;
        }

        // FILTER
        if (filter) {
          url += `type=${filter}`;
        }

        const res = await fetch(url);

        const data = await res.json();

        setFacilities(data);

      } catch (error) {
        console.log(error);
        setFacilities([]);
      }
    };

    fetchFacilities();

  }, [search, filter]);

  return (
    <div className="w-11/12 mx-auto my-10 space-y-8">

      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            All Facilities
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {facilities.length} facilit
            {facilities.length !== 1 ? "ies" : "y"} available
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-4">

          {/* SEARCH */}
          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search facility..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-72"
            />

          </div>

          {/* FILTER */}
          <div className="relative">

            <Filter
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white w-full sm:w-60"
            >
              <option value="">
                All Types
              </option>

              <option value="Football Field">
                Football Field
              </option>

              <option value="Basketball Court">
                Basketball Court
              </option>

              <option value="Cricket Ground">
                Cricket Ground
              </option>

              <option value="Tennis Court">
                Tennis Court
              </option>

              <option value="Gym">
                Gym
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* EMPTY */}
      {facilities.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50">

          <p className="text-gray-500 text-lg">
            No facilities found
          </p>

        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {facilities.map((facility) => (
            <FacilitiesCard
              key={facility._id}
              facility={facility}
            />
          ))}

        </div>
      )}

    </div>
  );
};

export default AllFacilities;