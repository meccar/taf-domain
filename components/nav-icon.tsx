"use client";
import { useLinkStatus } from "next/link";

export function NavIcon({ icon: Icon }: { icon: React.ElementType }) {
  const { pending } = useLinkStatus();
  return <Icon className={pending ? "animate-pulse" : ""} />;
}
