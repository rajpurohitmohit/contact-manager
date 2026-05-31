"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Users, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";

const navItems = [
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/profile",  label: "Profile",  icon: User  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-[220px] shrink-0 h-full bg-white border-r border-[#E5E7EB] flex flex-col py-5 px-3">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-8 h-8 rounded-[8px] bg-[#4F46E5] flex items-center justify-center shadow-[0_2px_8px_rgba(79,70,229,0.25)]">
          <Users size={15} className="text-white" />
        </div>
        <span className="font-semibold text-[#111827] text-[15px] tracking-tight">MyContacts</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} className="block">
              <motion.div
                whileHover={{ x: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm font-medium transition-colors cursor-pointer",
                  active
                    ? "bg-[#EEF2FF] text-[#4F46E5]"
                    : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
                )}
              >
                <Icon size={16} className={active ? "text-[#4F46E5]" : "text-[#9CA3AF]"} />
                {label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4F46E5]"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-[#F3F4F6] pt-4 mt-4">
        {user && (
          <div className="flex items-center gap-2.5 px-3 mb-3">
            <Avatar name={user.username} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#111827] truncate">{user.username}</p>
              <p className="text-xs text-[#9CA3AF] truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-[8px] text-sm text-[#6B7280] hover:bg-[#FEE2E2] hover:text-[#EF4444] transition-colors cursor-pointer"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
