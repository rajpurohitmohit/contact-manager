import { cn, getInitials, getAvatarColor } from "@/lib/utils";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm:  "w-7 h-7 text-xs",
  md:  "w-9 h-9 text-sm",
  lg:  "w-12 h-12 text-base",
  xl:  "w-16 h-16 text-xl",
};

export default function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold shrink-0 select-none",
        sizeMap[size],
        getAvatarColor(name),
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
