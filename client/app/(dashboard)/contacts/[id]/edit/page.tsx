"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { contactsApi } from "@/lib/api/contacts";
import { useContactStore } from "@/stores/contactStore";
import { useToast } from "@/components/ui/Toast";
import { Contact, ContactFormData } from "@/types";
import ContactForm from "@/components/contacts/ContactForm";
import Button from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { cardVariants } from "@/lib/motion";

export default function EditContactPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { update } = useContactStore();
  const { show } = useToast();

  const [contact, setContact] = useState<Contact | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    contactsApi.getOne(id).then(({ data }) => {
      setContact(data);
      setIsFetching(false);
    }).catch(() => router.push("/contacts"));
  }, [id, router]);

  const handleSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      await update(id, data);
      show("Contact updated", "success");
      router.push(`/contacts/${id}`);
    } catch {
      show("Failed to update contact", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-1" onClick={() => router.back()}>
        <ArrowLeft size={15} />
        Back
      </Button>

      {isFetching ? (
        <div className="space-y-4">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : contact ? (
        <motion.div variants={cardVariants} initial="initial" animate="animate">
          <h1 className="text-2xl font-semibold text-[#111827] mb-1">Edit contact</h1>
          <p className="text-sm text-[#6B7280] mb-8">Update {contact.name}'s details.</p>

          <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6">
            <ContactForm
              defaultValues={{ name: contact.name, email: contact.email, phone: contact.phone }}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              submitLabel="Save changes"
            />
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
