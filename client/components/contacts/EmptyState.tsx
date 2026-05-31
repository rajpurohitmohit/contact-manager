"use client";

import { motion } from "framer-motion";
import { Users, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface EmptyStateProps {
  isFiltered?: boolean;
}

export default function EmptyState({ isFiltered }: EmptyStateProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 px-8 text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-16 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mb-5"
      >
        <Users size={28} className="text-[#4F46E5]" />
      </motion.div>

      <h3 className="text-[#111827] font-semibold text-lg mb-2">
        {isFiltered ? "No contacts found" : "No contacts yet"}
      </h3>
      <p className="text-sm text-[#6B7280] max-w-[260px] mb-6">
        {isFiltered
          ? "Try a different search term or clear the filter."
          : "Add your first contact to get started."}
      </p>

      {!isFiltered && (
        <Button onClick={() => router.push("/contacts/new")} size="md">
          <Plus size={15} />
          Add contact
        </Button>
      )}
    </motion.div>
  );
}
