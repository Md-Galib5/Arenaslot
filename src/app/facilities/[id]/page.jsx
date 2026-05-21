import BookingForm from "@/component/BookingForm";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

const DetailsPage = async ({ params }) => {
  const { id } = params;

  // ✅ get session instead of token (server-safe)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // ⚠️ IMPORTANT:
  // Only send token if your backend REALLY requires it
  const token = session?.session?.token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`,
    {
      headers: token
        ? {
            authorization: `Bearer ${token}`,
          }
        : {},
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold text-red-500">
          Failed to load facility
        </h1>
      </div>
    );
  }

  const facility = await res.json();

  if (!facility) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold text-red-500">
          Facility Not Found
        </h1>
      </div>
    );
  }

  const {
    facilityName,
    facilityType,
    image,
    location,
    pricePerHour,
    capacity,
    description,
    timeSlots: availableSlots,
  } = facility;

  const slotsArray = Array.isArray(availableSlots)
    ? availableSlots
    : typeof availableSlots === "string"
    ? availableSlots.split(",")
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10">
      <div className="w-11/12 max-w-6xl mx-auto">

        <Link
          href="/facilities"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 text-white text-sm font-semibold"
        >
          ← Back to Facilities
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">

          {/* IMAGE + DETAILS */}
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden flex flex-col">

            <div className="relative w-full h-[260px] sm:h-[420px]">
              <Image
                src={image}
                alt={facilityName}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-7 space-y-6">

              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                {facilityType}
              </span>

              <h1 className="text-3xl font-bold">{facilityName}</h1>

              <p className="text-gray-500">
                📍 {location} • 👥 {capacity} people
              </p>

              <div className="text-3xl font-bold text-green-600">
                ${pricePerHour} / hour
              </div>

              <p className="text-gray-600">{description}</p>

              <div className="flex flex-wrap gap-2">
                {slotsArray.map((slot, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {slot.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* BOOKING FORM */}
          <div>
            <BookingForm
              facility={facility}
              image={image}
              facilityName={facilityName}
              pricePerHour={pricePerHour}
              slotsArray={slotsArray}
              user={user}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsPage;