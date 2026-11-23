"use client";

import { motion } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

const bandContainer = "mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-8 lg:px-12";

export function MotionSection({
  children,
  className = "",
  id,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted";
}) {
  const animation = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  };

  if (!tone) {
    return (
      <motion.section id={id} {...animation} className={className}>
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      {...animation}
      className={cn("scroll-mt-24", tone === "muted" && "bg-muted/30")}
    >
      <div className={cn(bandContainer, className)}>{children}</div>
    </motion.section>
  );
}

export function MotionCard({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
