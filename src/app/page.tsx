import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-white tracking-tight">WortHeld</span>
          <span className="hidden sm:inline text-xs text-blue-300/60 font-medium uppercase tracking-wider">Deutsch lernen</span>
        </div>
        <div className="flex gap-3">
          <Link href="/login"><Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">Anmelden</Button></Link>
          <Link href="/register"><Button className="bg-white text-slate-900 hover:bg-white/90 font-semibold">Kostenlos starten</Button></Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        {/* Hero */}
        <section className="text-center mb-28">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
            BAMF-konforme Integrationskurse — A1 bis C1
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight tracking-tight">
            Deutsch für<br /><span className="text-blue-300">Alltag, Beruf &amp; Integration</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Systematischer Lernpfad nach dem Gemeinsamen Europäischen Referenzrahmen.
            Entwickelt für Integrationskurse, Berufsvorbereitung und DTZ-Prüfung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register"><Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 text-lg px-10 py-6 shadow-xl font-semibold">Kostenlos starten</Button></Link>
            <Link href="/login"><Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 text-lg px-10 py-6">Ich habe bereits ein Konto</Button></Link>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 mb-28">
          {[
            { title: "CEFR-Strukturiert", desc: "Lernpfade für A1, A2, B1, B2, C1 — ausgerichtet am Gemeinsamen Europäischen Referenzrahmen" },
            { title: "Alltagsorientiert", desc: "Lebensnahe Themen: Arbeit, Wohnungssuche, Arztbesuche, Behördengänge, Bank, Versicherung" },
            { title: "Prüfungsvorbereitung", desc: "DTZ, Goethe-Zertifikat, telc — gezielte Übungen und Testsimulationen" },
            { title: "Alle Fertigkeiten", desc: "Lesen, Hören, Schreiben, Sprechen — systematisch aufgebaut nach BAMF-Rahmenplan" },
            { title: "Wissenschaftlich", desc: "Spaced Repetition, Fehleranalyse, personalisierte Wiederholungen für nachhaltigen Lernerfolg" },
            { title: "Mehrsprachig", desc: "Erklärungen auf Türkisch, Russisch, Arabisch, Polnisch, Englisch, Rumänisch, Ukrainisch, Albanisch, Kurdisch, Italienisch" },
          ].map((f, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-white border border-white/10 hover:bg-white/10 transition-all">
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Niveaustufen */}
        <section className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Deine Niveaustufen</h2>
          <p className="text-white/50 mb-10 max-w-xl mx-auto">
            Vom Anfänger bis zur beruflichen Sprachkompetenz — jeder Schritt ist genau definiert.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { level: "A1", desc: "Anfänger", detail: "Einfache Sätze, sich vorstellen", color: "from-blue-500/20 to-blue-600/20 border-blue-500/30" },
              { level: "A2", desc: "Grundkenntnisse", detail: "Alltagssituationen bewältigen", color: "from-teal-500/20 to-teal-600/20 border-teal-500/30" },
              { level: "B1", desc: "Selbstständig", detail: "DTZ-Prüfung, Arbeitsplatz", color: "from-amber-500/20 to-amber-600/20 border-amber-500/30" },
              { level: "B2", desc: "Fortgeschritten", detail: "Komplexe Gespräche führen", color: "from-orange-500/20 to-orange-600/20 border-orange-500/30" },
              { level: "C1", desc: "Kompetent", detail: "Akademisches Niveau", color: "from-red-500/20 to-red-600/20 border-red-500/30" },
            ].map((l) => (
              <div key={l.level} className={`bg-gradient-to-br ${l.color} border backdrop-blur-sm rounded-xl px-6 py-4 text-white text-left min-w-[180px]`}>
                <div className="text-2xl font-display font-bold">{l.level}</div>
                <div className="text-sm text-white/70">{l.desc}</div>
                <div className="text-xs text-white/40 mt-1">{l.detail}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">WortHeld &copy; {new Date().getFullYear()}</p>
          <div className="flex gap-6 text-sm">
            <Link href="/datenschutz" className="text-white/40 hover:text-white/70">Datenschutz</Link>
            <Link href="/impressum" className="text-white/40 hover:text-white/70">Impressum</Link>
            <Link href="/agb" className="text-white/40 hover:text-white/70">AGB</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
