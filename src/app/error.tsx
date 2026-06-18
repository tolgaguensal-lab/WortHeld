"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} className="text-destructive" />
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Etwas ist schiefgelaufen</h1>
        <p className="text-muted-foreground mb-8">Ein unerwarteter Fehler ist aufgetreten.</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} className="shadow-lg shadow-primary/20"><RefreshCw size={16} className="mr-2" />Erneut versuchen</Button>
          <Link href="/"><Button variant="outline"><ArrowLeft size={16} className="mr-2" />Startseite</Button></Link>
        </div>
      </div>
    </div>
  );
}
