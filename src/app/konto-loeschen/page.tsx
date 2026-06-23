import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Konto löschen – Wortwende",
  description: "So kannst du dein Wortwende-Konto und alle deine Daten löschen.",
  robots: { index: true, follow: true },
};

export default function KontoLoeschenPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/" className="text-primary hover:underline text-sm mb-6 inline-block">
          ← Zurück zur Startseite
        </Link>
        <h1 className="text-4xl font-display font-bold mb-8">Konto löschen</h1>

        <div className="space-y-6 text-muted-foreground">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">
              So löschst du dein Konto
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <p className="font-medium text-foreground">Melde dich an</p>
                  <p className="text-sm">
                    <Link href="/login" className="text-primary hover:underline">Hier anmelden</Link> und gehe zu den Einstellungen.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <p className="font-medium text-foreground">Einstellungen öffnen</p>
                  <p className="text-sm">
                    Navigiere zu <Link href="/settings" className="text-primary hover:underline">Einstellungen</Link> → Konto → &bdquo;Konto löschen&ldquo;.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <p className="font-medium text-foreground">Löschung bestätigen</p>
                  <p className="text-sm">
                    Bestätige die Löschung. Alle deine Daten werden unwiderruflich gelöscht: Lernfortschritte, Achievements, Vokabeln, Einstellungen und dein Konto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              Was wird gelöscht?
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Dein Benutzerkonto (Name, E-Mail, Passwort)</li>
              <li>Alle Lernfortschritte und abgeschlossene Lektionen</li>
              <li>Alle Achievements und XP</li>
              <li>Alle gespeicherten Vokabeln und Wiederholungen</li>
              <li>Alle Einstellungen und Präferenzen</li>
              <li>Chat-Verlauf mit dem KI-Tutor</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              Was bleibt gespeichert?
            </h2>
            <p className="text-sm mb-2">
              Aus rechtlichen Gründen können folgende Daten für eine begrenzte Zeit gespeichert bleiben:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Zahlungsbelege (10 Jahre, gesetzliche Aufbewahrungspflicht)</li>
              <li>Server-Logs (max. 30 Tage, zur Missbrauchsabwehr)</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              Löschung per E-Mail
            </h2>
            <p className="text-sm">
              Wenn du dich nicht anmelden kannst, sende eine E-Mail an{" "}
              <a href="mailto:hallo@guenlab.de" className="text-primary hover:underline">
                hallo@guenlab.de
              </a>{" "}
              mit dem Betreff &bdquo;Konto löschen&ldquo;. Gib bitte die E-Mail-Adresse an, mit der du registriert bist.
              Wir löschen dein Konto innerhalb von 14 Tagen.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              Vor der Löschung: Daten exportieren
            </h2>
            <p className="text-sm">
              Du kannst vor der Löschung alle deine Daten exportieren (Art. 20 DSGVO). Gehe dazu in die{" "}
              <Link href="/settings" className="text-primary hover:underline">Einstellungen</Link> und klicke auf
              &bdquo;Meine Daten exportieren&ldquo;.
            </p>
          </div>

          <div className="text-sm text-muted-foreground pt-4">
            <p>
              Weitere Informationen findest du in unserer{" "}
              <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
