"use client";

import { useEffect, useState } from "react";
import FacilitiesCard from "@/component/FacilitiesCard";
import { Search, Filter } from "lucide-react";

const AllFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

        if (!baseUrl) {
          console.error("Missing NEXT_PUBLIC_SERVER_URL");
          return;
        }

        const query = new URLSearchParams();

        if (search.trim()) query.set("search", search.trim());
        if (type) query.set("type", type);

        const url = `${baseUrl}/facilities?${query.toString()}`;
        const res = await fetch(url);

        const data = await res.json();

        setFacilities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("FETCH ERROR:", error);
        setFacilities([]);
      }
    };

    fetchFacilities();
  }, [search, type]);

  return (
    <div className="w-11/12 mx-auto my-10 space-y-8">

      {/* UI SAME */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold text-green-600">
            All Facilities
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {facilities.length} facility available
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search facility..."
              className="pl-10 pr-4 py-3 border rounded-xl w-full sm:w-72"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="pl-10 pr-4 py-3 border rounded-xl w-full sm:w-60"
            >
              <option value="">All Types</option>
              <option value="Football Field">Football Field</option>
              <option value="Basketball Court">Basketball Court</option>
              <option value="Swimming Pool">Swimming Pool</option>
              <option value="Tennis Court">Tennis Court</option>
              <option value="Gym">Gym</option>
            </select>
          </div>

        </div>
      </div>

      {/* LIST */}
      {facilities.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">No facilities found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {facilities.map((facility) => (
            <FacilitiesCard key={facility._id} facility={facility} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFacilities;