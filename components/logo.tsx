import { Theme } from "@/const/theme.const";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const src =
    !mounted || resolvedTheme === Theme.Light
      ? "/taf-logo-dark.svg"
      : "/taf-logo-light.svg";

  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image
        src={src}
        alt="TAF Viet"
        width={120}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </Link>
  );
}
