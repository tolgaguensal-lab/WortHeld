import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";

export function PublicTopBar() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
      <Link href="/" className="flex items-center gap-2.5" aria-label="Zur Startseite">
        <LogoMark size={32} />
        <span className="font-display font-extrabold text-lg text-primary">Wortwende</span>
      </Link>
    </div>
  );
}
