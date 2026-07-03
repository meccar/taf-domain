import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image
        src="/taf-logo-dark.svg"
        alt="TAF Viet"
        width={120}
        height={40}
        className="h-10 w-auto dark:hidden"
        priority
      />

      <Image
        src="/taf-logo-light.svg"
        alt="TAF Viet"
        width={120}
        height={40}
        className="hidden h-10 w-auto dark:block"
        priority
      />
    </Link>
  );
}
