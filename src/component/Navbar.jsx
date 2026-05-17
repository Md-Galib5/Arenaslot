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

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "All Facilities", href: "/destinations" },
        { name: "My Bookings", href: "/my-bookings" },
        { name: "Add Facilities", href: "/add-destination" },
        { name: "Manage My Facilities", href: "/manage-facilities" },
    ];

    return (
        <div className="bg-white py-3 border-b border-gray-100 sticky top-0 z-50">

            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

                <ul className="hidden lg:flex items-center gap-8">

                    {navLinks.map((link) => {

                        const isActive = pathname === link.href;

                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`transition-all duration-200 hover:text-green-600 hover:font-semibold ${
                                        isActive
                                            ? "text-green-600 font-semibold"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}

                </ul>

                <div className="hidden sm:flex items-center gap-3">

                    <Link href="/login">
                        <Button
                            variant="ghost"
                        >
                            Login
                        </Button>
                    </Link>

                </div>

            </nav>

            <div
                className={`fixed inset-0 z-50 transition-all duration-300 ${
                    open
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                }`}
            >

                <div
                    onClick={() => setOpen(false)}
                    className="absolute inset-0 bg-black/40"
                ></div>

                <div
                    className={`absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ${
                        open
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }`}
                >

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

                    <div className="flex flex-col p-5 gap-5">

                        {navLinks.map((link) => {

                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`text-lg transition-all duration-200 ${
                                        isActive
                                            ? "text-green-600 font-semibold"
                                            : "text-gray-700 hover:text-green-600"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        <Link href="/login">
                            <Button
                                variant="tertiary"
                                className="primary bg-green-500 hover:bg-green-600 text-white font-medium"
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