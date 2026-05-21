"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";

const AddSportFacilityForm = () => {
  const session = authClient.useSession();
  const user = session.data?.user;

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const facilities = Object.fromEntries(formData.entries());

    // ✅ override with logged-in user email
    facilities.ownerEmail = user?.email;

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
        <h1 className="mb-10 text-2xl font-bold">
          Add Sport Facilities
        </h1>

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

            {/* Image */}
            <div>
              <label className="mb-2 block text-[13px] font-medium">
                Image URL
              </label>
              <input
                name="image"
                type="text"
                required
                className="h-[46px] w-full rounded-[2px] border px-4 text-[14px]"
              />
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
                className="h-[46px] w-full rounded-[2px] border px-4 text-[14px]"
              />
            </div>

            {/* Price + Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                name="pricePerHour"
                type="number"
                placeholder="Price Per Hour"
                className="h-[46px] border px-4 rounded-[2px]"
              />

              <input
                name="capacity"
                type="number"
                placeholder="Capacity"
                className="h-[46px] border px-4 rounded-[2px]"
              />
            </div>

            {/* Slots */}
            <div>
              <input
                name="timeSlots"
                placeholder="Time slots"
                className="h-[46px] w-full border px-4 rounded-[2px]"
              />
            </div>

            {/* Description */}
            <textarea
              name="description"
              rows={4}
              className="w-full border p-4 rounded-[2px]"
            />

            {/* OWNER EMAIL (AUTO) */}
            <div>
              <label className="mb-2 block text-[13px] font-medium">
                Owner Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="h-[46px] w-full bg-gray-100 border px-4 rounded-[2px]"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="submit"
                className="h-[44px] bg-green-600 text-white px-6 rounded-[2px]"
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