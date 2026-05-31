"use client";

import { create } from "zustand";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { toastVariants } from "@/lib/motion";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toasts: Toast[];
  show: (message: string, type?: ToastType) => void;
  dismiss: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  show: (message, type = "info") => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 3500);
  },
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={16} className="text-[#10B981] shrink-0" />,
  error:   <XCircle    size={16} className="text-[#EF4444] shrink-0" />,
  info:    <AlertCircle size={16} className="text-[#4F46E5] shrink-0" />,
};

const borders: Record<ToastType, string> = {
  success: "border-l-[#10B981]",
  error:   "border-l-[#EF4444]",
  info:    "border-l-[#4F46E5]",
};

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
            className={`
              pointer-events-auto flex items-center gap-3 min-w-[280px] max-w-[360px]
              bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.10)] border border-[#E5E7EB]
              border-l-4 px-4 py-3 ${borders[t.type]}
            `}
          >
            {icons[t.type]}
            <p className="text-sm text-[#111827] flex-1">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
