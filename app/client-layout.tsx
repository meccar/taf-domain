"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

const variants = {
  hidden: { opacity: 0, y: 15 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={pathname}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </main>
  );
}
