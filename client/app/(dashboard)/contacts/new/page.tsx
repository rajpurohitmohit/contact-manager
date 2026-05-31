"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContactStore } from "@/stores/contactStore";
import { useToast } from "@/components/ui/Toast";
import { ContactFormData } from "@/types";
import ContactForm from "@/components/contacts/ContactForm";
import Button from "@/components/ui/Button";
import { cardVariants } from "@/lib/motion";
import { useState } from "react";

export default function NewContactPage() {
  const router = useRouter();
  const { create } = useContactStore();
  const { show } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      await create(data);
      show("Contact added", "success");
      router.push("/contacts");
    } catch {
      show("Failed to create contact", "error");
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

      <motion.div variants={cardVariants} initial="initial" animate="animate">
        <h1 className="text-2xl font-semibold text-[#111827] mb-1">New contact</h1>
        <p className="text-sm text-[#6B7280] mb-8">Fill in the details below.</p>

        <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6">
          <ContactForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitLabel="Save contact"
          />
        </div>
      </motion.div>
    </div>
  );
}
