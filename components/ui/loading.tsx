"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const dotVariants: Variants = {
  animate: (i: number) => ({
    y: [0, -6, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      delay: i * 0.15,
      ease: "easeInOut" as const,
    },
  }),
};

export function Loading({
  message = "Đang tải...",
  className,
  variant = "inline",
}: {
  message?: string;
  className?: string;
  variant?: "full" | "inline";
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground",
        variant === "full" ? "min-h-svh w-full" : "py-16 w-full",
        className,
      )}
    >
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            custom={i}
            variants={dotVariants}
            animate="animate"
            className="h-2 w-2 rounded-full bg-primary"
          />
        ))}
      </div>
      <span>{message}</span>
    </div>
  );
}
