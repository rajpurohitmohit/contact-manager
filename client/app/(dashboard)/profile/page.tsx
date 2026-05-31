"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, User, Calendar, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { cardVariants } from "@/lib/motion";
import { formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loadCurrentUser, logout, isLoading } = useAuthStore();

  useEffect(() => { loadCurrentUser(); }, [loadCurrentUser]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold text-[#111827] mb-1">Profile</h1>
      <p className="text-sm text-[#6B7280] mb-8">Your account details</p>

      {!user ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
      ) : (
        <motion.div variants={cardVariants} initial="initial" animate="animate" className="space-y-4">
          {/* Avatar hero */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6 flex items-center gap-5">
            <Avatar name={user.username} size="xl" />
            <div>
              <p className="text-xl font-semibold text-[#111827]">{user.username}</p>
              <p className="text-sm text-[#6B7280] mt-0.5">{user.email}</p>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] divide-y divide-[#F3F4F6]">
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="w-8 h-8 rounded-[8px] bg-[#EEF2FF] flex items-center justify-center">
                <User size={14} className="text-[#4F46E5]" />
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wide">Username</p>
                <p className="text-sm text-[#111827] font-medium mt-0.5">{user.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="w-8 h-8 rounded-[8px] bg-[#EEF2FF] flex items-center justify-center">
                <Mail size={14} className="text-[#4F46E5]" />
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wide">Email</p>
                <p className="text-sm text-[#111827] font-medium mt-0.5">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-4">
            <Button variant="destructive" size="md" className="w-full" onClick={handleLogout}>
              <LogOut size={15} />
              Sign out
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
