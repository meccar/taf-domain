"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Props } from "@/components/theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function ClientLayout({ children }: Props) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="w-full flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </main>
  );
}
