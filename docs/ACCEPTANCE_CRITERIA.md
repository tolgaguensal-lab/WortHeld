# Akzeptanzkriterien (Acceptance Criteria) - Wortwende

Dieses Dokument definiert die funktionalen Anforderungen für die Kernfeatures von Wortwende.

## 1. Landing Page
**Beschreibung:** Die erste Seite für neue Besucher mit Value Proposition und Call-to-Action.
**User Goal:** Verstehen, was Wortwende bietet und sich registrieren.
**Business Goal:** Maximierung der Conversion-Rate (Besucher $\to$ Nutzer).

| ID | Akzeptanzkriterium | Erwartetes Ergebnis | Status |
|:---|:---|:---|:---:|
| AC-LP-001 | Hero-Sektion mit CTA | "Jetzt starten"-Button führt direkt zum Onboarding. | [ ] |
| AC-LP-002 | Feature-Übersicht | Die 3 Kernvorteile (SRS, Gamification, Kontext) sind klar gelistet. | [ ] |
| AC-LP-003 | Social Proof | Testimonials und Nutzerzahlen sind sichtbar und authentisch. | [ ] |
| AC-LP-004 | Responsive Design | Seite ist auf Mobile-Geräten perfekt zentriert und lesbar. | [ ] |

**Nicht Akzeptabel:**
- CTA-Button ist unter dem Fold nicht sichtbar.
- Bilder laden zu langsam (> 3s LCP).

**Test Coverage:** Playwright E2E (Static Page Load), Lighthouse Audit.

---

## 2. Onboarding & Placement Test
**Beschreibung:** Prozess zur Ermittlung des Sprachlevels des neuen Nutzers.
**User Goal:** Schnellstmöglich auf dem richtigen Level starten.
**Business Goal:** Verhindern von Nutzerabwanderung durch zu einfache/schwere Inhalte.

| ID | Akzeptanzkriterium | Erwartetes Ergebnis | Status |
|:---|:---|:---|:---:|
| AC-ON-001 | Level-Einstufung | Fragen werden basierend auf Antworten adaptiv angepasst. | [ ] |
| AC-ON-002 | Zeitlimit/Fortschritt | Fortschrittsbalken zeigt den aktuellen Stand des Tests an. | [ ] |
| AC-ON-003 | Resultats-Seite | Nutzer erhält sofort ein Level (A1-C2) und Empfehlung. | [ ] |
| AC-ON-004 | Account-Erstellung | Ergebnisse werden nach Registrierung dauerhaft gespeichert. | [ ] |

**Nicht Akzeptabel:**
- Nutzer kann den Test ohne Ergebnis abbrechen und verliert alle Daten.
- Test dauert länger als 10 Minuten.

**Test Coverage:** Playwright E2E (Adaptive Flow), Unit Tests (Scoring Logic).

---

## 3. Dashboard
**Beschreibung:** Zentrale Steuerungsebene mit Lernfortschritt und täglichen Zielen.
**User Goal:** Übersicht über den Fortschritt behalten und schnell zum Lernen springen.
**Business Goal:** Steigerung der Daily Active Users (DAU) durch Streaks & Goals.

| ID | Akzeptanzkriterium | Erwartetes Ergebnis | Status |
|:---|:---|:---|:---:|
| AC-DB-001 | Lern-Streak | Aktuelle Serie an aufeinanderfolgenden Lerntagen wird angezeigt. | [ ] |
| AC-DB-002 | Fortschritts-Widget | Prozentuale Fertigstellung des aktuellen Kurses ist sichtbar. | [ ] |
| AC-DB-003 | "Next-up" Call | Direkter Link zur nächsten anstehenden Lektion/Review-Session. | [ ] |
| AC-DB-004 | Ziel-Status | Tägliches Vokabelziel (z.B. 10 Wörter) wird visuell verfolgt. | [ ] |

**Nicht Akzeptabel:**
- Streak-Zähler aktualisiert sich nicht sofort nach Abschluss einer Lektion.
- Dashboard lädt > 2s.

**Test Coverage:** Playwright E2E (Dashboard Navigation), API Snapshot Tests.

---

## 4. Lesson Player (Learn/Courses)
**Beschreibung:** Die interaktive Lernumgebung für Lektionen und Vokabeln.
**User Goal:** Effizient neue Inhalte lernen und anwenden.
**Business Goal:** Hohe User-Retention durch Gamification und Interaktivität.

| ID | Akzeptanzkriterium | Erwartetes Ergebnis | Status |
|:---|:---|:---|:---:|
| AC-LP-001 | Interaktionstypen | Unterstützung von Multiple Choice, Lückentext und Audio-Input. | [ ] |
| AC-LP-002 | Sofort-Feedback | Richtige/Falsche Antworten werden sofort farblich markiert. | [ ] |
| AC-LP-003 | Audio-Wiedergabe | Klick auf Lautsprecher-Icon spielt korrekte Aussprache ab. | [ ] |
| AC-LP-004 | Lektion-Abschluss | Überleitung zur Zusammenfassung und XP-Vergabe. | [ ] |

**Nicht Akzeptabel:**
- Antwort-Feedback verzögert sich um mehr als 200ms.
- Audio-Dateien laden nicht oder sind falsch zugeordnet.

**Test Coverage:** Playwright E2E (Full Lesson Flow), Interaction Contracts.

---

## 5. Review / SRS System (Spaced Repetition)
**Beschreibung:** Intelligentes Wiederholungssystem zur langfristigen Speicherung.
**User Goal:** Vokabeln nicht vergessen, ohne Zeit mit bereits bekannten Wörtern zu verschwenden.
**Business Goal:** Belegbarer Lernerfolg steigert Marktwert der App.

| ID | Akzeptanzkriterium | Erwartetes Ergebnis | Status |
|:---|:---|:---|:---:|
| AC-RS-001 | Algorithmische Planung | Wörter erscheinen basierend auf dem Anki/SM2-Algorithmus. | [ ] |
| AC-RS-002 | Selbst-Einschätzung | Nutzer kann Schwierigkeit der Antwort (Easy, Good, Hard) bewerten. | [ ] |
| AC-RS-003 | Priorisierung | Wörter mit höchster "Vergessenswahrscheinlichkeit" kommen zuerst. | [ ] |
| AC-RS-004 | Review-Queue | Anzeige der Anzahl fälliger Karten für heute. | [ ] |

**Nicht Akzeptabel:**
- Wörter erscheinen zu oft (kein Intervall-Wachstum).
- SRS-Daten werden bei Session-Wechsel nicht synchronisiert.

**Test Coverage:** Unit Tests (SM2 Algorithmus), Integration Tests (DB Sync).

---

## 6. Pricing & Paywall
**Beschreibung:** Monetarisierung durch Abonnements oder Einzelkäufe.
**User Goal:** Einfach und transparent Upgrade-Optionen wählen.
**Business Goal:** Maximierung des Monthly Recurring Revenue (MRR).

| ID | Akzeptanzkriterium | Erwartetes Ergebnis | Status |
|:---|:---|:---|:---:|
| AC-PW-001 | Plan-Vergleich | Klare Gegenüberstellung von Free vs. Premium Features. | [ ] |
| AC-PW-002 | Payment-Integration | Sicherer Checkout via Stripe/PayPal ohne Fehler. | [ ] |
| AC-PW-003 | Paywall-Trigger | Zugriff auf Premium-Lektionen löst Paywall-Modal aus. | [ ] |
| AC-PW-004 | Abo-Status | Nutzerprofil zeigt aktuellen Plan und nächstes Abrechnungsdatum. | [ ] |

**Nicht Akzeptabel:**
- Payment-Prozess bricht ab ohne Fehlermeldung.
- Premium-Inhalte sind für Free-User durch URL-Manipulation erreichbar.

**Test Coverage:** Playwright E2E (Stripe Test-Mode), Security Audit (Paywall Bypass).
