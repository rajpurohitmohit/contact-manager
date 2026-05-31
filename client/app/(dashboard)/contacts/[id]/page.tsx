"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, Pencil, Trash2, Calendar } from "lucide-react";
import { contactsApi } from "@/lib/api/contacts";
import { useContactStore } from "@/stores/contactStore";
import { useToast } from "@/components/ui/Toast";
import { Contact } from "@/types";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import DeleteDialog from "@/components/contacts/DeleteDialog";
import { Skeleton } from "@/components/ui/Skeleton";
import { cardVariants } from "@/lib/motion";
import { formatDate } from "@/lib/utils";

export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { remove } = useContactStore();
  const { show } = useToast();

  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    contactsApi.getOne(id).then(({ data }) => {
      setContact(data);
      setIsLoading(false);
    }).catch(() => router.push("/contacts"));
  }, [id, router]);

  const handleDelete = async () => {
    if (!contact) return;
    setIsDeleting(true);
    try {
      await remove(contact._id);
      show(`${contact.name} deleted`, "success");
      router.push("/contacts");
    } catch {
      show("Failed to delete contact", "error");
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-1" onClick={() => router.back()}>
        <ArrowLeft size={15} />
        Back
      </Button>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      ) : contact ? (
        <motion.div variants={cardVariants} initial="initial" animate="animate" className="space-y-6">
          {/* Hero */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar name={contact.name} size="xl" />
              <div>
                <h1 className="text-2xl font-semibold text-[#111827]">{contact.name}</h1>
                <p className="text-sm text-[#9CA3AF] flex items-center gap-1.5 mt-0.5">
                  <Calendar size={12} />
                  Added {formatDate(contact.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => router.push(`/contacts/${id}/edit`)}>
                <Pencil size={13} />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}>
                <Trash2 size={13} />
                Delete
              </Button>
            </div>
          </div>

          {/* Details card */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] divide-y divide-[#F3F4F6]">
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="w-8 h-8 rounded-[8px] bg-[#EEF2FF] flex items-center justify-center">
                <Mail size={14} className="text-[#4F46E5]" />
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wide">Email</p>
                <p className="text-sm text-[#111827] font-medium mt-0.5">{contact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="w-8 h-8 rounded-[8px] bg-[#EEF2FF] flex items-center justify-center">
                <Phone size={14} className="text-[#4F46E5]" />
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wide">Phone</p>
                <p className="text-sm text-[#111827] font-medium mt-0.5">{contact.phone}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}

      <DeleteDialog
        contact={showDelete ? contact : null}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}
