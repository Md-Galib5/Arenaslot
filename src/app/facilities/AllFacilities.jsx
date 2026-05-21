"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FacilitiesCard from "@/component/FacilitiesCard";

const AllFacilities = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  // FETCH FUNCTION
  const fetchFacilities = async (searchVal, typeVal) => {
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_SERVER_URL is missing");
      }

      const url = `${baseUrl}/facilities?search=${encodeURIComponent(
        searchVal || ""
      )}&type=${encodeURIComponent(typeVal || "")}`;

      const res = await fetch(url);

      const data = await res.json();
      setFacilities(data || []);
    } catch (err) {
      console.log("FETCH ERROR:", err);
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  // READ URL + FETCH DATA (SAFE WAY)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlType = searchParams.get("type") || "";

    setSearch(urlSearch);
    setType(urlType);

    fetchFacilities(urlSearch, urlType);
  }, [searchParams]);

  // APPLY FILTER
  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(
      `/facilities?search=${encodeURIComponent(search)}&type=${encodeURIComponent(type)}`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          All Facilities
        </h1>

        {/* SEARCH + FILTER */}
        <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search facilities..."
            className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Sports</option>
            <option value="Football Field">Football</option>
            <option value="Basketball Court">Basketball</option>
            <option value="Tennis Court">Tennis</option>
            <option value="Swimming Pool">Swimming</option>
            <option value="Gym">Gym</option>
          </select>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-medium"
          >
            Apply
          </button>

        </form>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500 py-10">
          Loading facilities...
        </p>
      )}

      {/* GRID */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {facilities.length > 0 ? (
            facilities.map((facility) => (
              <FacilitiesCard
                key={facility._id}
                facilities={facility}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No facilities found
            </p>
          )}

        </div>
      )}

    </div>
  );
};

export default AllFacilities;