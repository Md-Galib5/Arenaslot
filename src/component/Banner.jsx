'use client'

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import IMG from "../../public/Assests/Banner.png";

const Banner = () => {

  const pathname = usePathname();

  return (
    <section
      key={pathname}
      className="bg-white overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >

            {/* TAG */}
            <span className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5">
              Play Anytime, Anywhere
            </span>

            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight text-gray-900">
              Find & Book <br />

              Premium{" "}

              <span className="text-green-500">
                Sports
              </span>

              <br />

              Facilities Near You
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Discover top-rated sports venues, book instantly,
              and enjoy your game without the hassle.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mt-8">

            <Link href="/facilities">
              <button className="w-full sm:w-auto sm:min-w-[180px] bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-green-300">
                Explore Facilities
              </button>
              </Link>

            <Link href="/add-facilities">
              <button className="w-full sm:w-auto sm:min-w-[180px] border border-gray-300 hover:border-green-500 px-8 py-3 rounded-xl font-semibold text-gray-800 transition duration-300">
                Become a Host
              </button>
              </Link>

            </div>

          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center items-center"
          >

            {/* BACKGROUND GLOW */}
            <div className="absolute w-[260px] sm:w-[350px] lg:w-[450px] h-[260px] sm:h-[350px] lg:h-[450px] bg-green-400/20 rounded-full blur-3xl"></div>

            {/* IMAGE CONTAINER */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-xl">

              <Image
                src={IMG}
                alt="Sports Banner"
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto object-cover rounded-3xl"
              />

              {/* FLOATING CARD */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-20px] sm:bottom-6 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[92%] sm:w-[85%] px-4 sm:px-6 py-4">

                <div className="grid grid-cols-3 gap-3 sm:gap-5 text-center">

                  {/* FACILITIES */}
                  <div>

                    <Building2
                      size={22}
                      className="mx-auto text-green-500 mb-2"
                    />

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      500+
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500">
                      Facilities
                    </p>

                  </div>

                  {/* BOOKINGS */}
                  <div>

                    <CalendarDays
                      size={22}
                      className="mx-auto text-green-500 mb-2"
                    />

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      5K+
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500">
                      Bookings
                    </p>

                  </div>

                  {/* CITIES */}
                  <div>

                    <MapPin
                      size={22}
                      className="mx-auto text-green-500 mb-2"
                    />

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      20+
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500">
                      Cities
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

        {/* SPORTS SECTION */}
        <div className="mt-20 sm:mt-24 lg:mt-24">

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
            Popular Sports
          </h2>

          {/* SPORTS GRID */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">

            {["⚽", "🎾", "🏸", "🏀", "🏊", "🏏"].map((sport, index) => (

              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 flex items-center justify-center text-3xl sm:text-4xl transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {sport}
              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Banner;