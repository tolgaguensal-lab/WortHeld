# Definition of Done (DoD) - WortHeld

Die Definition of Done definiert die Mindestanforderungen, die jedes Ticket oder jede Feature-Entwicklung erfüllen muss, bevor sie als vollständig (Done) betrachtet wird. Ein Ticket gilt erst als abgeschlossen, wenn alle 25 Checkpoints abgehakt sind.

## 🛠️ Technische Integrität & Qualität
- [ ] **Linting:** Code ist gemäß Projekt-Styling-Guide formatiert (`npm run lint` ohne Fehler).
- [ ] **Type-Safety:** TypeScript-Typisierung ist strikt und fehlerfrei (`npm run typecheck` ohne Fehler).
- [ ] **Build-Prozess:** Die App baut fehlerfrei für Produktion (`npm run build`).
- [ ] **Test-Abdeckung:** Neue Logik ist durch Unit-Tests abgedeckt und alle Tests bestehen.
- [ ] **E2E-Validierung:** Kritische User-Flows sind mit Playwright automatisiert und erfolgreich getestet.
- [ ] **Regressions-Check:** Bestehende Features wurden geprüft und funktionieren weiterhin einwandfrei.

## ♿ Barrierefreiheit (WCAG 2.2 AA)
- [ ] **Farbkontrast:** Alle Texte und interaktiven Elemente erfüllen das Kontrastverhältnis von mind. 4.5:1.
- [ ] **Tastatur-Navigation:** Die gesamte Anwendung ist ohne Maus bedienbar (logische Tab-Reihenfolge).
- [ ] **Fokus-Management:** Sichtbare Fokus-Indikatoren sind an allen interaktiven Elementen vorhanden.
- [ ] **Screenreader-Tauglichkeit:** Alle Buttons, Inputs und Bilder haben aussagekräftige Labels/Alt-Texte.
- [ ] **Modal-Barrierefreiheit:** Fokus wird beim Öffnen in das Modal verschoben und beim Schließen zurückgegeben (Focus Trap).
- [ ] **Semantisches HTML:** Korrekte Verwendung von `<h1>`-`<h6>`, `<main>`, `<nav>`, `<section>` und `<article>`.

## 🎨 UX & Interaktionsdesign
- [ ] **Interaktionsverträge:** Das Systemverhalten entspricht exakt den Spezifikationen in `INTERACTION_CONTRACTS.md`.
- [ ] **Keine Dead-Buttons:** Jeder anklickbare Button führt zu einer definierten Aktion oder einem Feedback.
- [ ] **Keine Broken-Links:** Alle internen und externen Verlinkungen führen zum richtigen Ziel.
- [ ] **Formular-Zustände:** Validierungsfehler, Erfolgsmeldungen und Loading-States sind visuell klar definiert.
- [ ] **Leere Zustände:** "Empty States" (z.B. keine Vokabeln vorhanden) sind ansprechend gestaltet und führen den User.
- [ ] **Interaktions-Feedback:** User erhält unmittelbares visuelles oder haptisches Feedback bei Aktionen.

## 📱 Plattform- & Responsive-Check
- [ ] **Desktop-Validierung:** Layout ist auf 1920px und 1440px optimiert und fehlerfrei.
- [ ] **Tablet-Validierung:** Responsives Layout auf 768px-1024px ohne Layout-Breaks.
- [ ] **Mobile-Validierung:** Vollständige Funktionalität und optimierte UX auf 320px-420px.
- [ ] **Touch-Targets:** Interaktive Elemente haben eine Mindestgröße von 44x44px für mobile Nutzung.
- [ ] **Browser-Konsistenz:** Funktionstests in Chrome, Safari (iOS) und Firefox erfolgreich.

## 📋 Akzeptanz & Dokumentation
- [ ] **Akzeptanzkriterien:** Alle im Ticket definierten ACs aus `ACCEPTANCE_CRITERIA.md` sind erfüllt.
- [ ] **Dokumentations-Update:** Technische Änderungen wurden in der API- oder Projekt-Dokumentation ergänzt.
- [ ] **Peer-Review:** Der Code wurde von mindestens einem anderen Entwickler reviewed und freigegeben.
- [ ] **PO-Abnahme:** Das Feature wurde vom Product Owner demonstriert und final abgenommen.
- [ ] **Fehlerfrei:** Keine offenen "Critical" oder "High" Bugs im Zusammenhang mit dem Feature.
