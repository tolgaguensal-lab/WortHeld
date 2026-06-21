# Quality Gate Prozess - Wortwende

Dieses Dokument beschreibt das Quality Gate Framework für Wortwende. Jede Funktion muss diese Kriterien erfüllen, bevor sie als "Done" markiert und in die Produktion überführt werden kann.

## 🚀 Überblick
Das Quality Gate stellt sicher, dass jede Änderung höchsten Qualitätsstandards in Bezug auf Stabilität, Barrierefreiheit und Benutzererfahrung entspricht.

## 🛠️ Technische Gates (Hard Gates)
Diese Gates müssen automatisiert bestanden werden. Ein Fehlschlag führt zu einem sofortigen Stopp des Deployment-Prozesses.

| ID | Checkpoint | Methode | Erwartetes Ergebnis | Status |
|:---|:---|:---|:---|:---:|
| QG-01 | **Linting** | `npm run lint` | 0 Fehler, 0 Warnungen | [ ] |
| QG-02 | **Typecheck** | `npm run typecheck` | Kein TypeScript-Fehler | [ ] |
| QG-03 | **Production Build** | `npm run build` | Erfolgreicher Build ohne Fehler | [ ] |
| QG-04 | **Unit Tests** | `npm run test` | 100% Pass-Rate | [ ] |
| QG-05 | **E2E Tests** | `npm run test:e2e` | Alle kritischen Pfade erfolgreich | [ ] |

## ♿ Barrierefreiheit & UX (WCAG 2.2 AA)
Manuelle und automatisierte Prüfungen gemäß den WCAG-Richtlinien.

| ID | Checkpoint | Fokus | Kriterium | Status |
|:---|:---|:---|:---|:---:|
| QG-06 | **Kontrast** | Visuell | Kontrastverhältnis mind. 4.5:1 | [ ] |
| QG-07 | **Tastatur** | Interaktion | Alle Elemente per Tab erreichbar | [ ] |
| QG-08 | **Screenreader** | Semantik | Korrekte ARIA-Labels & Rollen | [ ] |
| QG-09 | **Fokus-Indikator**| Visuell | Sichtbarer Fokusring vorhanden | [ ] |
| QG-10 | **Modal-Logik** | UX | Fokus-Trap in Modalen aktiv | [ ] |

## 📱 Geräte- & Plattform-Validierung
Überprüfung der Responsivität und Funktionalität über verschiedene Bildschirmgrößen.

| ID | Checkpoint | Zielplattform | Prüfung | Status |
|:---|:---|:---|:---|:---:|
| QG-11 | **Desktop** | 1920x1080 | Layout-Integrität & Interaktion | [ ] |
| QG-12 | **Tablet** | 768x1024 | Responsives Design & Touch-Targets | [ ] |
| QG-13 | **Mobile** | 375x667 | Mobile-First UX & Performance | [ ] |
| QG-14 | **Browser-Interop**| Chrome/Safari/Firefox | Konsistentes Rendering | [ ] |

## 📋 Funktionale Validierung & Verträge
Sicherstellung, dass die Geschäftslogik und Interaktionsverträge eingehalten werden.

| ID | Checkpoint | Dokumentation | Validierung | Status |
|:---|:---|:---|:---|:---:|
| QG-15 | **Akzeptanzkriterien**| `ACCEPTANCE_CRITERIA.md` | Alle ACs für Feature erfüllt | [ ] |
| QG-16 | **Interaktionsverträge**| `INTERACTION_CONTRACTS.md` | Systemantwort entspricht Vertrag | [ ] |
| QG-17 | **Keine Dead-Buttons**| Manuell | Jeder Button löst Aktion aus | [ ] |
| QG-18 | **Keine Broken-Links**| Manuell/Crawler | Alle internen Links funktionieren | [ ] |
| QG-19 | **Formular-Validierung**| Manuell | Fehlerzustände korrekt angezeigt | [ ] |
| QG-20 | **Loading-States** | Manuell | Ladeanimationen bei API-Calls | [ ] |

## 🔄 Regressions- & Stabilitätstests
Sicherstellung, dass bestehende Funktionen nicht durch neue Änderungen beeinträchtigt werden.

| ID | Checkpoint | Methode | Fokus | Status |
|:---|:---|:---|:---|:---:|
| QG-21 | **Kritische Pfade** | Regression-Suite | Login -> Kurs -> Abschluss | [ ] |
| QG-22 | **Edge-Case Tests** | Manuell | Leere Zustände, Netzwerkfehler | [ ] |
| QG-23 | **Performance-Check**| Lighthouse | LCP < 2.5s / CLS < 0.1 | [ ] |
| QG-24 | **Memory-Leaks** | DevTools | Keine signifikanten Leaks in SPAs | [ ] |
| QG-25 | **Final Review** | Peer Review | Code-Review & Design-QA bestanden | [ ] |
