"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, BookOpen, FileText } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;
  const initials = (user?.name || "U").charAt(0).toUpperCase();
  const level = (user as any)?.placementLevel || "A1";

  const stats = [
    { icon: Trophy, label: "Gesamt-XP", value: "0", hint: "Starte deine erste Lektion" },
    { icon: Flame, label: "Streak", value: "0 Tage", hint: "Taglich lernen" },
    { icon: BookOpen, label: "Lektionen", value: "0", hint: "Wahle einen Kurs" },
    { icon: FileText, label: "Worter", value: "0", hint: "Vokabeln lernen" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Profil</h1>
      <Card className="border-0 shadow-md">
        <CardContent className="p-6 flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl bg-primary/20 text-primary">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user?.name || "Benutzer"}</h2>
            <p className="text-muted-foreground">{user?.email || ""}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="a1">{level}</Badge>
              <Badge variant="secondary">Level 1</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <s.icon size={22} className="mx-auto mb-1 text-primary/60" />
              <p className="text-xl font-bold text-muted-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-[10px] text-muted-foreground/50 mt-1">{s.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-0 shadow-md">
        <CardHeader><CardTitle>Abzeichen</CardTitle></CardHeader>
        <CardContent className="text-center py-8">
          <Trophy size={40} className="mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-muted-foreground">Noch keine Abzeichen freigeschaltet.</p>
          <p className="text-xs text-muted-foreground/50 mt-1">Schliee deine erste Lektion ab!</p>
        </CardContent>
      </Card>
    </div>
  );
}
