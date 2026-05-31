import client from "./client";
import { Contact, ContactFormData } from "@/types";

export const contactsApi = {
  getAll: () => client.get<Contact[]>("/api/contacts"),

  getOne: (id: string) => client.get<Contact>(`/api/contacts/${id}`),

  create: (data: ContactFormData) =>
    client.post<Contact>("/api/contacts", data),

  update: (id: string, data: ContactFormData) =>
    client.put<Contact>(`/api/contacts/${id}`, data),

  remove: (id: string) =>
    client.delete<Contact>(`/api/contacts/${id}`),
};
