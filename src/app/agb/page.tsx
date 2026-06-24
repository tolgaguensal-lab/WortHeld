import { PublicTopBar } from "@/components/shared/PublicTopBar";

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicTopBar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <a href="/" className="text-primary hover:underline text-sm mb-6 inline-block">← Zurück zur Startseite</a>
        <h1 className="text-4xl font-display font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>
        <div className="space-y-6 text-muted-foreground">
          <h2 className="text-xl font-display font-semibold text-foreground">§ 1 Geltungsbereich</h2>
          <p>Diese AGB gelten für die Nutzung der Lernplattform Wortwende (betrieben von Tolga Günsal, siehe Impressum). Durch die Nutzung unserer Dienste erklären Sie sich mit diesen Bedingungen einverstanden.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">§ 2 Leistungsbeschreibung</h2>
          <p>Wortwende bietet eine interaktive Lernplattform zum Erlernen der deutschen Sprache von Niveau A1 bis C1. Der Service umfasst KI-gestützten Tutor, Lektionen, Übungen, Vokabeltrainer, Grammatik, DTZ-Vorbereitung und Fortschrittsverfolgung.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">§ 3 Registrierung &amp; Vertragsschluss</h2>
          <p>Für die Nutzung ist eine Registrierung mit E-Mail-Adresse und Passwort erforderlich. Mit Abschluss der Registrierung kommt ein kostenloser Nutzungsvertrag zustande. Sie sind für die Vertraulichkeit Ihrer Zugangsdaten verantwortlich.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">§ 4 Preise &amp; Zahlungsbedingungen</h2>
          <p>Die jeweils aktuellen Preise sind auf der Preisseite (<a href="/pricing" className="text-primary hover:underline">/pricing</a>) einsehbar. Alle Preise verstehen sich in Euro inklusive der gesetzlichen Mehrwertsteuer.</p>
          <p>Zahlungen werden über unseren Zahlungsdienstleister Stripe abgewickelt. Die Zahlungsdaten (Kreditkarte, Bankverbindung) werden ausschließlich von Stripe verarbeitet – wir speichern keine Zahlungsdaten. Es gelten die AGB von Stripe: <a href="https://stripe.com/de/legal" className="text-primary hover:underline">stripe.com/de/legal</a>.</p>
          <p>Abonnements verlängern sich automatisch um den gewählten Zeitraum, sofern sie nicht vor Ablauf gekündigt werden. Die Kündigung ist jederzeit in den Einstellungen möglich.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">§ 5 Widerrufsrecht</h2>
          <p><strong>Widerrufsbelehrung:</strong> Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.</p>
          <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Tolga Günsal, E-Mail: hallo@guenlab.de) mittels einer eindeutigen Erklärung (z.B. E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
          <p><strong>Erlöschen des Widerrufsrechts bei digitalen Inhalten:</strong> Bei digitalen Inhalten, die nicht auf einem körperlichen Datenträger geliefert werden, erlischt Ihr Widerrufsrecht, sobald Sie mit der Nutzung der kostenpflichtigen Inhalte begonnen haben und wir Ihnen eine Bestätigung über den Vertragsschluss und den Verlust des Widerrufsrechts übermittelt haben.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">§ 6 Nutzungsrechte</h2>
          <p>Sie erhalten ein nicht-exklusives, nicht übertragbares Recht zur Nutzung der Plattform für persönliche Lernzwecke. Eine kommerzielle Nutzung oder Weitergabe an Dritte ist ohne vorherige schriftliche Genehmigung nicht gestattet.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">§ 7 Haftungsausschluss</h2>
          <p>Wortwende bemüht sich um korrekte und aktuelle Lerninhalte, übernimmt jedoch keine Gewähr für deren Richtigkeit, Vollständigkeit oder Aktualität. Wir haften nicht für Schäden, die aus der Nutzung oder Nichtverfügbarkeit der Plattform entstehen, soweit diese nicht auf Vorsatz oder grober Fahrlässigkeit beruhen.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">§ 8 Kündigung &amp; Account-Löschung</h2>
          <p>Sie können Ihr Konto jederzeit in den Einstellungen löschen (Art. 17 DSGVO). Alle Ihre Daten werden dabei vollständig und endgültig gelöscht. Wir behalten uns das Recht vor, Konten bei Verstößen gegen diese AGB zu sperren oder zu löschen.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">§ 9 Änderungen der AGB</h2>
          <p>Wir behalten uns vor, diese AGB jederzeit zu ändern. Über wesentliche Änderungen werden Sie per E-Mail informiert. Die geänderten AGB gelten als akzeptiert, wenn Sie nicht innerhalb von 4 Wochen widersprechen.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">§ 10 Schlussbestimmungen</h2>
          <p>Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand für alle Streitigkeiten ist der Sitz des Anbieters, soweit der Nutzer Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.</p>
          <p>Verbraucher haben die Möglichkeit, Beschwerden bei der EU-Online-Streitbeilegungsplattform einzureichen: <a href="https://ec.europa.eu/consumers/odr/" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr/</a>. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          <p>Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
        </div>
      </div>
    </div>
  );
}
