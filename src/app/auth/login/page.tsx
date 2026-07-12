import React, { Suspense } from "react";
import { Skeleton } from "@heroui/react";
import { Home } from "lucide-react"; // StaySphere ব্র্যান্ডিংয়ের জন্য
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-bg-soft flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 md:w-150 md:h-150 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-md border border-brand-border rounded-3xl p-8 sm:p-10 shadow-xl shadow-brand-primary/5 z-10">
        
        {/* হেডার এবং লোগো এরিয়া */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-5 border border-brand-primary/20 shadow-sm">
            <Home size={28} strokeWidth={2.5} />
          </div>
          
          <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-brand-text">
            Welcome back
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            Sign in to continue to StaySphere.
          </p>
        </div>

        {/* লগিন ফর্ম (উইথ সাসপেন্স ফলব্যাক) */}
        <Suspense
          fallback={
            <div className="relative w-full overflow-hidden rounded-2xl">
              <Skeleton className="h-[500px] w-full rounded-2xl bg-slate-100" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>

      </div>
    </div>
  );
}