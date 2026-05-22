"use client";

import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import IMG from "../../public/Assests/ChatGPT Image May 18, 2026, 03_10_12 AM.png";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const userData = authClient.useSession();
    const user = userData.data?.user;

    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            router.push("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white py-3 border-b border-green-100 sticky top-0 z-50 shadow-sm">
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setOpen(true)}
                        className="lg:hidden p-2 rounded-lg hover:bg-green-50 transition"
                    >
                        <Menu className="w-6 h-6 text-green-700" />
                    </button>

                    <Link href="/">
                        <Image
                            src={IMG}
                            alt="arenaslot"
                            width={170}
                            height={170}
                            className="w-[140px] sm:w-[170px]"
                        />
                    </Link>
                </div>

                {/* DESKTOP MENU */}
                <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    {[
                        ["Home", "/"],
                        ["All Facilities", "/facilities"],
                        ["My Bookings", "/my-bookings"],
                        ["Add Facilities", "/add-facilities"],
                        ["Manage Facilities", "/manage-facilities"],
                        //  ["Manage Facilities", "/my-facilities"],
                    ].map(([label, path]) => (
                        <li key={path}>
                            <Link
                                href={path}
                                className={`transition ${
                                    pathname === path
                                        ? "text-green-600 font-semibold"
                                        : "text-gray-700 hover:text-green-600"
                                }`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* AUTH */}
                <div className="hidden lg:flex items-center gap-3">
                    {user ? (
                        <>
                            <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
            <Avatar.Image
            className='rounded-xl'
                src={user?.image}
                referrerPolicy="no-referrer"
            />
            <Avatar.Fallback>
                {user?.name?.[0] ?? "U"}
            </Avatar.Fallback>
        </Avatar>

        <span className="text-md font-semibold text-gray-700">
            {user?.name ?? "User"}
        </span>
    </div>

                            <Button
                                onClick={handleSignOut}
                                size="sm"
                                className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md"
                            >
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button
                                    size="sm"
                                    className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-md"
                                >
                                    Login
                                </Button>
                            </Link>

                            <Link href="/register">
                                <Button
                                    size="sm"
                                    variant="bordered"
                                    className="border-green-300 text-green-600 p-1 rounded-md"
                                >
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* MOBILE MENU */}
            <div
                className={`fixed inset-0 z-50 transition ${
                    open ? "visible opacity-100" : "invisible opacity-0"
                }`}
            >
                <div
                    onClick={() => setOpen(false)}
                    className="absolute inset-0 bg-black/40"
                />

                <div
                    className={`absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl transition-transform ${
                        open ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex items-center justify-between p-5 border-b border-green-100">
                        <Image src={IMG} alt="logo" width={140} height={140} />
                        <button onClick={() => setOpen(false)}>
                            <X />
                        </button>
                    </div>

                    <div className="flex flex-col p-5 gap-5">
                        {[
                            ["Home", "/"],
                            ["All Facilities", "/facilities"],
                            ["My Bookings", "/my-bookings"],
                            ["Add Facilities", "/add-facilities"],
                            ["Manage Facilities", "/manage-facilities"],
                        ].map(([label, path]) => (
                            <Link
                                key={path}
                                href={path}
                                onClick={() => setOpen(false)}
                                className={
                                    pathname === path
                                        ? "text-green-600 font-semibold"
                                        : "text-gray-700"
                                }
                            >
                                {label}
                            </Link>
                        ))}

                        <div className="pt-4 flex flex-col gap-3">
                            <Link href="/login">
                                <Button className="w-full bg-green-500 text-white p-1 rounded-md">
                                    Login
                                </Button>
                            </Link>

                            <Link href="/register">
                                <Button className="w-full border border-green-300 text-green-600 p-1 rounded-md">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;