import ManageFacilitiesClient from "@/component/ManageFacilitiesClient";


const ManagePage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`, {
    cache: "no-store",
  });

  const facilities = await res.json();

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

        {/* CLIENT COMPONENT */}
        <ManageFacilitiesClient initialData={facilities} />

      </div>
    </div>
  );
};

export default ManagePage;