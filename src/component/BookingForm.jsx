"use client";

import { authClient } from "@/lib/auth-client";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const BookingForm = ({
  facility,
  image,
  facilityName,
  pricePerHour,
  slotsArray,
}) => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedSubSlots, setSelectedSubSlots] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);

  const userData = authClient.useSession();
  const user = userData.data?.user;

  // TIME HELPERS
  const toMinutes = (t) => {
    if (!t || typeof t !== "string") return 0;

    const parts = t.split(":");
    if (parts.length !== 2) return 0;

    const [h, m] = parts.map(Number);
    return h * 60 + m;
  };

  const toTime = (mins) => {
    const h = String(Math.floor(mins / 60)).padStart(2, "0");
    const m = String(mins % 60).padStart(2, "0");
    return `${h}:${m}`;
  };

  // EXPAND SLOT (FIXED SPLIT LOGIC)
  const expandedSlots = useMemo(() => {
    if (!selectedSlot) return [];

    const parts = selectedSlot.split("-");

    if (parts.length !== 2) return [];

    const startStr = parts[0]?.trim();
    const endStr = parts[1]?.trim();

    const start = toMinutes(startStr);
    const end = toMinutes(endStr);

    if (!startStr || !endStr || start >= end) return [];

    const result = [];
    let current = start;

    while (current + 60 <= end) {
      const next = current + 60;
      result.push(`${toTime(current)}-${toTime(next)}`);
      current = next;
    }

    return result;
  }, [selectedSlot]);

  // TOGGLE SLOT
  const toggleSlot = (slot) => {
    setSelectedSubSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  };

  const totalPrice = selectedSubSlots.length * Number(pricePerHour || 0);

  // BOOKING
  const handleBooking = async () => {
    if (!user) return toast.error("Please login first ❌");
    if (!bookingDate) return toast.error("Select booking date ❌");
    if (selectedSubSlots.length === 0)
      return toast.error("Select at least one slot ❌");

    const bookingData = {
      facilityId: facility._id,
      facilityName,
      image,
      bookingDate,
      slots: selectedSubSlots,
      hours: selectedSubSlots.length,
      totalPrice,
      userId: user?.id,
      userEmail: user?.email,
      userName: user?.name,
      userImage: user?.image,
    };

    const toastId = toast.loading("Booking facility...");

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        return toast.update(toastId, {
          render: data?.message || "Booking failed ❌",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }

      toast.update(toastId, {
        render: "Booking successful 🎉",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setSelectedSlot("");
      setSelectedSubSlots([]);
      setBookingDate("");
    } catch (error) {
      console.log(error);
      setLoading(false);

      toast.update(toastId, {
        render: "Something went wrong ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl shadow-lg overflow-hidden flex flex-col">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
        <h2 className="text-2xl font-bold">Book Your Facility</h2>
        <p className="text-green-100 text-sm mt-1">
          Select available slots and confirm your booking instantly
        </p>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-6 flex-1 overflow-y-auto">

        {/* FACILITY */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Facility Name
          </label>

          <div className="mt-2 px-4 py-3 rounded-xl bg-gray-50 border text-gray-800 font-medium">
            {facilityName}
          </div>
        </div>

        {/* DATE */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Booking Date
          </label>

          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="mt-2 w-full h-12 px-4 rounded-xl border focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* SLOT */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Available Time Slots
          </label>

          <select
            value={selectedSlot}
            className="mt-2 w-full h-12 px-4 rounded-xl border focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(e) => {
              setSelectedSlot(e.target.value);
              setSelectedSubSlots([]);
            }}
          >
            <option value="">Choose a slot</option>
            {slotsArray.map((slot, i) => (
              <option key={i} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* SUB SLOTS */}
        {expandedSlots.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-600">
                Select Hours
              </label>
              <span className="text-xs text-gray-400">
                Click to select multiple
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {expandedSlots.map((slot, i) => {
                const active = selectedSubSlots.includes(slot);

                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => toggleSlot(slot)}
                    className={`h-11 rounded-xl text-sm font-medium transition-all border ${
                      active
                        ? "bg-green-500 text-white border-green-500 shadow-md scale-[1.02]"
                        : "bg-white text-gray-700 hover:border-green-400 hover:text-green-600"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TOTAL */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border rounded-2xl p-5 flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">Total Price</p>
            <p className="text-xs text-gray-400">
              {selectedSubSlots.length} hour(s) selected
            </p>
          </div>

          <div className="text-3xl font-bold text-green-600">
            ${totalPrice}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-6 border-t">
        <button
          type="button"
          onClick={handleBooking}
          disabled={selectedSubSlots.length === 0 || loading}
          className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold transition-all shadow-md"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default BookingForm;