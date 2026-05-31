"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import { cardVariants } from "@/lib/motion";
import { Contact } from "@/types";
import { formatDate } from "@/lib/utils";

interface ContactCardProps {
  contact: Contact;
  onDelete: (contact: Contact) => void;
}

export default function ContactCard({ contact, onDelete }: ContactCardProps) {
  const router = useRouter();

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group bg-white border border-[#E5E7EB] rounded-[12px] p-4 flex items-center gap-4 hover:border-[#D1D5DB] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer"
      onClick={() => router.push(`/contacts/${contact._id}`)}
    >
      <Avatar name={contact.name} size="md" />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#111827] truncate">{contact.name}</p>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="flex items-center gap-1 text-xs text-[#6B7280] truncate">
            <Mail size={11} className="shrink-0 text-[#9CA3AF]" />
            {contact.email}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#6B7280] shrink-0">
            <Phone size={11} className="shrink-0 text-[#9CA3AF]" />
            {contact.phone}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/contacts/${contact._id}/edit`);
          }}
          className="p-1.5 rounded-[6px] text-[#9CA3AF] hover:text-[#4F46E5] hover:bg-[#EEF2FF] transition-colors cursor-pointer"
        >
          <Pencil size={14} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(contact);
          }}
          className="p-1.5 rounded-[6px] text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#FEE2E2] transition-colors cursor-pointer"
        >
          <Trash2 size={14} />
        </motion.button>
      </div>

      <span className="text-xs text-[#9CA3AF] shrink-0 hidden sm:block">
        {formatDate(contact.createdAt)}
      </span>
    </motion.div>
  );
}
