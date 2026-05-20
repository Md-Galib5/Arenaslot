"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, CheckCircle, XCircle, MapPin, Users } from "lucide-react";

const ManageFacilitiesClient = ({ initialData }) => {
  const [facilities, setFacilities] = useState(initialData);
  const [loadingId, setLoadingId] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleDelete = async (id) => {
    setLoadingId(id);

    try {
      const res = await fetch(`http://localhost:8080/facilities/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.deletedCount > 0) {
        setFacilities((prev) => prev.filter((item) => item._id !== id));

        setAlert({
          type: "success",
          message: "Facility deleted successfully!",
        });
      } else throw new Error();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to delete facility!",
      });
    } finally {
      setLoadingId(null);
      setTimeout(() => setAlert(null), 2500);
    }
  };

  const handleEdit = () => {
    setAlert({
      type: "error",
      message: "Edit feature coming soon!",
    });

    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <div>

      {/* ALERT */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium shadow-md border ${
              alert.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {alert.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <XCircle size={18} />
            )}
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {facilities.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >

            {/* TOP ACCENT BAR */}
            <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-600" />

            {/* IMAGE */}
            <div className="h-40 overflow-hidden">
              <img
                src={item.image}
                alt={item.facilityName}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">

              {/* TITLE */}
              <h2 className="text-lg font-bold text-gray-900 leading-tight">
                {item.facilityName}
              </h2>

              {/* TYPE BADGE */}
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 font-medium">
                {item.facilityType}
              </span>

              {/* META */}
              <div className="space-y-1 text-sm text-gray-500">

                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  {item.location}
                </div>

                <div className="flex items-center gap-2">
                  <Users size={14} />
                  Capacity available
                </div>

              </div>

              {/* PRICE */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-gray-500">Price / Hour</p>
                <p className="text-lg font-bold text-green-600">
                  ${item.pricePerHour}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-3">

                <button
                  onClick={handleEdit}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition shadow-sm"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={loadingId === item._id}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50 transition shadow-sm"
                >
                  <Trash2 size={16} />
                  {loadingId === item._id ? "Deleting..." : "Delete"}
                </button>

              </div>

            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default ManageFacilitiesClient;