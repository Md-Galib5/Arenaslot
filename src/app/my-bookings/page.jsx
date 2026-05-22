"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import {
  CalendarDays,
  Clock3,
  Trash2,
  Mail,
  Sparkles,
  Loader2,
  MapPin,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

import { toast } from "react-toastify";

const MyBookings = () => {
  const session = authClient.useSession();
  const user = session.data?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // FETCH BOOKINGS
  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user.id}`
        );

        const data = await res.json();

        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log("FETCH ERROR:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // CANCEL BOOKING
  const handleCancel = async (id) => {
    try {
      setDeletingId(id);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Delete failed");
      }

      setBookings((prev) => prev.filter((b) => b._id !== id));

      toast.success("Booking cancelled successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to cancel booking");
    } finally {
      setDeletingId(null);
    }
  };

  // LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100">
        <Loader2 className="w-12 h-12 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12 px-5">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= USER PROFILE ================= */}
        <div className="lg:sticky lg:top-10 h-fit">

          <div className="relative overflow-hidden rounded-[32px] bg-white border border-green-100 shadow-2xl">

            {/* TOP BG */}
            <div className="h-32 bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 relative">

              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

            </div>

            {/* PROFILE */}
            <div className="px-6 pb-8 relative">

              <div className="-mt-14 flex justify-center">
                <div className="relative">

                  <Image
                    src={user?.image || "/placeholder.jpg"}
                    width={120}
                    height={120}
                    alt="user"
                    className="w-28 h-28 rounded-full border-[6px] border-white shadow-xl object-cover"
                  />

                  <div className="absolute bottom-1 right-1 bg-green-500 p-1 rounded-full border-2 border-white">
                    <BadgeCheck className="w-4 h-4 text-white" />
                  </div>

                </div>
              </div>

              <div className="text-center mt-4">

                <h2 className="text-2xl font-black text-gray-800">
                  {user?.name}
                </h2>

                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
                  <Mail size={15} />
                  {user?.email}
                </div>

              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4 mt-7">

                <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-100">
                  <p className="text-xs text-gray-500 uppercase">
                    Total
                  </p>

                  <h2 className="text-2xl font-black text-green-700">
                    {bookings.length}
                  </h2>

                  <p className="text-xs text-gray-500">
                    Bookings
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-100">
                  <Sparkles className="mx-auto text-emerald-600 mb-1" />

                  <p className="text-sm font-semibold text-emerald-700">
                    Premium User
                  </p>
                </div>

              </div>

              <Link href="/facilities">
                <button className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:opacity-90 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition">

                  Explore Facilities

                  <ArrowRight size={18} />

                </button>
              </Link>

            </div>
          </div>
        </div>

        {/* ================= BOOKINGS SECTION ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* EMPTY */}
          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-14 text-center">

              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CalendarDays className="w-10 h-10 text-green-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-6">
                No Bookings Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Book your favorite sports facility and start playing.
              </p>

              <Link href="/facilities">
                <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-medium">
                  Browse Facilities
                </button>
              </Link>

            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b._id}
                className="group relative overflow-hidden rounded-[30px] bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >

                <div className="flex flex-col md:flex-row">

                  {/* IMAGE */}
                  <div className="relative md:w-[320px] h-[250px] overflow-hidden">

                    <Image
                      src={b.image || "/placeholder.jpg"}
                      alt={b.facilityName}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* BADGE */}
                    <div className="absolute top-4 left-4">

                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow">
                        Confirmed
                      </span>

                    </div>

                    {/* PRICE */}
                    <div className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-2xl shadow-xl">

                      <p className="text-xs opacity-80">
                        Total Price
                      </p>

                      <h2 className="font-black text-lg">
                        ${b.totalPrice}
                      </h2>

                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 p-7">

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <h2 className="text-2xl font-black text-gray-800 group-hover:text-green-600 transition">
                          {b.facilityName}
                        </h2>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                          <MapPin size={15} />
                          Sports Facility Booking
                        </div>
                      </div>

                    </div>

                    {/* INFO CARDS */}
                    <div className="grid grid-cols-2 gap-4 mt-6">

                      <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-green-700">
                          <CalendarDays size={18} />
                          <p className="text-sm font-semibold">
                            Booking Date
                          </p>
                        </div>

                        <p className="mt-2 text-gray-700 font-medium">
                          {b.bookingDate}
                        </p>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-emerald-700">
                          <Clock3 size={18} />
                          <p className="text-sm font-semibold">
                            Duration
                          </p>
                        </div>

                        <p className="mt-2 text-gray-700 font-medium">
                          {b.hours} Hour(s)
                        </p>
                      </div>

                    </div>

                    {/* SLOT */}
                    <div className="mt-5">
                      <p className="text-sm text-gray-500 mb-2">
                        Time Slots
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {b.slots?.map((slot, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {slot}
                          </span>
                        ))}

                      </div>
                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={() => handleCancel(b._id)}
                      disabled={deletingId === b._id}
                      className="mt-7 flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-70 text-white px-5 py-3 rounded-2xl font-semibold transition shadow-lg"
                    >

                      <Trash2 size={18} />

                      {deletingId === b._id
                        ? "Cancelling..."
                        : "Cancel Booking"}

                    </button>

                  </div>
                </div>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};

export default MyBookings;