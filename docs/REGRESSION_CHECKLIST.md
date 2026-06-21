# Regressions-Checkliste (Regression Testing) - Wortwende

Dieses Dokument dient als Leitfaden, um sicherzustellen, dass neue Code-Änderungen keine bestehenden Funktionen beeinträchtigen.

## 🛠️ Schritt 1: Automatisierte Gates (Pre-Flight)
Vor jedem Merge müssen diese Befehle lokal oder in der CI erfolgreich durchlaufen:

- [ ] **Linting:** `npm run lint` (Keine Syntax- oder Style-Fehler)
- [ ] **Typecheck:** `npm run typecheck` (Keine TS-Typ-Fehler)
- [ ] **Build:** `npm run build` (Erfolgreicher Production-Build)
- [ ] **Unit Tests:** `npm run test` (Alle Logik-Tests bestanden)
- [ ] **E2E Suite:** `npm run test:e2e` (Alle kritischen Pfade bestanden)

## 🔍 Schritt 2: Manuelle Verifizierung (Smoke Test)
Prüfe folgende Kernbereiche nach jeder signifikanten Änderung:

### 🏠 Navigation & Core
- [ ] Landing Page $\to$ Onboarding Flow funktioniert.
- [ ] Login / Logout Flow funktioniert.
- [ ] Dashboard lädt korrekt und zeigt aktuelle Stats.

### 📚 Lern-Loop (Kritisch)
- [ ] Lektion starten $\to$ Antworten geben $\to$ Lektion beenden.
- [ ] Audio-Buttons in Lektionen funktionieren.
- [ ] Fortschrittsbalken aktualisiert sich korrekt.

### 🔄 Review System (SRS)
- [ ] Fällige Karten werden in der Review-Queue angezeigt.
- [ ] Bewertung einer Karte (Easy/Good/Hard) aktualisiert den State.
- [ ] Review-Session kann erfolgreich abgeschlossen werden.

### 💳 Payment & Account
- [ ] Paywall erscheint bei Premium-Inhalten.
- [ ] Profil-Einstellungen können geändert und gespeichert werden.

## 📱 Schritt 3: Plattform-Check
- [ ] **Mobile:** Checke die betroffenen Seiten auf einem Smartphone (oder DevTools Mobile View).
- [ ] **Tablet:** Prüfe das Layout auf Tablet-Breite (ca. 768px).
- [ ] **Cross-Browser:** Kurzer Check in Safari (falls Chrome genutzt wurde) wegen CSS-Differenzen.

## 🚩 Schritt 4: Was zu prüfen ist (Change-Specific)
Je nachdem, was geändert wurde, gelten folgende Zusatzregeln:

| Wenn geändert wurde... | Dann unbedingt prüfen... |
|:---|:---|
| **CSS / Styling** | Alle anderen Seiten auf Layout-Shifts (Z-Index, Margins). |
| **API / DB Schema** | Alle Reads/Writes dieser Entität in der gesamten App. |
| **Auth-Logik** | Session-Persistence nach Page-Refresh. |
| **SRS-Algorithmus** | Intervall-Berechnungen mit Mock-Daten. |
| **A11y-Updates** | Tastatur-Navigation im betroffenen Bereich. |

## ✅ Finale Freigabe
- [ ] Alle automatisierten Tests grün.
- [ ] Smoke-Test bestanden.
- [ ] Keine neuen visuellen Regressionen.
- [ ] Dokumentation (falls nötig) aktualisiert.
