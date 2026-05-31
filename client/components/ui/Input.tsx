import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#374151]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-10 rounded-[8px] border bg-white px-3 text-sm text-[#111827] placeholder:text-[#9CA3AF]",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-0 focus:border-[#4F46E5]",
              error
                ? "border-[#EF4444] focus:ring-[#EF4444] focus:border-[#EF4444]"
                : "border-[#E5E7EB] hover:border-[#D1D5DB]",
              leftIcon && "pl-9",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-[#EF4444]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-[#9CA3AF]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
