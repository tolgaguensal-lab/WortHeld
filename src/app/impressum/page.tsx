import { PublicTopBar } from "@/components/shared/PublicTopBar";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicTopBar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <a href="/" className="text-primary hover:underline text-sm mb-6 inline-block">← Zurück zur Startseite</a>
        <h1 className="text-4xl font-display font-bold mb-8">Impressum</h1>
        <div className="space-y-6 text-muted-foreground">
          <h2 className="text-xl font-display font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
          <p><strong>Wortwende</strong><br />Tolga Günsal<br />{/* TODO_LEGAL_REQUIRED: Straße und Hausnummer eintragen */}<br />{/* TODO_LEGAL_REQUIRED: PLZ und Stadt eintragen */}<br />Deutschland</p>
          <p>E-Mail: hallo@guenlab.de</p>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [folgt]</p>

          <h2 className="text-xl font-display font-semibold text-foreground">Kontakt</h2>
          <p>E-Mail: hallo@guenlab.de</p>

          <h2 className="text-xl font-display font-semibold text-foreground">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>Tolga Günsal (Anschrift wie oben)</p>

          <h2 className="text-xl font-display font-semibold text-foreground">Haftung für Inhalte</h2>
          <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Bei Bekanntwerden von Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">Haftung für Links</h2>
          <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">EU-Streitschlichtung</h2>
          <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr/</a>. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </div>
      </div>
    </div>
  );
}
