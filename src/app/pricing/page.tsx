"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Sparkles, Shield, GraduationCap, Zap } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    level: "A1",
    name: "Anfanger",
    price: "Kostenlos",
    description: "Grundlagen fur absolute Anfanger",
    features: ["Sich vorstellen", "Zahlen & Uhrzeit", "Familie & Herkunft", "Einfache Satze", "Alltagssituationen", "500+ Vokabeln", "15 Grammatikthemen"],
    popular: false,
    color: "emerald",
  },
  {
    level: "A2",
    name: "Grundkenntnisse",
    price: "14,99 €",
    period: "einmalig",
    description: "Alltagssituationen sicher bewaltigen",
    features: ["Einkaufen & Restaurant", "Arzt & Gesundheit", "Wohnen & Vermieter", "Amt & Behorden", "Kurze Texte verstehen", "1000+ Vokabeln", "30 Grammatikthemen"],
    popular: false,
    color: "sky",
  },
  {
    level: "B1",
    name: "Fortgeschritten",
    price: "24,99 €",
    period: "einmalig",
    description: "Selbstandig im Alltag und Beruf",
    features: ["Arbeit & Bewerbung", "Meinung außern", "Briefe & E-Mails", "Prufungsvorbereitung", "Diskussionen fuhren", "2000+ Vokabeln", "45 Grammatikthemen"],
    popular: true,
    color: "amber",
  },
  {
    level: "B2",
    name: "Selbstandig",
    price: "29,99 €",
    period: "einmalig",
    description: "Komplexe Kommunikation in Beruf & Gesellschaft",
    features: ["Berufssprache", "Prasentationen", "Komplexe Texte", "Diskussionen & Argumentation", "Fachtexte verstehen", "4000+ Vokabeln", "60 Grammatikthemen"],
    popular: false,
    color: "purple",
  },
  {
    level: "C1",
    name: "Kompetent",
    price: "34,99 €",
    period: "einmalig",
    description: "Akademisches und berufliches Expertenniveau",
    features: ["Akademische Sprache", "Formelle Kommunikation", "Prasentationen", "Komplexe Grammatik", "Fachsprache", "8000+ Vokabeln", "70+ Grammatikthemen"],
    popular: false,
    color: "rose",
  },
];

const bundlePrice = "79,99 €";
const bundleSaved = "25,00 €";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary/60 text-xs font-medium mb-6">
            <Sparkles size={12} className="text-primary" />
            GER/CEFR Niveaus
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Wahle dein Sprachniveau
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Jedes Niveau orientiert sich am Gemeinsamen Europaischen Referenzrahmen (GER/CEFR). 
            Einmal kaufen, dauerhaft lernen.
          </p>
        </div>

        {/* Bundle Card */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card className="card-premium overflow-hidden border-primary/30 bg-gradient-to-r from-primary/5 to-primary/[0.02]">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap size={28} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge-premium bg-primary/10 text-primary border-primary/20">Empfohlen</span>
                    <span className="text-xs text-muted-foreground">Besonders gunstig</span>
                  </div>
                  <h2 className="text-xl font-display font-bold text-foreground">Komplettpaket A1 – C1</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">Alle 5 Niveaus in einem Paket – sparst {bundleSaved}</p>
                </div>
              </div>
              <div className="text-center md:text-right shrink-0">
                <div className="text-3xl font-display font-bold text-foreground">{bundlePrice}</div>
                <div className="text-xs text-muted-foreground line-through mb-3">{Number(bundlePrice.replace(",",".").replace(" €","")) + Number(bundleSaved.replace(",",".").replace(" €",""))} €</div>
                <Button className="w-full md:w-auto shadow-lg shadow-primary/20 group">
                  Alle freischalten <ArrowRight size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Individual Level Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {tiers.map((tier) => (
            <Card key={tier.level} className={`card-premium p-5 flex flex-col ${tier.popular ? "ring-2 ring-amber-400/40" : ""}`}>
              {tier.popular && (
                <div className="text-center mb-3">
                  <span className="badge-premium bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800 text-xs">
                    Beliebt
                  </span>
                </div>
              )}
              <div className="text-center mb-4">
                <div className={`text-3xl font-display font-bold text-${tier.color}-600 dark:text-${tier.color}-400 mb-1`}>{tier.level}</div>
                <div className="text-sm font-semibold text-foreground">{tier.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{tier.description}</div>
              </div>
              <div className="text-center mb-4">
                <div className="text-2xl font-display font-bold text-foreground">{tier.price}</div>
                {tier.period && <div className="text-[10px] text-muted-foreground">{tier.period}</div>}
              </div>
              <ul className="space-y-2 mb-5 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.level === "A1" ? "outline" : "default"}
                className={`w-full ${tier.level === "A1" ? "" : "shadow-lg shadow-primary/20"}`}
              >
                {tier.level === "A1" ? "Kostenlos starten" : "Freischalten"}
                {tier.level !== "A1" && <ArrowRight size={14} className="ml-1" />}
              </Button>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto mt-20 pt-12 border-t border-border/60">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Haufige Fragen</h2>
          <div className="space-y-4">
            {[
              ["Muss ich jedes Niveau einzeln kaufen?", "Nein, mit dem Komplettpaket sparst du und erhaltst alle Niveaus auf einmal."],
              ["Wie lange habe ich Zugriff?", "Nach dem Kauf hast du unbegrenzten Zugriff auf das Niveau – ohne Abo-Pflicht."],
              ["Kann ich spater upgraden?", "Ja, du kannst jederzeit weitere Niveaus freischalten oder auf das Komplettpaket upgraden."],
              ["Ist A1 wirklich kostenlos?", "Ja, das A1-Niveau ist komplett kostenlos. Du kannst es ohne Einschrankung nutzen."],
            ].map(([q, a], i) => (
              <details key={i} className="group p-4 rounded-xl border border-border/60 bg-card">
                <summary className="font-medium text-foreground text-sm cursor-pointer">{q}</summary>
                <p className="text-muted-foreground text-sm mt-2">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
