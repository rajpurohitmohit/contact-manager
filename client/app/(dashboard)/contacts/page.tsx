"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContactStore } from "@/stores/contactStore";
import { useToast } from "@/components/ui/Toast";
import { Contact } from "@/types";
import ContactCard from "@/components/contacts/ContactCard";
import DeleteDialog from "@/components/contacts/DeleteDialog";
import EmptyState from "@/components/contacts/EmptyState";
import SearchBar from "@/components/contacts/SearchBar";
import Button from "@/components/ui/Button";
import { ContactListSkeleton } from "@/components/ui/Skeleton";
import { listVariants } from "@/lib/motion";

export default function ContactsPage() {
  const router = useRouter();
  const { fetchAll, remove, filteredContacts, searchQuery, isLoading } = useContactStore();
  const { show } = useToast();

  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const contacts = filteredContacts();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await remove(deleteTarget._id);
      show(`${deleteTarget.name} deleted`, "success");
      setDeleteTarget(null);
    } catch {
      show("Failed to delete contact", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#111827]">Contacts</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            {isLoading ? "Loading…" : `${filteredContacts().length} contact${contacts.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar />
          <Button size="md" onClick={() => router.push("/contacts/new")}>
            <Plus size={15} />
            Add
          </Button>
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <ContactListSkeleton />
      ) : contacts.length === 0 ? (
        <EmptyState isFiltered={!!searchQuery} />
      ) : (
        <motion.div
          variants={listVariants}
          initial="initial"
          animate="animate"
          className="space-y-2"
        >
          <AnimatePresence mode="popLayout">
            {contacts.map((contact) => (
              <ContactCard
                key={contact._id}
                contact={contact}
                onDelete={setDeleteTarget}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <DeleteDialog
        contact={deleteTarget}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
