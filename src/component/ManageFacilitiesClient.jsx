"use client";

import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  MapPin,
  Users,
  X,
  AlertTriangle,
} from "lucide-react";

const ManageFacilitiesClient = ({ initialData }) => {

  const [facilities, setFacilities] =
    useState(initialData);

  const [loadingId, setLoadingId] =
    useState(null);

  const [alert, setAlert] =
    useState(null);

  // DELETE MODAL
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedFacility, setSelectedFacility] =
    useState(null);

  // EDIT MODAL
  const [showEditModal, setShowEditModal] =
    useState(false);

  const [editFacility, setEditFacility] =
    useState(null);


  const openDeleteModal = (facility) => {
    setSelectedFacility(facility);
    setShowDeleteModal(true);
  };


  const handleDelete = async () => {

    if (!selectedFacility) return;

    setLoadingId(selectedFacility._id);

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${selectedFacility._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {

        setFacilities((prev) =>
          prev.filter(
            (item) =>
              item._id !==
              selectedFacility._id
          )
        );

        setAlert({
          type: "success",
          message:
            "Facility deleted successfully!",
        });

        setShowDeleteModal(false);

      } else {
        throw new Error();
      }

    } catch (error) {

      setAlert({
        type: "error",
        message:
          "Failed to delete facility!",
      });

    } finally {

      setLoadingId(null);

      setTimeout(() => {
        setAlert(null);
      }, 2500);

    }
  };


  const handleEdit = (facility) => {
    setEditFacility(facility);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const updatedFacility =
      Object.fromEntries(
        formData.entries()
      );

    try {

      const res = await fetch(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${editFacility._id}`,
  {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updatedFacility),
  }
);
      const data = await res.json();

      if (
        data.modifiedCount > 0
      ) {

        setFacilities((prev) =>
          prev.map((item) =>
            item._id ===
            editFacility._id
              ? {
                  ...item,
                  ...updatedFacility,
                }
              : item
          )
        );

        setAlert({
          type: "success",
          message:
            "Facility updated successfully!",
        });

        setShowEditModal(false);

      } else {
        throw new Error();
      }

    } catch (error) {

      setAlert({
        type: "error",
        message:
          "Failed to update facility!",
      });

    }

    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (

    <div className="relative">

      {/* ALERT */}

      <AnimatePresence>

        {alert && (

          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium shadow-md border ${
              alert.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >

            {alert.type ===
            "success" ? (
              <CheckCircle size={18} />
            ) : (
              <XCircle size={18} />
            )}

            {alert.message}

          </motion.div>

        )}

      </AnimatePresence>

      {/* GRID */}

      {/* GRID */}

<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

  {facilities.map((item, index) => (

    <motion.div
      key={item._id}
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.05,
      }}
      className="group relative overflow-hidden rounded-[28px] border border-green-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-emerald-100/60 transition-all duration-500 hover:-translate-y-2"
    >

      {/* GLOW EFFECT */}

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-green-100/0 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* TOP IMAGE */}

      <div className="relative h-56 overflow-hidden">

        <img
          src={item.image}
          alt={item.facilityName}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* TYPE BADGE */}

        <div className="absolute top-4 left-4">

          <span className="rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-md border border-white/50">
            {item.facilityType}
          </span>

        </div>

        {/* PRICE */}

        <div className="absolute bottom-4 right-4">

          <div className="rounded-2xl bg-emerald-500 px-4 py-2 text-white shadow-xl">

            <p className="text-xs opacity-90">
              Price / Hour
            </p>

            <h2 className="text-xl font-bold">
              ${item.pricePerHour}
            </h2>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="relative p-6">

        {/* TITLE */}

        <div className="mb-4">

          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition">
            {item.facilityName}
          </h2>


        </div>

        {/* INFO SECTION */}

        <div className="space-y-3">

          {/* LOCATION */}

          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 border border-gray-100">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

              <MapPin size={18} />

            </div>

            <div>

              <p className="text-xs text-gray-400">
                Location
              </p>

              <p className="text-sm font-medium text-gray-700">
                {item.location}
              </p>

            </div>

          </div>

          {/* CAPACITY */}

          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 border border-gray-100">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">

              <Users size={18} />

            </div>

            <div>

              <p className="text-xs text-gray-400">
                Capacity
              </p>

              <p className="text-sm font-medium text-gray-700">
                {item.capacity} Players
              </p>

            </div>

          </div>

        </div>

        {/* ACTION BUTTONS */}

        <div className="mt-6 flex gap-3">

          {/* EDIT */}

          <button
            onClick={() => handleEdit(item)}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all duration-300 hover:scale-[1.02]"
          >

            <Pencil size={16} />

            Edit

          </button>

          {/* DELETE */}

          <button
            onClick={() => openDeleteModal(item)}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
          >

            <Trash2 size={16} />

            Delete

          </button>

        </div>

      </div>

    </motion.div>

  ))}

</div>
      <AnimatePresence>

        {showDeleteModal && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          >

            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >

              {/* HEADER */}

              <div className="bg-red-50 border-b border-red-100 p-6 flex items-start justify-between">

                <div className="flex gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">

                    <AlertTriangle
                      className="text-red-500"
                      size={24}
                    />

                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      Delete Facility
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      This action cannot
                      be undone
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setShowDeleteModal(
                      false
                    )
                  }
                  className="text-gray-400 hover:text-gray-600"
                >

                  <X size={20} />

                </button>

              </div>


              <div className="p-6">

                <p className="text-gray-600 leading-relaxed">

                  Are you sure you
                  want to delete{" "}

                  <span className="font-semibold text-gray-900">

                    {
                      selectedFacility?.facilityName
                    }

                  </span>

                  ?

                </p>

                {/* BUTTONS */}

                <div className="flex gap-3 mt-8">

                  <button
                    onClick={() =>
                      setShowDeleteModal(
                        false
                      )
                    }
                    className="flex-1 h-12 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
                  >

                    Cancel

                  </button>

                  <button
                    onClick={
                      handleDelete
                    }
                    disabled={
                      loadingId ===
                      selectedFacility?._id
                    }
                    className="flex-1 h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition disabled:opacity-50"
                  >

                    {loadingId ===
                    selectedFacility?._id
                      ? "Deleting..."
                      : "Delete"}

                  </button>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      <AnimatePresence>

        {showEditModal && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-10 overflow-y-auto"
          >

            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"            >

              {/* HEADER */}

              <div className="bg-gradient-to-r from-green-600 to-green-400 p-6 flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    Edit Facility
                  </h2>

                  <p className="text-blue-100 text-sm mt-1">
                    Update your
                    facility information
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowEditModal(
                      false
                    )
                  }
                  className="text-white/80 hover:text-white"
                >

                  <X size={22} />

                </button>

              </div>

{/* FORM */}

{/* FORM */}

<div className="overflow-y-auto px-6 py-5 bg-gradient-to-br from-green-50 via-white to-emerald-50">

  <form
    onSubmit={handleUpdate}
    className="space-y-5"
  >

    {/* TOP GRID */}

    <div className="grid md:grid-cols-2 gap-4">

      {/* FACILITY NAME */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Facility Name
        </label>

        <input
          name="facilityName"
          defaultValue={editFacility?.facilityName}
          type="text"
          required
          className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        />

      </div>

      {/* FACILITY TYPE */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Facility Type
        </label>

        <select
          name="facilityType"
          defaultValue={editFacility?.facilityType}
          className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        >

          <option value="Football Field">
            Football Field
          </option>

          <option value="Basketball Court">
            Basketball Court
          </option>

          <option value="Tennis Court">
            Tennis Court
          </option>

          <option value="Swimming Pool">
            Swimming Pool
          </option>

          <option value="Gym">
            Gym
          </option>

        </select>

      </div>

    </div>

    {/* IMAGE */}

    <div>

      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Image URL
      </label>

      <input
        name="image"
        defaultValue={editFacility?.image}
        type="text"
        required
        className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      />

    </div>

    {/* LOCATION + SLOT */}

    <div className="grid md:grid-cols-2 gap-4">

      {/* LOCATION */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Location
        </label>

        <input
          name="location"
          defaultValue={editFacility?.location}
          type="text"
          required
          className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        />

      </div>

      {/* SLOT */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Available Slots
        </label>

        <input
          name="timeSlots"
          defaultValue={editFacility?.timeSlots}
          type="text"
          required
          className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        />

      </div>

    </div>

    {/* PRICE + CAPACITY */}

    <div className="grid md:grid-cols-2 gap-4">

      <div>

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Price Per Hour
        </label>

        <input
          name="pricePerHour"
          defaultValue={editFacility?.pricePerHour}
          type="number"
          required
          className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Capacity
        </label>

        <input
          name="capacity"
          defaultValue={editFacility?.capacity}
          type="number"
          required
          className="h-12 w-full rounded-2xl border border-green-100 bg-white px-4 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        />

      </div>

    </div>

    {/* DESCRIPTION */}

    <div>

      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Description
      </label>

      <textarea
        name="description"
        rows={4}
        defaultValue={editFacility?.description}
        className="w-full rounded-2xl border border-green-100 bg-white p-4 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      />

    </div>

    {/* BUTTONS */}

    <div className="flex justify-end gap-4 pt-2 sticky bottom-0 bg-gradient-to-r from-white to-green-50 pb-1">

      <button
        type="button"
        onClick={() => setShowEditModal(false)}
        className="h-11 px-6 rounded-2xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="h-11 px-7 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold shadow-lg shadow-emerald-200 hover:scale-[1.02] transition"
      >
        Update Facility
      </button>

    </div>

  </form>

</div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default ManageFacilitiesClient;