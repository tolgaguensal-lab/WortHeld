"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <p>
            🍪 Diese Website verwendet <strong>ausschließlich technisch notwendige Cookies</strong> für die Anmeldung
            und den Lernfortschritt. Kein Tracking, keine Werbung, keine Weitergabe an Dritte.{" "}
            <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={decline}>Nur notwendige</Button>
          <Button variant="accent" size="sm" onClick={accept}>Verstanden</Button>
        </div>
      </div>
    </div>
  );
}
