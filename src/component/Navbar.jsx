"use client";

import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import IMG from "../../public/Assests/ChatGPT Image May 18, 2026, 03_10_12 AM.png";

const Navbar = () => {
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "All Facilities", href: "/destinations" },
        { name: "My Bookings", href: "/my-bookings" },
        { name: "Add Facilities", href: "/add-destination" },
        { name: "Manage My Facilities", href: "/manage-facilities" },
    ];

    return (
        <div className="bg-white py-3">
            <nav className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo */}
                <Image src={IMG} alt="arenaslot" width={180} height={180} />

                {/* Center Links */}
                <ul className="flex gap-6">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`transition-colors duration-200 hover:text-green-600 hover:font-semibold ${isActive ? "text-green-600 font-semibold" : "text-gray-700"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right Side */}
                <ul className="flex items-center gap-3">
                    <li>
                        <Link
                            href="/profile"
                            className="hover:text-green-600 transition-colors"
                        >
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;