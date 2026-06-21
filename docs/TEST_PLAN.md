# Testplan - Wortwende (ISO 29119 konform)

Dieses Dokument beschreibt die Teststrategie und den Testplan für die Qualitätssicherung der Wortwende Applikation.

## 1. Testumfang (Scope)
### 1.1 Testobjekte
- Frontend (Next.js / React)
- API (REST / GraphQL)
- Datenbank (PostgreSQL / Redis)
- Auth-System (NextAuth / Auth.js)
- Spaced Repetition Algorithmus (SM2 Implementation)

### 1.2 Nicht im Umfang (Out of Scope)
- Drittanbieter-Payment-Gateways (Stripe Internals)
- Betriebssystem-spezifische Treiber
- Netzwerk-Infrastruktur der Hosting-Plattform

## 2. Risiken & Prioritäten
| Risiko | Auswirkung | Wahrscheinlichkeit | Priorität | Mitigierung |
|:---|:---|:---|:---|:---|
| Fehler im SRS-Algorithmus | Nutzer lernt ineffizient | Mittel | Hoch | Rigorose Unit-Tests der Logik |
| Paywall-Bypass | Umsatzverlust | Gering | Kritisch | Security-Audit & Server-side Checks |
| Mobile Layout-Breaks | schlechte UX $\to$ Churn | Hoch | Mittel | Playwright Visual Regression Tests |
| API-Latenz | Frustrierte Nutzer | Mittel | Mittel | Caching-Strategie & Loading-States |

## 3. Testtypen & Methoden
- **Unit Tests:** Testen einzelner Funktionen (z.B. Scoring-Logik). Tool: Jest / Vitest.
- **Integration Tests:** Testen von Modul-Interaktionen (z.B. API $\to$ DB).
- **E2E Tests:** Simulation realer Nutzerflüsse. Tool: Playwright.
- **Visual Regression:** Vergleich von Screenshots zur Vermeidung von CSS-Regressions.
- **Accessibility Audit:** Prüfung gegen WCAG 2.2 AA. Tool: Axe / Lighthouse.
- **UAT (User Acceptance Testing):** Validierung der Akzeptanzkriterien durch PO.

## 4. Testumgebung & Daten
- **Umgebung:** Staging-Server (identisch zu Produktion).
- **Browser:** Chrome (Latest), Safari (iOS), Firefox.
- **Testdaten:** 
    - `TEST_USER_FREE`: Nutzer mit Standard-Plan.
    - `TEST_USER_PREMIUM`: Nutzer mit vollem Zugriff.
    - `TEST_USER_NEW`: Nutzer ohne Onboarding.

## 5. Exit-Kriterien
Die Testphase gilt als abgeschlossen, wenn:
- [ ] 100% der "Critical" und "High" Testfälle bestanden sind.
- [ ] Alle Akzeptanzkriterien für das Release erfüllt sind.
- [ ] Die Code-Abdeckung für Kernlogik > 80% beträgt.
- [ ] Keine offenen Blocker-Bugs im Issue-Tracker existieren.

## 6. BDD Scenarios (Gherkin)

### Scenario 1: Erfolgreicher Lektionsabschluss
**Given** ein Nutzer befindet sich in einer Lektion (Level A1)
**When** der Nutzer alle Fragen korrekt beantwortet
**And** auf "Abschluss" klickt
**Then** sollte das System XP-Punkte gutschreiben
**And** den Nutzer zum Dashboard navigieren.

### Scenario 2: SRS-Wiederholung fälliger Vokabeln
**Given** ein Nutzer hat 5 Vokabeln, deren Intervall heute abläuft
**When** der Nutzer den "Review"-Bereich aufruft
**Then** sollten genau diese 5 Vokabeln in der Queue erscheinen.

### Scenario 3: Paywall Trigger
**Given** ein Free-User versucht, eine "Premium Lektion" zu öffnen
**When** der Klick auf die Lektion erfolgt
**Then** sollte das Paywall-Modal angezeigt werden
**And** der Zugriff auf den Lektionsinhalt blockiert bleiben.

### Scenario 4: Onboarding-Einstufung
**Given** ein neuer Nutzer startet den Placement Test
**When** er Fragen auf Level B2 korrekt beantwortet
**Then** sollte das System die Schwierigkeit der folgenden Fragen erhöhen.

### Scenario 5: Password Reset Flow
**Given** ein Nutzer hat sein Passwort vergessen
**When** er seine E-Mail eingibt und den Reset-Link klickt
**Then** sollte er auf eine Seite zur Passworteingabe gelangen
**And** nach Speicherung wieder Login-fähig sein.
