"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl font-display font-bold mb-4">Etwas ist schiefgelaufen</h1>
        <p className="text-muted-foreground mb-8">Ein unerwarteter Fehler ist aufgetreten.</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Erneut versuchen</Button>
          <Link href="/"><Button variant="outline">Zurück zur Startseite</Button></Link>
        </div>
      </div>
    </div>
  );
}
