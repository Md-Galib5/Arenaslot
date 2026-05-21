"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Hourglass,
  Mail,
  User,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";

const MyBookings = () => {
  const session = authClient.useSession();
  const user = session.data?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/bookings/${user.id}`
        );
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // UI delete (frontend only)
  const handleDelete = async () => {
    if (!selectedBooking) return;

    setLoadingId(selectedBooking._id);

    // simulate API delay (since you said no backend work)
    setTimeout(() => {
      setBookings((prev) =>
        prev.filter((b) => b._id !== selectedBooking._id)
      );

      setLoadingId(null);
      setShowDeleteModal(false);
      setSelectedBooking(null);
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12 px-6">

      {/* LAYOUT */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* ================= LEFT USER PANEL ================= */}
        <div className="lg:w-1/3 lg:sticky lg:top-10 h-fit">

          <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-3xl shadow-2xl p-8 text-center">

            <h2 className="text-sm uppercase tracking-widest opacity-80">
              User Profile
            </h2>

            <img
              src={
                user?.image ||
                "https://i.ibb.co/2kR1YkS/user.png"
              }
              className="w-28 h-28 rounded-full border-4 border-white mx-auto mt-6 shadow-lg object-cover"
            />

            <h3 className="text-2xl font-bold mt-4">
              {user?.name}
            </h3>

            <div className="flex items-center justify-center gap-2 mt-2 text-sm opacity-90">
              <Mail size={16} />
              {user?.email}
            </div>

            <div className="mt-6 bg-white/10 rounded-2xl p-4">
              <p className="text-sm opacity-80">Total Bookings</p>
              <h2 className="text-3xl font-black">
                {bookings.length}
              </h2>
            </div>
          </div>
        </div>

        {/* ================= RIGHT BOOKINGS ================= */}
        <div className="lg:w-2/3 space-y-6">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition"
            >

              {/* TOP */}
              <div className="flex flex-col md:flex-row">

                {/* IMAGE */}
                <img
                  src={
                    booking.image ||
                    "https://images.unsplash.com/photo-1547347298-4074fc3086f0"
                  }
                  className="w-full md:w-56 h-48 object-cover"
                />

                {/* INFO */}
                <div className="p-6 flex-1">

                  <div className="flex justify-between items-start">

                    <h2 className="text-2xl font-bold text-gray-800">
                      {booking.facilityName}
                    </h2>

                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1">
                      <Hourglass size={14} />
                      Pending
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <MapPin size={16} />
                    Sports Facility
                  </div>

                  {/* GRID */}
                  <div className="grid grid-cols-2 gap-4 mt-5">

                    <div className="bg-green-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-green-700">
                        <CalendarDays size={16} />
                        Date
                      </div>
                      <p className="font-semibold">
                        {booking.bookingDate}
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Clock3 size={16} />
                        Hours
                      </div>
                      <p className="font-semibold">
                        {booking.hours}
                      </p>
                    </div>

                  </div>

                  {/* SLOTS */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {booking.slots?.map((slot, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>

                  {/* ACTION */}
                  <div className="mt-6 flex justify-end">

                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowDeleteModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
                    >
                      <Trash2 size={16} />
                      Cancel Booking
                    </button>

                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-md rounded-3xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b">

              <div className="flex items-center gap-2">
                <AlertTriangle className="text-red-500" />
                <div>
                  <h2 className="text-lg font-bold">
                    Cancel Booking
                  </h2>
                  <p className="text-sm text-gray-500">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X />
              </button>

            </div>

            {/* BODY */}
            <div className="p-6">

              <p className="text-gray-600">
                Are you sure you want to cancel booking for{" "}
                <span className="font-semibold text-gray-900">
                  {selectedBooking.facilityName}
                </span>
                ?
              </p>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-8">

                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 h-12 border rounded-xl hover:bg-gray-50"
                >
                  Keep Booking
                </button>

                <button
                  onClick={handleDelete}
                  disabled={loadingId === selectedBooking._id}
                  className="flex-1 h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  {loadingId === selectedBooking._id
                    ? "Cancelling..."
                    : "Yes, Cancel"}
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyBookings;