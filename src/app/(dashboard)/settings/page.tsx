"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Download, Trash2, Shield } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      const res = await fetch("/api/user", { method: "PATCH" });
      if (res.ok) {
        const data = await res.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `wortwende-daten-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch { /* ignore */ }
    setExporting(false);
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch("/api/user", { method: "DELETE" });
      if (res.ok) {
        await signOut({ callbackUrl: "/?deleted=true" });
      }
    } catch { /* ignore */ }
    setDeleting(false);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold">Einstellungen</h1>

      <Card>
        <CardHeader><CardTitle className="font-display">Allgemein</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><Label>Dunkler Modus</Label><p className="text-sm text-muted-foreground">Zwischen hellem und dunklem Modus wechseln</p></div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div><Label>Sound-Effekte</Label><p className="text-sm text-muted-foreground">Töne bei richtigen/falschen Antworten</p></div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="font-display">Lernen</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><Label>Tagesziel</Label><p className="text-sm text-muted-foreground">50 XP pro Tag</p></div>
            <Button variant="outline" size="sm">Ändern</Button>
          </div>
          <div className="flex items-center justify-between">
            <div><Label>Benachrichtigungen</Label><p className="text-sm text-muted-foreground">Tägliche Lern-Erinnerung</p></div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Datenschutz & Daten */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2"><Shield size={18} /> Datenschutz</CardTitle>
          <CardDescription>Deine Daten gehören dir. DSGVO-konform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full" onClick={handleExport} disabled={exporting}>
            <Download size={16} className="mr-2" />
            {exporting ? "Wird exportiert..." : "Meine Daten exportieren (Art. 20 DSGVO)"}
          </Button>
          <p className="text-xs text-muted-foreground">Lädt alle deine Lernfortschritte, Achievements und Vokabeln als JSON-Datei herunter.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="font-display text-destructive">Konto</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full" onClick={() => signOut()}>Abmelden</Button>

          {!showDeleteConfirm ? (
            <Button variant="destructive" className="w-full" onClick={() => setShowDeleteConfirm(true)}>
              <Trash2 size={16} className="mr-2" />Konto löschen
            </Button>
          ) : (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-destructive">Bist du sicher?</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Alle deine Daten werden unwiderruflich gelöscht: Lernfortschritte, Achievements, Vokabeln, Einstellungen und dein Konto. Das kann nicht rückgängig gemacht werden.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
                  {deleting ? "Wird gelöscht..." : "Ja, endgültig löschen"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>Abbrechen</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
