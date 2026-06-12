import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-display font-bold mb-4">Seite nicht gefunden</h1>
        <p className="text-muted-foreground mb-8">Die Seite, die du suchst, existiert nicht.</p>
        <Link href="/"><Button>Zurück zur Startseite</Button></Link>
      </div>
    </div>
  );
}
