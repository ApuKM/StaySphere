"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown, Button, Separator, Avatar } from "@heroui/react";
import { 
  Home, 
  Compass, 
  Info, 
  PlusCircle, 
  LayoutDashboard, 
  Menu, 
  X, 
} from "lucide-react";
import { NavLink } from "@/utils/types/Homepage";


export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ⚠️ MOCK AUTH STATE (লগইন ভিউ টেস্ট করার জন্য true রাখতে পারেন)
  const isLoading = false;
  const isLoggedIn = true; 
  const user = isLoggedIn ? {
    name: "John Doe",
    email: "john@staysphere.com",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    role: "user"
  } : null;

  const baseLinks: NavLink[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "About", href: "/about", icon: Info },
  ];

  const loggedInLinks: NavLink[] = [
    ...baseLinks,
    { name: "Add Property", href: "/items/add", icon: PlusCircle },
    { name: "Manage", href: "/items/manage", icon: LayoutDashboard },
  ];

  const navLinks = user ? loggedInLinks : baseLinks;

  const handleLogOut = async () => {
    console.log("Logging out...");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-slate-50 text-brand-text backdrop-blur-md ">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo / Branding (Airbnb Style Rose Red) */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary text-white font-black text-lg transition-transform group-hover:scale-105">
            S
          </div>
          <div>
            <h2 className="text-lg font-bold leading-none tracking-tight text-brand-primary">StaySphere</h2>
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Escapes</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 py-2 transition-colors relative ${
                  isActive
                    ? "text-brand-primary"
                    : "text-slate-700 hover:text-brand-text"
                }`}
              >
                <Icon size={16} className={isActive ? "text-brand-primary" : "text-slate-600"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          
          {/* Auth Section */}
          {isLoading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
          ) : user ? (
            <Dropdown>
              <Dropdown.Trigger className="flex items-center gap-3 outline-none cursor-pointer bg-transparent border-none">
                <div className="flex items-center gap-3 p-1.5 pl-3 border border-brand-border rounded-full hover:shadow-md transition bg-white">
                  <div className="hidden md:block text-right">
                    <p className="text-xs font-semibold text-brand-text">
                      {user.name.split(" ")[0]}
                    </p>
                    <p className="text-[9px] font-medium text-brand-secondary">Host Mode</p>
                  </div>
                  <Avatar className="w-8 h-8">
                    <Avatar.Image alt={user.name} src={user.image} />
                    <Avatar.Fallback className="bg-rose-100 text-brand-primary font-bold">
                      {user.name.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                </div>
              </Dropdown.Trigger>

              {/* Popover (Airbnb-style Premium Light Theme) */}
              <Dropdown.Popover className="bg-white border border-brand-border rounded-2xl p-2 text-brand-text shadow-xl min-w-[220px]">
                <Dropdown.Menu className="outline-none flex flex-col gap-0.5">
                  <Dropdown.Item
                    className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 cursor-pointer transition-colors hover:bg-slate-50 hover:text-brand-text"
                    onPress={() => router.push("/profile")}
                  >
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 cursor-pointer transition-colors hover:bg-slate-50 hover:text-brand-text"
                    onPress={() => router.push("/items/manage")}
                  >
                    Manage Properties
                  </Dropdown.Item>
                  
                  <Separator className="bg-brand-border my-1.5 h-px w-full" />
                  
                  <Dropdown.Item
                    className="flex items-center px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 cursor-pointer transition-colors hover:bg-rose-50"
                    onPress={handleLogOut}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <Link href="/login">
              <Button size="sm" className="bg-brand-primary text-white font-semibold rounded-full px-5 py-4 text-sm shadow-sm hover:bg-rose-600 transition-all">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 rounded-full border border-brand-border hover:bg-slate-50 text-slate-600 transition focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-border bg-white px-6 py-4 flex flex-col gap-3 shadow-inner">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-rose-50 text-brand-primary"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} className={isActive ? "text-brand-primary" : "text-slate-400"} />
                {item.name}
              </Link>
            );
          })}
        {user ? (
      <button
        onClick={() => {
          setIsMobileMenuOpen(false);
          handleLogOut();
        }}
        className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors w-full text-left mt-2 border border-rose-100 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-rose-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    ) : (
      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
        <Button size="sm" className="w-full bg-brand-primary text-white font-semibold rounded-full py-5">
          Login
        </Button>
      </Link>
    )}
        </div>
      )}
    </header>
  );
}