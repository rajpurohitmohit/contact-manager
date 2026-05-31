"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { cardVariants } from "@/lib/motion";
import { RegisterFormData } from "@/types";

const schema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const router = useRouter();
  const { register: registerUser, login, isLoading } = useAuthStore();
  const { show } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.username, data.email, data.password);
      await login(data.email, data.password);
      show("Account created! Welcome.", "success");
      router.push("/contacts");
    } catch (err: any) {
      show(err.message, "error");
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-8"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#111827] mb-1">Create account</h1>
        <p className="text-sm text-[#6B7280]">Free forever. No credit card required.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Username"
          placeholder="johndoe"
          leftIcon={<User size={15} />}
          error={errors.username?.message}
          {...register("username")}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Mail size={15} />}
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Min. 6 characters"
          leftIcon={<Lock size={15} />}
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock size={15} />}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" className="w-full mt-2" size="lg" isLoading={isLoading}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[#6B7280]">
        Already have an account?{" "}
        <Link href="/login" className="text-[#4F46E5] font-medium hover:text-[#4338CA] transition-colors">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
