"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
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

      <Card>
        <CardHeader><CardTitle className="font-display text-destructive">Konto</CardTitle></CardHeader>
        <CardContent>
          <Button variant="destructive">Konto löschen</Button>
        </CardContent>
      </Card>
    </div>
  );
}
