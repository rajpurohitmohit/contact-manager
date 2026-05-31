import { create } from "zustand";
import { contactsApi } from "@/lib/api/contacts";
import { Contact, ContactFormData } from "@/types";

interface ContactStore {
  contacts: Contact[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  filteredContacts: () => Contact[];
  fetchAll: () => Promise<void>;
  create: (data: ContactFormData) => Promise<Contact>;
  update: (id: string, data: ContactFormData) => Promise<void>;
  remove: (id: string) => Promise<void>;
  setSearch: (query: string) => void;
  clearError: () => void;
}

export const useContactStore = create<ContactStore>((set, get) => ({
  contacts: [],
  searchQuery: "",
  isLoading: false,
  error: null,

  filteredContacts: () => {
    const { contacts, searchQuery } = get();
    if (!searchQuery.trim()) return contacts;
    const q = searchQuery.toLowerCase();
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
  },

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await contactsApi.getAll();
      set({ contacts: data });
    } catch (err: any) {
      set({ error: err.response?.data?.message ?? "Failed to load contacts" });
    } finally {
      set({ isLoading: false });
    }
  },

  create: async (data) => {
    const { data: contact } = await contactsApi.create(data);
    set((s) => ({ contacts: [contact, ...s.contacts] }));
    return contact;
  },

  update: async (id, data) => {
    const { data: updated } = await contactsApi.update(id, data);
    set((s) => ({
      contacts: s.contacts.map((c) => (c._id === id ? updated : c)),
    }));
  },

  remove: async (id) => {
    await contactsApi.remove(id);
    set((s) => ({ contacts: s.contacts.filter((c) => c._id !== id) }));
  },

  setSearch: (query) => set({ searchQuery: query }),
  clearError: () => set({ error: null }),
}));
