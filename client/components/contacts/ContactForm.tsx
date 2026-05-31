"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Phone } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ContactFormData } from "@/types";

const schema = z.object({
  name:  z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number"),
});

interface ContactFormProps {
  defaultValues?: Partial<ContactFormData>;
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading: boolean;
  submitLabel: string;
}

export default function ContactForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Full name"
        placeholder="Jane Smith"
        leftIcon={<User size={15} />}
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Email address"
        type="email"
        placeholder="jane@example.com"
        leftIcon={<Mail size={15} />}
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Phone number"
        type="tel"
        placeholder="+1 (555) 000-0000"
        leftIcon={<Phone size={15} />}
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Button type="submit" size="lg" className="w-full mt-2" isLoading={isLoading}>
        {submitLabel}
      </Button>
    </form>
  );
}
