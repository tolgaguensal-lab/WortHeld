"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bot, MessageSquare, BookOpen, GraduationCap } from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Lernender";

  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Willkommen, {userName}!
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Bereit f&uuml;r deine n&auml;chste Deutsch-Session mit Leo?
        </p>
      </div>

      <Link href="/tutor" className="block">
        <Button
          size="lg"
          className="w-full py-8 text-lg font-semibold shadow-lg shadow-primary/20 gap-3"
        >
          <Bot size={28} />
          Mit Leo lernen
        </Button>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="card-premium">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/30">
              <MessageSquare size={20} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground font-medium">
                Heutige Sessions
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-premium">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground font-medium">
                W&ouml;rter im Review
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-premium">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/30">
              <GraduationCap size={20} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">A1</p>
              <p className="text-xs text-muted-foreground font-medium">
                Aktuelles Level
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
