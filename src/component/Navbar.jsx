"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import IMG from "../../public/Assests/ChatGPT Image May 18, 2026, 03_10_12 AM.png";

const Navbar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white py-3 border-b border-gray-100 sticky top-0 z-50">
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Logo + Mobile Menu */}
                <div className="flex items-center gap-3">

                    <button
                        onClick={() => setOpen(true)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <Menu className="w-6 h-6 text-black" />
                    </button>

                    <Link href="/">
                        <Image
                            src={IMG}
                            alt="arenaslot"
                            width={180}
                            height={180}
                            className="w-[150px] sm:w-[180px] h-auto"
                        />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex items-center gap-8">

                    <li>
                        <Link
                            href="/"
                            className={`transition-all duration-200 hover:text-green-600 hover:font-semibold ${
                                pathname === "/"
                                    ? "text-green-600 font-semibold"
                                    : "text-gray-700"
                            }`}
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/facilities"
                            className={`transition-all duration-200 hover:text-green-600 hover:font-semibold ${
                                pathname === "/facilities"
                                    ? "text-green-600 font-semibold"
                                    : "text-gray-700"
                            }`}
                        >
                            All Facilities
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/my-bookings"
                            className={`transition-all duration-200 hover:text-green-600 hover:font-semibold ${
                                pathname === "/my-bookings"
                                    ? "text-green-600 font-semibold"
                                    : "text-gray-700"
                            }`}
                        >
                            My Bookings
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/add-facilities"
                            className={`transition-all duration-200 hover:text-green-600 hover:font-semibold ${
                                pathname === "/add-facilities"
                                    ? "text-green-600 font-semibold"
                                    : "text-gray-700"
                            }`}
                        >
                            Add Facilities
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/manage-facilities"
                            className={`transition-all duration-200 hover:text-green-600 hover:font-semibold ${
                                pathname === "/manage-facilities"
                                    ? "text-green-600 font-semibold"
                                    : "text-gray-700"
                            }`}
                        >
                            Manage My Facilities
                        </Link>
                    </li>

                </ul>

                {/* Desktop Login */}
                <div className="hidden sm:flex items-center gap-3">
                    <Link href="/login">
                        <Button variant="ghost">
                            Login
                        </Button>
                    </Link>
                </div>

            </nav>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-50 transition-all duration-300 ${
                    open ? "visible opacity-100" : "invisible opacity-0"
                }`}
            >

                {/* Overlay */}
                <div
                    onClick={() => setOpen(false)}
                    className="absolute inset-0 bg-black/40"
                ></div>

                {/* Sidebar */}
                <div
                    className={`absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ${
                        open ? "translate-x-0" : "-translate-x-full"
                    }`}
                >

                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">

                        <Image
                            src={IMG}
                            alt="arenaslot"
                            width={140}
                            height={140}
                            className="h-auto"
                        />

                        <button
                            onClick={() => setOpen(false)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            <X className="w-6 h-6 text-black" />
                        </button>

                    </div>

                    {/* Mobile Links */}
                    <div className="flex flex-col p-5 gap-5">

                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className={`text-lg transition-all duration-200 ${
                                pathname === "/"
                                    ? "text-green-600 font-semibold"
                                    : "text-gray-700 hover:text-green-600"
                            }`}
                        >
                            Home
                        </Link>

                        <Link
                            href="/facilities"
                            onClick={() => setOpen(false)}
                            className={`text-lg transition-all duration-200 ${
                                pathname === "/facilities"
                                    ? "text-green-600 font-semibold"
                                    : "text-gray-700 hover:text-green-600"
                            }`}
                        >
                            All Facilities
                        </Link>

                        <Link
                            href="/my-bookings"
                            onClick={() => setOpen(false)}
                            className={`text-lg transition-all duration-200 ${
                                pathname === "/my-bookings"
                                    ? "text-green-600 font-semibold"
                                    : "text-gray-700 hover:text-green-600"
                            }`}
                        >
                            My Bookings
                        </Link>

                        <Link
                            href="/add-facilities"
                            onClick={() => setOpen(false)}
                            className={`text-lg transition-all duration-200 ${
                                pathname === "/add-facilities"
                                    ? "text-green-600 font-semibold"
                                    : "text-gray-700 hover:text-green-600"
                            }`}
                        >
                            Add Facilities
                        </Link>

                        <Link
                            href="/manage-facilities"
                            onClick={() => setOpen(false)}
                            className={`text-lg transition-all duration-200 ${
                                pathname === "/manage-facilities"
                                    ? "text-green-600 font-semibold"
                                    : "text-gray-700 hover:text-green-600"
                            }`}
                        >
                            Manage My Facilities
                        </Link>

                        <Link href="/login">
                            <Button
                                variant="solid"
                                className="bg-green-500 hover:bg-green-600 text-white font-medium"
                            >
                                Login
                            </Button>
                        </Link>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Navbar;