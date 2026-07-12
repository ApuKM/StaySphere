import { Suspense } from "react";
import { Skeleton } from "@heroui/react";
import { Home } from "lucide-react"; 
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-brand-bg-soft flex items-center justify-center p-4 py-12 relative  overflow-hidden">
      
      {/* ডেকোরেটিভ ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 md:w-150 md:h-150 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* রেজিস্টার কার্ড */}
      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl shadow-brand-primary/5 z-10">
        
        {/* হেডার এবং লোগো এরিয়া */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-5 border border-brand-primary/20 shadow-sm">
            <Home size={28} strokeWidth={2.5} />
          </div>
          
          <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-brand-text">
            Create an account
          </h2>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            Join StaySphere to discover amazing places to stay or start hosting your own property.
          </p>
        </div>
        
        {/* রেজিস্টার ফর্ম (উইথ সাসপেন্স ফলব্যাক) */}
        <Suspense
          fallback={
            <div className="relative w-full overflow-hidden rounded-2xl">
              {/* ফর্মটি একটু বড় হতে পারে, তাই h-[400px] দেওয়া হয়েছে */}
              <Skeleton className="h-[500px] w-full rounded-2xl bg-slate-100" />
            </div>
          }
        >
          <RegisterForm />
        </Suspense>

      </div>
    </div>
  );
}