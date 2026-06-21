# Barrierefreiheits-Checkliste (Accessibility) - Wortwende

Diese Checkliste basiert auf den **WCAG 2.2 Level AA** Richtlinien und stellt sicher, dass Wortwende für alle Menschen zugänglich ist.

## 🎨 Visuelle Gestaltung
- [ ] **Farbkontrast (Text):** Alle Texte haben ein Kontrastverhältnis von mindestens 4.5:1 zum Hintergrund (3:1 für großen Text).
- [ ] **Farbkontrast (UI):** Grafische Elemente (Icons, Rahmen von Inputs) haben ein Verhältnis von mindestens 3:1.
- [ ] **Farbe als einzige Information:** Informationen werden nicht ausschließlich durch Farbe vermittelt (z.B. Fehlerzustände haben zusätzlich Icons oder Text).
- [ ] **Text-Skalierung:** Die Seite bleibt funktional und lesbar bei einer Browser-Zoomung von bis zu 200%.

## ⌨️ Tastatur & Fokus
- [ ] **Tastatur-Zugänglichkeit:** Alle Funktionen sind ohne Maus bedienbar.
- [ ] **Fokus-Reihenfolge:** Die Tab-Reihenfolge ist logisch und folgt dem visuellen Layout (Top-to-Bottom, Left-to-Right).
- [ ] **Sichtbarer Fokus:** Alle interaktiven Elemente haben einen deutlich sichtbaren `:focus` Zustand (kein `outline: none` ohne Ersatz).
- [ ] **Keine Tastatur-Fallen:** Nutzer können in jeden Bereich (auch Modale) hinein- und wieder heraus-tabben.
- [ ] **Skip-Links:** Ein "Zum Hauptinhalt springen"-Link ist am Anfang der Seite vorhanden.

## 🔊 Semantik & Screenreader
- [ ] **Alternativtexte:** Alle aussagegebenden Bilder haben ein `alt`-Attribut; rein dekorative Bilder haben `alt=""`.
- [ ] **Button-Labels:** Alle Buttons haben einen beschreibenden Text oder ein `aria-label` (statt nur ein Icon).
- [ ] **Link-Ziele:** Linktexte sind aussagekräftig (kein "hier klicken", sondern "Zum Kurs A1 springen").
- [ ] **Formular-Labels:** Jedes `<input>`, `<select>` und `<textarea>` ist mit einem `<label>` verknüpft.
- [ ] **ARIA-Rollen:** Komplexe Komponenten nutzen korrekte Rollen (z.B. `role="dialog"` für Modale, `role="alert"` für Fehlermeldungen).
- [ ] **Überschriften-Hierarchie:** Die Struktur folgt einer logischen H1 $\to$ H2 $\to$ H3 Hierarchie.

## 🛠️ Interaktive Elemente & Modale
- [ ] **Modal-Dialoge:** 
    - [ ] Fokus wird beim Öffnen in das Modal verschoben.
    - [ ] Fokus bleibt innerhalb des Modals gefangen (Focus Trap).
    - [ ] Die `Esc`-Taste schließt das Modal.
    - [ ] Fokus kehrt nach dem Schließen zum auslösenden Element zurück.
- [ ] **Fehlermeldungen:** Validierungsfehler werden über `aria-describedby` mit dem Input verknüpft und dem Screenreader angekündigt.
- [ ] **Status-Updates:** Dynamische Änderungen (z.B. "Vokabel gespeichert") werden via `aria-live="polite"` gemeldet.

## 📱 Mobile & Touch
- [ ] **Touch-Target-Größe:** Alle interaktiven Elemente sind mindestens 44x44 CSS-Pixel groß.
- [ ] **Orientierung:** Die App funktioniert sowohl im Portrait- als auch im Landscape-Modus.
- [ ] **Keine Gesten-Zwang:** Alle Funktionen, die Gesten erfordern (z.B. Swipe), haben eine Tastatur-Alternative.
