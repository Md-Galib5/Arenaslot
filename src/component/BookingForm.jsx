"use client";

import { useState, useMemo } from "react";

const BookingForm = ({
    facilityName,
    pricePerHour,
    slotsArray,
}) => {

    const [selectedSlot, setSelectedSlot] = useState("");
    const [selectedSubSlots, setSelectedSubSlots] = useState([]);

    const toMinutes = (t) => {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
    };

    const toTime = (mins) => {
        const h = String(Math.floor(mins / 60)).padStart(2, "0");
        const m = String(mins % 60).padStart(2, "0");
        return `${h}:${m}`;
    };

    const expandedSlots = useMemo(() => {
        if (!selectedSlot) return [];

        const [startStr, endStr] = selectedSlot.split("-").map(s => s.trim());

        let start = toMinutes(startStr);
        const end = toMinutes(endStr);

        const result = [];

        while (start + 60 <= end) {
            const next = start + 60;
            result.push(`${toTime(start)} - ${toTime(next)}`);
            start = next;
        }

        return result;
    }, [selectedSlot]);

    const toggleSlot = (slot) => {
        setSelectedSubSlots((prev) =>
            prev.includes(slot)
                ? prev.filter((s) => s !== slot)
                : [...prev, slot]
        );
    };

    const totalPrice = selectedSubSlots.length * Number(pricePerHour);

    return (

        <div className="w-full h-full bg-white border border-gray-100 rounded-3xl shadow-lg overflow-hidden flex flex-col">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                <h2 className="text-2xl font-bold">
                    Book Your Facility
                </h2>
                <p className="text-green-100 text-sm mt-1">
                    Select available slots and confirm your booking instantly
                </p>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">

                {/* Facility */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Facility Name
                    </label>
                    <div className="mt-2 px-4 py-3 rounded-xl bg-gray-50 border text-gray-800 font-medium">
                        {facilityName}
                    </div>
                </div>

                {/* Date */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Booking Date
                    </label>
                    <input
                        type="date"
                        className="mt-2 w-full h-12 px-4 rounded-xl border focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                {/* Slot Select */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Available Time Slots
                    </label>

                    <select
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

                {/* Sub Slots */}
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

                {/* PRICE */}
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

            {/* BUTTON */}
            <div className="p-6 border-t">
                <button
                    type="submit"
                    disabled={selectedSubSlots.length === 0}
                    className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold transition-all shadow-md"
                >
                    Confirm Booking
                </button>
            </div>

        </div>
    );
};

export default BookingForm;