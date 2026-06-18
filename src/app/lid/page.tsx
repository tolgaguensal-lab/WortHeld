import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { BookOpen, Landmark, Scale, Flag, Users, MapPin, Globe } from "lucide-react";

const topics = [
  {
    icon: Landmark,
    title: "Geschichte & Verantwortung",
    items: [
      "Das Grundgesetz und die Grundrechte",
      "Demokratie, Rechtsstaat, Sozialstaat",
      "Deutsche Geschichte: 1933–1945",
      "Wiedervereinigung 1990",
      "Deutschland in der EU",
    ],
  },
  {
    icon: Users,
    title: "Menschen & Gesellschaft",
    items: [
      "Familienformen in Deutschland",
      "Gleichberechtigung von Mann und Frau",
      "Religionsfreiheit und Trennung von Staat und Kirche",
      "Ehrenamt und bürgerliches Engagement",
      "Demografische Entwicklung",
    ],
  },
  {
    icon: Scale,
    title: "Recht & Alltag",
    items: [
      "Das deutsche Rechtssystem",
      "Rechte und Pflichten als Bürger/in",
      "Arbeitsrecht und Sozialversicherung",
      "Ehe, Familie, Kinder — rechtliche Grundlagen",
      "Nachbarschaftsrecht und Mietrecht",
    ],
  },
  {
    icon: MapPin,
    title: "Geografie & Regionen",
    items: [
      "Die 16 Bundesländer",
      "Wichtige Städte und Regionen",
      "Flüsse, Gebirge, Nachbarländer",
      "Stadt und Land — Unterschiede",
      "Klima und Umwelt in Deutschland",
    ],
  },
  {
    icon: Globe,
    title: "Kultur & Integration",
    items: [
      "Feste und Feiertage in Deutschland",
      "Vereinskultur und Freizeit",
      "Bildungssystem: Schule, Ausbildung, Studium",
      "Medienlandschaft und Meinungsfreiheit",
      "Integration und kulturelle Vielfalt",
    ],
  },
];

const quizQuestions = [
  {
    q: "Wie heißt das deutsche Grundgesetz?",
    options: ["Verfassung", "Grundgesetz", "Bundesgesetz", "Staatsvertrag"],
    correct: 1,
  },
  {
    q: "Wie viele Bundesländer hat Deutschland?",
    options: ["14", "15", "16", "17"],
    correct: 2,
  },
  {
    q: "Wer wählt den Deutschen Bundestag?",
    options: ["Der Bundesrat", "Das Volk", "Der Bundespräsident", "Die Länder"],
    correct: 1,
  },
  {
    q: "Was ist keine Aufgabe des Staates?",
    options: ["Schulen bauen", "Straßen bauen", "Private Firmen leiten", "Polizei bereitstellen"],
    correct: 2,
  },
];

export default function LebenInDeutschlandPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <PageHeader
        title="Leben in Deutschland"
        description="Vorbereitung auf den Orientierungskurs-Test — alles über Geschichte, Recht, Gesellschaft und Kultur in Deutschland."
      />

      {/* Overview */}
      <Card variant="elevated" className="p-6">
        <div className="flex items-start gap-4">
          <Flag size={24} className="text-primary shrink-0 mt-1" />
          <div>
            <h3 className="font-display font-semibold text-foreground mb-2">Der Orientierungskurs</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Der Orientierungskurs ist Teil des Integrationskurses. In 100 Unterrichtsstunden lernst du
              die deutsche Rechtsordnung, Geschichte, Kultur und das politische System kennen. Der Test
              &ldquo;Leben in Deutschland&rdquo; (LiD) ist die Abschlussprüfung. Mit Bestehen erhältst
              du das Zertifikat &ldquo;Integrationskurs&rdquo;.
            </p>
          </div>
        </div>
      </Card>

      {/* Topics */}
      <div className="grid md:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <Card key={topic.title} variant="default" className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary-muted flex items-center justify-center">
                <topic.icon size={16} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{topic.title}</h3>
            </div>
            <ul className="space-y-1.5">
              {topic.items.map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary/40 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Quiz Preview */}
      <section>
        <h3 className="text-xl font-display font-semibold text-foreground mb-4">Teste dein Wissen</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Der LiD-Test enthält 33 Fragen, davon 3 Fragen zu deinem Bundesland. Zum Bestehen brauchst du 15 richtige Antworten.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {quizQuestions.map((q, i) => (
            <Card key={i} variant="outline" className="p-4">
              <p className="text-sm font-medium text-foreground mb-3">{i + 1}. {q.q}</p>
              <div className="grid grid-cols-2 gap-1.5">
                {q.options.map((opt, j) => (
                  <div
                    key={j}
                    className={`px-3 py-1.5 rounded-lg text-xs ${
                      j === q.correct
                        ? "bg-success-muted text-success font-medium"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + j)}) {opt}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* BAMF Note */}
      <Card variant="outline" className="p-4 bg-primary-muted/5 border-primary/10">
        <p className="text-xs text-muted-foreground text-center">
          Diese Inhalte orientieren sich am Curriculum für den Orientierungskurs des BAMF
          (100 Unterrichtsstunden). Der offizielle Test &ldquo;Leben in Deutschland&rdquo;
          wird vom Bundesamt für Migration und Flüchtlinge durchgeführt.
        </p>
      </Card>
    </div>
  );
}
