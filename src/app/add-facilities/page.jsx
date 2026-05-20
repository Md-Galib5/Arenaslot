"use client";
import React from "react";

const AddSportFacilityForm = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const facilities = Object.fromEntries(formData.entries());

    console.log("Submitted Data:", facilities);

    try {
      const res = await fetch("http://localhost:8080/facilities", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(facilities),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        // ✅ RESET FORM AFTER SUCCESS
        form.reset();
        alert("Facility added successfully!");
      } else {
        alert("Failed to add facility");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-7xl bg-[#F5F5F5] px-6 py-10">
      <div>
        {/* Title */}
        <h1 className="mb-10 text-2xl font-bold">
          Add Sport Facilities
        </h1>

        {/* Card */}
        <div className="mx-auto w-3xl rounded-none border border-[#E5E5E5] bg-white px-10 py-8 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-6">

            {/* Facility Name */}
            <div>
              <label className="mb-2 block text-[13px] font-medium">
                Facility Name
              </label>
              <input
                name="facilityName"
                type="text"
                required
                placeholder="Elite Sports Arena"
                className="h-[46px] w-full rounded-[2px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 text-[14px]"
              />
            </div>

            {/* Facility Type */}
            <div>
              <label className="mb-2 block text-[13px] font-medium">
                Facility Type
              </label>
              <select
                name="facilityType"
                className="h-[46px] w-full rounded-[2px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 text-[14px]"
              >
                <option value="Football Field">Football Field</option>
                <option value="Basketball Court">Basketball Court</option>
                <option value="Tennis Court">Tennis Court</option>
                <option value="Swimming Pool">Swimming Pool</option>
                <option value="Gym">Gym</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-[13px] font-medium">
                Image Upload (imgbb / postimage link)
              </label>
              <input
                name="image"
                type="text"
                required
                placeholder="Paste image URL here"
                className="h-[46px] w-full rounded-[2px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 text-[14px]"
              />
              <p className="mt-1 text-xs text-gray-400">
                Upload image on imgbb/postimage and paste link here
              </p>
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-[13px] font-medium">
                Location
              </label>
              <input
                name="location"
                type="text"
                required
                placeholder="Budapest, Hungary"
                className="h-[46px] w-full rounded-[2px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 text-[14px]"
              />
            </div>

            {/* Price + Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="mb-2 block text-[13px] font-medium">
                  Price Per Hour ($)
                </label>
                <input
                  name="pricePerHour"
                  type="number"
                  required
                  placeholder="50"
                  className="h-[46px] w-full rounded-[2px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 text-[14px]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium">
                  Capacity
                </label>
                <input
                  name="capacity"
                  type="number"
                  required
                  placeholder="20"
                  className="h-[46px] w-full rounded-[2px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 text-[14px]"
                />
              </div>
            </div>

            {/* Available Time Slots */}
            <div>
              <label className="mb-2 block text-[13px] font-medium">
                Available Time Slots
              </label>
              <input
                name="timeSlots"
                type="text"
                required
                placeholder="08:00-10:00, 10:00-12:00, 18:00-20:00"
                className="h-[46px] w-full rounded-[2px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 text-[14px]"
              />
              <p className="mt-1 text-xs text-gray-400">
                Separate slots with commas
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-[13px] font-medium">
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                placeholder="Describe the facility..."
                className="w-full rounded-[2px] border border-[#E5E5E5] bg-[#F8F8F8] p-4 text-[14px]"
              />
            </div>

            {/* Owner Email (AUTO-FILL) */}
            <div>
              <label className="mb-2 block text-[13px] font-medium">
                Owner Email
              </label>
              <input
                name="ownerEmail"
                type="email"
                value="owner@example.com"
                readOnly
                className="h-[46px] w-full rounded-[2px] border border-[#E5E5E5] bg-[#EDEDED] px-4 text-[14px]"
              />
              <p className="mt-1 text-xs text-gray-400">
                Auto-filled from logged-in user
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                className="h-[44px] rounded-[2px] border border-red-500 px-6 text-[14px] text-red-500 hover:bg-red-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="h-[44px] rounded-[2px] bg-[#15A1BF] px-7 text-[14px] text-white hover:bg-[#128DA8]"
              >
                Add Facility
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSportFacilityForm;