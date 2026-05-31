"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { Contact } from "@/types";
import Button from "@/components/ui/Button";
import { modalVariants, overlayVariants } from "@/lib/motion";

interface DeleteDialogProps {
  contact: Contact | null;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteDialog({ contact, isLoading, onConfirm, onCancel }: DeleteDialogProps) {
  return (
    <AnimatePresence>
      {contact && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
            onClick={onCancel}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pointer-events-auto bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#E5E7EB] w-full max-w-[380px] p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                  <Trash2 size={18} className="text-[#EF4444]" />
                </div>
                <button
                  onClick={onCancel}
                  className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <h2 className="text-[#111827] font-semibold text-lg mb-1">Delete contact</h2>
              <p className="text-sm text-[#6B7280] mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium text-[#111827]">{contact.name}</span>?
                This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={onCancel}>
                  Cancel
                </Button>
                <Button variant="destructive" className="flex-1" isLoading={isLoading} onClick={onConfirm}>
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
