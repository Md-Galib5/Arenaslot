"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FacilitiesCard from "@/component/FacilitiesCard";
import { Search, Filter, Sparkles } from "lucide-react";

const AllFacilities = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const fetchFacilities = async (searchVal, typeVal) => {
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      const url = `${baseUrl}/facilities?search=${encodeURIComponent(
        searchVal || ""
      )}&type=${encodeURIComponent(typeVal || "")}`;

      const res = await fetch(url);
      const data = await res.json();

      setFacilities(data || []);
    } catch (err) {
      console.log(err);
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlSearch = searchParams?.get("search") || "";
    const urlType = searchParams?.get("type") || "";

    setSearch(urlSearch);
    setType(urlType);

    fetchFacilities(urlSearch, urlType);
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(
      `/facilities?search=${encodeURIComponent(search)}&type=${encodeURIComponent(type)}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-xl border border-emerald-100 shadow-xl rounded-3xl p-6 md:p-8 mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center gap-2">
                <Sparkles className="text-emerald-500" />
                All Facilities
              </h1>

              <p className="text-gray-500 mt-1">
                Find and book your favorite sports place easily
              </p>
            </div>

            <div className="flex gap-3 text-sm">
              <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 font-medium">
                {facilities.length} Available
              </div>

              <div className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600">
                Live Search
              </div>
            </div>

          </div>

          {/* SEARCH + FILTER */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3"
          >

            {/* SEARCH */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, location..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            {/* FILTER */}
            <div className="md:col-span-3 relative">
              <Filter className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
              >
                <option value="">All Sports</option>
                <option value="Football Field">Football</option>
                <option value="Basketball Court">Basketball</option>
                <option value="Tennis Court">Tennis</option>
                <option value="Swimming Pool">Swimming</option>
                <option value="Gym">Gym</option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="md:col-span-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-2xl py-3 hover:scale-105 transition"
            >
              Apply Filters
            </button>

          </form>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20 text-gray-500">
            Loading facilities...
          </div>
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
              <div className="col-span-full text-center text-gray-500">
                No facilities found
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default AllFacilities;