import ManageFacilitiesClient from "@/component/ManageFacilitiesClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const ManagePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="p-10 text-center text-red-500">
        Please login to view your facilities
      </div>
    );
  }

  const facilityRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities?ownerEmail=${user.email}`,
    {
      cache: "no-store",
    }
  );

  const facilities = await facilityRes.json();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Manage <span className="text-green-600">Facilities</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Edit or delete your sports facilities easily
          </p>
        </div>

        {/* EMPTY STATE */}
        {facilities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-200 shadow-sm">
            
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <PlusCircle className="text-green-600" size={28} />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No Facilities Yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
              You haven’t added any sports facilities yet. Start by creating your first facility and manage it here.
            </p>

            <Link
              href="/add-facilities"
              className="mt-6 px-5 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              + Add Facility
            </Link>
          </div>
        ) : (
          <ManageFacilitiesClient initialData={facilities} />
        )}

      </div>
    </div>
  );
};

export default ManagePage;