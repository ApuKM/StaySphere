import { FiHome } from "react-icons/fi";
import { getUserSession } from "@/lib/core/session";
import AddListingForm from "./AddListingForm";

const AddListingPage = async () => {
  const user = await getUserSession();

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div className="min-h-screen bg-brand-bg-soft text-brand-text p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-text">
            List Your Space
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Fill out the details below to welcome guests to your property on
            StaySphere.
          </p>
        </div>

        {/* Host Info Banner */}
        <div className="bg-white border border-brand-border rounded-2xl mb-8 p-5 flex flex-row items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-50 rounded-xl">
              <FiHome className="text-brand-primary text-xl" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">
                Hosting as{" "}
                <span className="font-bold text-brand-text">
                  {user?.name || "StaySphere Host"}
                </span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-brand-secondary border border-emerald-200">
                  Verified Host
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <AddListingForm user={user} />
      </div>
    </div>
  );
};

export default AddListingPage;
