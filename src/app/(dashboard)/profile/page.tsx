"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold">Profil</h1>

      <Card>
        <CardContent className="p-6 flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl font-display bg-primary/20 text-primary">U</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-display font-bold">Benutzer</h2>
            <p className="text-muted-foreground">benutzer@beispiel.de</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="a1">A1</Badge>
              <Badge variant="secondary">Level 1</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: "⚡", label: "Gesamt-XP", value: "0" },
          { icon: "🔥", label: "Streak", value: "0 Tage" },
          { icon: "📖", label: "Lektionen", value: "0" },
          { icon: "📝", label: "Wörter", value: "0" },
        ].map((s, i) => (
          <Card key={i} className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display">Abzeichen</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">Noch keine Abzeichen freigeschaltet.</p>
        </CardContent>
      </Card>
    </div>
  );
}
