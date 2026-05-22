"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const AddSportFacilityForm = () => {
  const session = authClient.useSession();
  const user = session.data?.user;

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const facilities = Object.fromEntries(formData.entries());

    facilities.ownerEmail = user?.email;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(facilities),
        }
      );

      if (res.ok) {
        form.reset();
        toast.success("Facility added successfully!");
      } else {
        toast.error("Failed to add facility");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 sm:px-6 lg:px-10 py-8 sm:py-12">

      {/* TITLE */}
      <h1 className="mb-6 sm:mb-10 text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
        Add Sport Facility
      </h1>

      {/* FORM CARD */}
      <div className="mx-auto w-full max-w-3xl bg-white rounded-2xl border border-gray-100 px-5 sm:px-8 lg:px-10 py-8 shadow-sm">

        <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">

          {/* Facility Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Facility Name
            </label>
            <input
              name="facilityName"
              type="text"
              required
              placeholder="Elite Sports Arena"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Facility Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Facility Type
            </label>
            <select
              name="facilityType"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              name="image"
              type="text"
              required
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              name="location"
              type="text"
              required
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* PRICE + CAPACITY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

            <input
              name="pricePerHour"
              type="number"
              placeholder="Price Per Hour"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              name="capacity"
              type="number"
              placeholder="Capacity"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* TIME SLOTS */}
          <div>
            <input
              name="timeSlots"
              placeholder="Time slots (e.g. 10:00-12:00)"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <textarea
              name="description"
              rows={4}
              placeholder="Write facility description..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* OWNER EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Owner Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 text-sm text-gray-500"
            />
          </div>

          {/* BUTTON */}
          <div className="pt-2 sm:pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto h-11 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition"
            >
              Add Facility
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddSportFacilityForm;