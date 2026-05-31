"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { cardVariants } from "@/lib/motion";
import { LoginFormData } from "@/types";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const { show } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      show("Welcome back!", "success");
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
        <h1 className="text-2xl font-semibold text-[#111827] mb-1">Sign in</h1>
        <p className="text-sm text-[#6B7280]">Enter your credentials to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="••••••••"
          leftIcon={<Lock size={15} />}
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="w-full mt-2" size="lg" isLoading={isLoading}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[#6B7280]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[#4F46E5] font-medium hover:text-[#4338CA] transition-colors">
          Create one
        </Link>
      </p>
    </motion.div>
  );
}
