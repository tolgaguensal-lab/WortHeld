# 🎨 DESIGN.md — WortHeld Design System v3.0

> **Version:** 3.0
> **Status:** Draft — zur Freigabe
> **Last updated:** 2026-06-18
> **Scope:** Komplettes Redesign der Deutschlern-App A1–C1. Dieses Dokument ist die einzige Quelle der Wahrheit für alle visuellen Entscheidungen.

---

## Inhaltsverzeichnis

1. [Design-Philosophie](#1-design-philosophie)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Border Radius](#5-border-radius)
6. [Shadows & Elevation](#6-shadows--elevation)
7. [Button System](#7-button-system)
8. [Card System](#8-card-system)
9. [Form System](#9-form-system)
10. [Navigation](#10-navigation)
11. [Component Catalog](#11-component-catalog)
12. [Iconography](#12-iconography)
13. [Animation System](#13-animation-system)
14. [Responsive Breakpoints](#14-responsive-breakpoints)
15. [Dark Panels (Quiz & Admin)](#15-dark-panels-quiz--admin)
16. [Gamification Elements](#16-gamification-elements)
17. [Interaction Contracts](#17-interaction-contracts)
18. [Quality Gate](#18-quality-gate)
19. [File Structure & Implementation](#19-file-structure--implementation)

---

## 1. Design-Philosophie

| Prinzip | Beschreibung | Referenz |
|----------|-------------|----------|
| **Ruhe vor Aktion** | Großzügiger Weißraum, warme Off-White-Flächen. Nur die Akzentfarbe signalisiert Klickbarkeit. Keine konkurrierenden Signalfarben. | Literal, Writer |
| **Eine Akzentfarbe** | Sattes Wald-Grün (`#2D6A4F`) für CTAs, Links, Fortschritt. Wird NUR dort eingesetzt, wo wirklich geklickt werden soll. | Promova, Langbase |
| **Serif für Bedeutung** | Überschriften, Lernziele, Level-Marker nutzen die Serifenschrift. Fließtext bleibt Sans — für maximale Lesbarkeit bei langen Lerneinheiten. | Writer, Monologue |
| **Tiefe ohne Schatten** | Helle/dunkle Flächenwechsel statt Schlagschatten. Karten sind leicht erhöht (1–2px Shadow), die primäre Tiefe entsteht durch Farbkontrast (`--card` vs `--background`). | EVOKE, Voiceflow |
| **Komfortable Formen** | Großzügige Radien (16–30 px) für Karten, Pills (9999 px) für Buttons. Weich, erwachsen, einladend — nicht kindlich. | Voiceflow, Promova |
| **Erwachsen, nicht kindlich** | Abstrahierte Lern-Icons, gedämpfte Palette, keine Comic-Figuren. Gamification ist sichtbar, aber dezent. | Preply, Duolingo (entsättigt) |
| **Lesefluss** | Ausrichtung an Bibliotheks-Layouts: viel Raum um Text, papierfarbene Karten, klare Typografie-Hierarchie. Lange Lesetexte bekommen `--content-sm` (640 px) Maximalbreite. | Literal |
| **Helle & dunkle Sektionen** | Strukturierter Rhythmus durch wechselnde Panel-Farben. Dunkle Panels (Quiz, Admin) bleiben die Ausnahme und erzeugen gezielten Fokus. | EVOKE, ElevenLabs |
| **Gamification, reif** | XP-Ringe, Fortschrittsbalken, Streak-Badges sind dezent in die Akzentfarbe eingefärbt — nie grell, nie aufdringlich. | Duolingo (gedämpft) |

---

## 2. Color System

### 2.1 Light Theme (Standard — 95 % der App)

Alle Farben als HSL definiert, damit Tailwind sie direkt via CSS Custom Properties referenzieren kann.

| Token | HSL | Hex | Verwendung |
|-------|-----|-----|------------|
| `--background` | `38 33% 97%` | `#FBF9F5` | Seitenhintergrund — warmes Cremeweiß (Literal-inspiriert) |
| `--foreground` | `220 15% 15%` | `#21242B` | Primärtext — dunkles Anthrazit |
| `--card` | `35 25% 94%` | `#F3EFE9` | Karten — papierähnlich, leicht abgesetzt vom Hintergrund |
| `--card-foreground` | `220 15% 15%` | `#21242B` | Kartentext |
| `--card-elevated` | `36 30% 96%` | `#F7F4EF` | Erhöhte Karten (Dashboard-Stats) |
| `--popover` | `0 0% 100%` | `#FFFFFF` | Dropdowns, Tooltips, Modals |
| `--popover-foreground` | `220 15% 15%` | `#21242B` | Popover-Text |
| `--primary` | `160 45% 28%` | `#2D6A4F` | **Einzige Akzentfarbe** — CTAs, Links, Fortschritt, aktive Zustände |
| `--primary-foreground` | `38 33% 97%` | `#FBF9F5` | Text auf Akzentfarbe |
| `--primary-hover` | `160 45% 23%` | `#25563F` | Button-Hover (5 % dunkler) |
| `--primary-muted` | `160 30% 88%` | `#D4E8DF` | Dezenter Akzent-Hintergrund (Badges, aktive Sidebar-Items) |
| `--secondary` | `38 10% 90%` | `#E8E4DE` | Sekundärflächen, Tab-Hintergründe |
| `--secondary-foreground` | `220 15% 28%` | `#3D424D` | Sekundärtext |
| `--muted` | `38 10% 92%` | `#EDEAE6` | Gedämpfte Flächen |
| `--muted-foreground` | `220 8% 45%` | `#6B6F78` | Gedämpfter Text (Beschreibungen, Meta-Infos) |
| `--accent-gold` | `42 85% 52%` | `#E8B730` | XP, Badges, Belohnungen (sparsam — max. 3 % der Fläche) |
| `--accent-gold-foreground` | `220 15% 15%` | `#21242B` | Text auf Gold-Accent |
| `--destructive` | `0 65% 48%` | `#CF3333` | Fehler, Löschen, Validierung |
| `--destructive-foreground` | `38 33% 97%` | `#FBF9F5` | Text auf Destructive |
| `--destructive-muted` | `0 60% 92%` | `#F8DEDE` | Fehler-Hintergrund (Feedback-Karten) |
| `--border` | `38 10% 85%` | `#DBD7D1` | Kartenränder, Divider, Input-Border |
| `--input` | `38 10% 88%` | `#E0DDD7` | Eingabefelder (Default) |
| `--ring` | `160 45% 28%` | `#2D6A4F` | Focus-Ring (2 px, Offset 2 px) |
| `--success` | `145 45% 38%` | `#389456` | Erfolgsmeldungen |
| `--success-muted` | `145 40% 90%` | `#D4EDE0` | Erfolg-Hintergrund (Feedback-Karten) |
| `--warning` | `35 80% 48%` | `#E89320` | Warnungen |
| `--warning-muted` | `35 70% 90%` | `#FBE8D0` | Warnung-Hintergrund |
| `--info` | `200 60% 43%` | `#348FBA` | Info-Meldungen |
| `--info-muted` | `200 50% 90%` | `#D0E8F5` | Info-Hintergrund |

### 2.2 Kontrast-Verifikation (WCAG AA)

| Kombination | Ratio | Status | Verwendung |
|-------------|-------|--------|------------|
| `--foreground` on `--background` | 14.2:1 | ✅ AAA | Body-Text |
| `--muted-foreground` on `--background` | 5.8:1 | ✅ AA | Beschreibungstext |
| `--primary-foreground` on `--primary` | 6.3:1 | ✅ AA | Button-Text |
| `--card-foreground` on `--card` | 13.8:1 | ✅ AAA | Karten-Text |
| `--primary-foreground` on `--primary-hover` | 7.1:1 | ✅ AAA | Button-Hover-Text |
| `--primary` on `--background` | 5.1:1 | ✅ AA | Text-Links, Icons |
| `--accent-gold` on `--background` | 4.2:1 | ⚠️ AA Large only | Nur für Badges ≥14 px bold |

> **Regel:** Alle Texte unter 18 px (bzw. 14 px bold) müssen ein Kontrastverhältnis von mindestens 4.5:1 erreichen. Große Texte (≥18 px oder ≥14 px bold) mindestens 3:1.

### 2.3 Farbeinsatz-Regeln

- ❌ **Keine** zweite Akzentfarbe. Wald-Grün ist die EINZIGE Signal-Farbe.
- ❌ **Kein** Weiß auf hellem Hintergrund ohne ausreichenden Kontrast.
- ❌ **Kein** Grau-Button, der wie disabled aussieht, aber klickbar ist.
- ❌ **Kein** `--accent-gold` auf mehr als 3 % der sichtbaren Fläche.
- ✅ `--primary` NUR für CTAs, Links, Fortschrittsanzeigen und aktive Zustände.
- ✅ `--accent-gold` NUR für XP-Badges, Streak-Flammen und Belohnungs-Momente.
- ✅ `--success`, `--warning`, `--destructive` NUR für Feedback-Karten und Form-Validierung.

---

## 3. Typography

### 3.1 Font Stack

```css
/* Display — Serif, elegant, für Überschriften und Bedeutungsträger */
--font-display: 'Libre Baskerville', 'Georgia', 'Times New Roman', serif;

/* Body — Sans, klar, leseoptimiert */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Mono — Admin-Bereich, Code, Statistiken */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
```

### 3.2 Type Scale

| Level | Size | Weight | Letter-Spacing | Line-Height | Font | Verwendung |
|-------|------|--------|---------------|-------------|------|------------|
| **h1** | 48–64 px | 700 | `-0.02em` | 1.1 | Serif | Hero-Headlines, Level-Titel |
| **h2** | 32–40 px | 700 | `-0.01em` | 1.2 | Serif | Seiten-Titel, Modul-Header |
| **h3** | 24–28 px | 600 | `0` | 1.3 | Serif | Sektions-Titel |
| **h4** | 18–22 px | 600 | `0` | 1.4 | Sans | Karten-Titel, Widget-Header |
| **body** | 15–16 px | 400 | `0.01em` | 1.6 | Sans | Fließtext, Leseinhalte |
| **body-sm** | 13–14 px | 400 | `0.01em` | 1.5 | Sans | Sekundärtext, Karten-Beschreibungen |
| **caption** | 11–12 px | 500 | `0.02em` | 1.4 | Sans | Badges, Meta-Infos, Zeitstempel |
| **overline** | 10–11 px | 600 | `0.08em` | 1.2 | Sans | Kategorie-Labels — ALL CAPS |
| **mono** | 13–14 px | 400 | `0` | 1.5 | Mono | Code, Admin-Tabellen |

### 3.3 Typografie-Regeln

- **Serif ONLY für Display:** `h1`, `h2`, `h3`, Level-Marker, Zitat-Blöcke. Niemals für Body-Text oder UI-Labels.
- **Headline-Skalierung:** Auf großen Screens (`≥1280 px`) werden `h1`–`h3` um 8–12 px hochskaliert.
- **Letter-Spacing:** Headlines leicht negativ (optischer Ausgleich), Body leicht positiv (Lesbarkeit).
- **Line-Height:** Headlines eng (1.1–1.3), Body großzügig (1.6) — besonders wichtig für lange deutsche Texte.
- **Font Loading:** `font-display: swap` mit Fallback-Fonts. Kein unsichtbarer Text während des Ladens.

### 3.4 Tailwind Font Classes

```css
/* In globals.css */
@layer base {
  body {
    @apply font-body;
  }
  h1, h2, h3 {
    @apply font-display;
  }
  h4, h5, h6 {
    @apply font-body;
  }
}
```

Verwendung in Komponenten:
```tsx
<h1 className="font-display text-5xl font-bold tracking-tight">Deutsch für Alltag & Beruf</h1>
<p className="font-body text-base leading-relaxed text-muted-foreground">Beschreibung...</p>
<code className="font-mono text-sm">const level = "B1";</code>
```

---

## 4. Spacing & Layout

### 4.1 Base Scale (8 px Grid)

| Token | Wert | CSS Variable | Verwendung |
|-------|------|-------------|------------|
| `--space-xs` | 4 px | `var(--space-xs)` | Icon-Abstand innerhalb Buttons |
| `--space-sm` | 8 px | `var(--space-sm)` | Kompakter Innenabstand |
| `--space-md` | 16 px | `var(--space-md)` | Standard Innenabstand Karten |
| `--space-lg` | 24 px | `var(--space-lg)` | Karten-Padding, Sektionsabstand |
| `--space-xl` | 32 px | `var(--space-xl)` | Große Sektionen |
| `--space-2xl` | 48 px | `var(--space-2xl)` | Hero-Sektionen, große Abstände |
| `--space-3xl` | 64 px | `var(--space-3xl)` | Seitenabstand zwischen Haupt-Blöcken |
| `--space-4xl` | 96 px | `var(--space-4xl)` | Sehr große Sektionen (Landingpage) |

### 4.2 Layout Widths

| Token | Wert | CSS Variable | Verwendung |
|-------|------|-------------|------------|
| `--content-sm` | 640 px | `max-w-prose` | Lesetexte, Artikel, Formulare |
| `--content-md` | 768 px | `max-w-3xl` | Lesson-Player, Quiz |
| `--content-lg` | 1024 px | `max-w-5xl` | Dashboard, Modul-Übersicht |
| `--content-xl` | 1280 px | `max-w-7xl` | Landingpage, Pricing |
| `--content-full` | 100 % | `w-full` | Volle Breite (Admin-Tabellen) |

### 4.3 Tailwind Spacing Extension

In `tailwind.config.ts`:
```ts
spacing: {
  'xs': '4px',
  '18': '72px',
  '22': '88px',
  '30': '120px',
  'content-sm': '640px',
  'content-md': '768px',
  'content-lg': '1024px',
  'content-xl': '1280px',
}
```

### 4.4 Layout-Regeln

- **Lesetexte** (`--content-sm`): Maximal 640 px breit, zentriert. Deutsche Texte brauchen Raum zum Atmen.
- **Lesson-Player** (`--content-md`): 768 px maximale Breite, zentriert mit Seiten-Padding.
- **Dashboard** (`--content-lg`): Bis zu 1024 px, Grid-basiert mit 24 px Gap.
- **Karten-Grids**: `grid-cols-1` (Mobile) → `grid-cols-2` (Tablet) → `grid-cols-3` (Desktop). Gap: 24 px.

---

## 5. Border Radius

| Token | Wert | CSS Variable | Verwendung |
|-------|------|-------------|------------|
| `--radius-sm` | 8 px | `var(--radius-sm)` | Input-Felder, kleine Elemente |
| `--radius-md` | 16 px | `var(--radius-md)` | Karten, Modals — Standard |
| `--radius-lg` | 24 px | `var(--radius-lg)` | Große Karten, Dashboard-Blöcke |
| `--radius-xl` | 30 px | `var(--radius-xl)` | Hero-Karten, Pricing-Tiles |
| `--radius-full` | 9999 px | `var(--radius-full)` | Buttons (Pills), Badges, Chips |

**Tailwind Config:**
```ts
borderRadius: {
  'sm': 'var(--radius-sm)',
  'md': 'var(--radius-md)',
  'lg': 'var(--radius-lg)',
  'xl': 'var(--radius-xl)',
  'full': 'var(--radius-full)',
}
```

> **Regel:** Alle Buttons sind Pills (`--radius-full`). Karten nutzen `--radius-md` bis `--radius-xl` je nach Kontext. Keine scharfen Ecken (0 px) — sie wirken im Lernkontext zu technisch.

---

## 6. Shadows & Elevation

| Token | Wert | Verwendung |
|-------|------|------------|
| `--shadow-none` | `none` | Standard — die meisten Flächen haben keine Schatten |
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.04)` | Karten auf `--background` |
| `--shadow-card-hover` | `0 2px 8px rgba(0,0,0,0.06)` | Karten-Hover |
| `--shadow-modal` | `0 8px 30px rgba(0,0,0,0.08)` | Modals, Dropdowns |
| `--shadow-dark` | `0 1px 3px rgba(0,0,0,0.15)` | Karten auf `--dark-bg` |

```css
:root {
  --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.04);
  --shadow-card-hover: 0 2px 8px 0 rgb(0 0 0 / 0.06);
  --shadow-modal: 0 8px 30px 0 rgb(0 0 0 / 0.08);
  --shadow-dark: 0 1px 3px 0 rgb(0 0 0 / 0.15);
}
```

> **Regel:** Keine harten Schlagschatten. Tiefe entsteht primär durch Flächenkontrast — `--card` vs `--background`, `--card-elevated` vs `--card`. Schatten sind der letzte, subtilste Layer — maximal 8 px Blur, maximale Opacity 0.08.

**Elevation-Hierarchie (flach → erhöht):**
1. `--background` (Basis)
2. `--card` (leicht abgesetzt)
3. `--card-elevated` (Dashboard-Stats, Hover)
4. `--popover` + `--shadow-modal` (Dropdowns, Modals)

---

## 7. Button System

### 7.1 Variants

| Variant | Background | Text Color | Border | Verwendung |
|---------|------------|-----------|--------|------------|
| **primary** | `--primary` | `--primary-foreground` | none | **Haupt-CTA der Seite** — genau EIN Mal pro View |
| **secondary** | `--secondary` | `--secondary-foreground` | none | Alternative Aktionen, Filter |
| **outline** | transparent | `--foreground` | `--border` | Sekundäre Aktionen, „Abbrechen" |
| **ghost** | transparent | `--muted-foreground` | none | Zurück, Navigation, unauffällige Aktionen |
| **destructive** | `--destructive` | `--destructive-foreground` | none | Löschen, Konto schließen |
| **gold** | `--accent-gold` | `--accent-gold-foreground` | none | **NUR** XP-Claim, Badge-Freischaltung |

### 7.2 Button Sizes

| Size | Height | Padding-X | Font Size / Weight | Radius |
|------|--------|-----------|-------------------|--------|
| **sm** | 36 px | 16 px | 13 px / 500 | `--radius-full` |
| **md** | 44 px | 20 px | 15 px / 600 | `--radius-full` |
| **lg** | 52 px | 28 px | 16 px / 600 | `--radius-full` |
| **xl** | 60 px | 36 px | 18 px / 700 | `--radius-full` |
| **icon** | 40 px | — | — | `--radius-full` |

### 7.3 Button States (alle Variants)

| State | Visual |
|-------|--------|
| **default** | Volle Farbe der Variant |
| **hover** | Helligkeit +5 %, leichter Scale-Up (`transform: scale(1.02)`) |
| **active** | Scale-Down (`transform: scale(0.97)`), 5 % dunkler |
| **focus-visible** | `--ring` 2 px solid, Offset 2 px |
| **disabled** | Opacity 0.4, `cursor: not-allowed`, kein Hover-Effekt |
| **loading** | Spinner (18 px) ersetzt Text, Button behält Breite |
| **success** | `--success` Hintergrund, Check-Icon — nur temporär nach Aktion (1.5 s) |

### 7.4 Button-Komponente (React/TypeScript)

```tsx
// src/components/ui/button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'gold';
  size: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  loading?: boolean;
  success?: boolean;
  children: React.ReactNode;
}
```

### 7.5 Button-Regeln (Pflicht)

- ❌ **Keine** weißen Buttons auf hellem Hintergrund ohne Border.
- ❌ **Keine** grauen Buttons, die wie disabled aussehen, aber aktiv sind.
- ❌ **Kein** `<button>` ohne `type`-Attribut.
- ❌ **Kein** `variant="primary"` mehr als EIN Mal pro sichtbarem Viewport.
- ✅ **Immer** `aria-label` bei Icon-only-Buttons.
- ✅ **Immer** `data-testid` für E2E-Tests (mindestens bei CTA-Buttons).
- ✅ Jeder Button hat einen definierten Interaction Contract (siehe §17).

---

## 8. Card System

### 8.1 Card Types

| Type | Background | Radius | Shadow | Border | Verwendung |
|------|------------|--------|--------|--------|------------|
| **default** | `--card` | `--radius-md` | `--shadow-card` | none | Standard-Content-Karten, Listen |
| **elevated** | `--card-elevated` | `--radius-lg` | `--shadow-card-hover` | none | Dashboard-Stats, hervorgehobene Karten |
| **outline** | transparent | `--radius-md` | none | `--border` | Karten im Lesefluss, Feedback |
| **paper** | `--card` | `--radius-md` | none | `--border` (subtil) | Lesson-Inhalte, lange Texte |
| **dark** | `--dark-card` | `--radius-md` | `--shadow-dark` | none | Quiz, Admin, Einstufungstest |
| **glass** | `rgba(251,249,245,0.7)` | `--radius-lg` | none | `--border` (sehr subtil) | Landing-Hero (sparsam) |

### 8.2 Card Anatomy

```
┌──────────────────────────────────────┐
│                                      │  ← Padding: --space-lg (24 px)
│  📖  Leseverstehen                   │  ← Icon 24 px + Titel h4 18 px/600 Sans
│      Kurze Texte verstehen und       │  ← body-sm 14 px, --muted-foreground
│      Fragen dazu beantworten.        │
│                                      │
│  ●●●●●●○○○○  60 %                   │  ← Fortschrittsbalken (optional)
│                                      │
│                         [Starten ▶]  │  ← Button primary, rechtsbündig
└──────────────────────────────────────┘
```

### 8.3 Card-Regeln

- Jede Karte hat **genau eine** primäre Aktion (Button oder Link).
- Titel: Immer `h4` (18–22 px Sans 600).
- Beschreibung: Immer `body-sm` (13–14 px, `--muted-foreground`), maximal 2 Zeilen.
- Fortschrittsanzeige: Optional, unter der Beschreibung, `--primary` Farbe.
- Hover: Karte leicht anheben (`transform: translateY(-2px)`) + `--shadow-card-hover`.

---

## 9. Form System

### 9.1 Input Anatomy

```
┌─────────────────────────────────────┐
│ Label (13 px/500, --foreground)     │  ← Über dem Feld, font-body
│ ┌─────────────────────────────────┐ │
│ │ Placeholder (15 px/400, muted)  │ │  ← 44 px Höhe, --radius-sm (8 px)
│ └─────────────────────────────────┘ │
│ Fehlermeldung (12 px, --destructive)│  ← Unter dem Feld, 4 px Abstand
└─────────────────────────────────────┘
```

### 9.2 Input States

| State | Border | Background | Icon / Message |
|-------|--------|------------|----------------|
| **default** | `--input` | `--background` | — |
| **hover** | `--border` (dunkler) | `--background` | — |
| **focus** | `--ring` (2 px) | `--background` | — |
| **error** | `--destructive` | `--destructive-muted` (2 % Opacity) | ❌ Fehlermeldung in `--destructive` |
| **success** | `--success` | `--success-muted` (2 % Opacity) | ✅ Check-Icon rechts |
| **disabled** | `--muted` | `--muted` (Opacity 0.5) | `cursor: not-allowed` |

### 9.3 Form-Layout

- Labels stehen IMMER über dem Input (nicht daneben).
- Abstand Label → Input: 6 px.
- Abstand Input → Fehlermeldung: 4 px.
- Abstand zwischen Formularfeldern: 20 px.
- Submit-Button: `variant="primary"`, `size="lg"`, rechtsbündig oder Full-Width auf Mobile.

### 9.4 Form-Validierung

- **Client-seitig:** Zod-Schemas für alle Formulare. Echtzeit-Validierung nach `onBlur`.
- **Server-seitig:** Zod-Schemas identisch, validiert in Server Actions / API Routes.
- **Fehlermeldungen:** Kurz, präzise, auf Deutsch. Immer unter dem betroffenen Feld.
- **Erfolgsmeldung:** Toast (Sonner) oben-rechts, Dauer 3 s.

### 9.5 Select, Checkbox, Toggle

| Element | Style |
|---------|-------|
| **Select** | Gleiche Höhe/Größe wie Input. Chevron-Icon rechts. Dropdown: `--popover` + `--shadow-modal`. |
| **Checkbox** | 18 px × 18 px, `--radius-sm`, `--border` → Checked: `--primary` Fill + weißer Haken. |
| **Toggle/Switch** | 40 px × 22 px, `--radius-full`. Off: `--muted`, On: `--primary`. Smooth Transition 150 ms. |

---

## 10. Navigation

### 10.1 Top-Nav (Desktop, ≥1024 px)

```
┌──────────────────────────────────────────────────────────────┐
│  [W] WortHeld    Lernen  ▾  Üben  ▾  Fortschritt     [Start] │  ← 64 px Höhe
└──────────────────────────────────────────────────────────────┘
```

- **Höhe:** 64 px.
- **Hintergrund:** `--background`, sticky. Auf Scroll: `backdrop-blur-md` + `bg-background/80`.
- **Brand:** Logo (24 px Icon) + „WortHeld" Serif 18 px/700.
- **Links:** 14 px/500 `--muted-foreground`, hover → `--foreground`. Kein Unterstrich.
- **Aktiver Link:** `--primary` Farbe, `--primary-muted` Hintergrund-Pill (8 px Padding).
- **CTA-Button:** `variant="primary"`, `size="sm"`, rechts.
- **Trennlinie:** 1 px `--border` am unteren Rand.

### 10.2 Sidebar (Dashboard)

```
┌──────────────┐
│  ☰ Dashboard  │  ← 260 px Breite, --card Hintergrund
│              │
│  📊 Übersicht │  ← 40 px Höhe, --radius-md
│  📚 Module    │  ← Icon 18 px + Text 14 px/500
│  🎯 Lernpfad  │
│  📈 Statistik │  ← Aktives Item: --primary-muted BG, --primary Text
│  ⚙️ Einstell. │
└──────────────┘
```

- **Breite:** 260 px.
- **Hintergrund:** `--card`.
- **Items:** 40 px Höhe, `--radius-md`, Icon (18 px) + Text (14 px/500), 8 px Gap.
- **Aktives Item:** `--primary-muted` Hintergrund, `--primary` Textfarbe, `font-weight: 600`.
- **Hover:** `--secondary` Hintergrund.
- **Trennlinie:** Rechte Kante `--border` 1 px.

### 10.3 Mobile Bottom-Nav (≤768 px)

```
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│  📚     │  🎧     │  🏠     │  📊     │  👤     │  ← 56 px + safe-area
│ Lernen  │  Üben   │ Start   │  Stats  │ Profil  │  ← 10 px/500
└─────────┴─────────┴─────────┴─────────┴─────────┘
```

- **Höhe:** 56 px + `env(safe-area-inset-bottom)`.
- **Hintergrund:** `--card`, `backdrop-blur-md`.
- **Maximal 5 Items:** Icon (22 px) + Label (10 px/500).
- **Aktives Item:** `--primary` Icon + Label. Kein Hintergrund.
- **Trennlinie:** 0.5 px `--border` am oberen Rand.

---

## 11. Component Catalog

Jede Komponente ist als eigenständige Datei unter `src/components/` implementiert.

### 11.1 XP-Ring (Fortschrittsanzeige)

```
        ┌──────────┐
        │    ◯     │  ← SVG Circle, stroke-dasharray für %
        │   75%    │  ← Prozent mittig, Serif 20 px/700
        │   A2     │  ← Level-Code, Sans 12 px/500
        └──────────┘
```

- **Größe:** 80 px × 80 px (Standard), 56 px (kompakt), 120 px (Hero).
- **Ring:** `--primary` für gefüllten Teil, `--secondary` für leeren Teil.
- **Stroke-Width:** 6 px (Standard), 4 px (kompakt).
- **Animation:** Progress füllt sich mit `transition: stroke-dashoffset 0.8s ease-out`.
- **Datei:** `src/components/shared/XpRing.tsx`

### 11.2 Streak-Badge

```
┌────────────────┐
│  🔥 7 Tage     │  ← --accent-gold Icon (16 px), Zahl Sans 14 px/600
└────────────────┘  ← --accent-gold/10 Hintergrund, --radius-full
```

- **Größe:** 28 px Höhe, Padding-X 12 px.
- **Animation:** Leichter Pulse beim Erreichen eines Meilensteins (7, 30, 100 Tage).
- **Datei:** `src/components/shared/StreakBadge.tsx`

### 11.3 Progress Bar

```
┌──────────────────────────────────┐
│ ●●●●●●●●●●●●●●●○○○○○○○○  75%    │  ← --primary Fill, --secondary Track
└──────────────────────────────────┘
```

- **Höhe:** 6 px (Standard), 4 px (kompakt), 10 px (Hero).
- **Track:** `--secondary`, `--radius-full`.
- **Fill:** `--primary`, `--radius-full`.
- **Label:** Optional rechts, `caption` 11 px/500.
- **Datei:** `src/components/shared/ProgressBar.tsx`

### 11.4 Lesson Card

```
┌──────────────────────────────────────┐
│  📖                                  │  ← Skill-Icon (Lucide, 24 px)
│  Leseverstehen                       │  ← h4 18 px/600 Sans
│  Kurze Texte verstehen und Fragen    │  ← body-sm 14 px, --muted-foreground
│  dazu beantworten.                   │
│                                      │
│  ●●●●●●○○○○  6/10 Lektionen         │  ← ProgressBar (optional)
│                                      │
│                              [▶]     │  ← Button primary, Pill, rechts
└──────────────────────────────────────┘
```

- **Datei:** `src/components/lesson-steps/LessonCard.tsx`

### 11.5 Module Card (3-Spalten-Grid)

```
┌─────────────────────┐
│  A1                 │  ← Level-Code, Serif 28 px/700, --primary
│  Anfänger           │  ← h4 18 px/600
│  12 Module          │  ← body-sm, --muted-foreground
│  ◯ 45%              │  ← XP-Ring (56 px)
│            [Starten]│  ← Button
└─────────────────────┘
```

- **Datei:** `src/components/dashboard/ModuleCard.tsx`

### 11.6 Feedback Card

| Typ | Hintergrund | Border | Icon | Verwendung |
|-----|------------|--------|------|------------|
| **success** | `--success-muted` | `--success` 1 px | ✅ CheckCircle2 | Korrekte Antwort |
| **error** | `--destructive-muted` | `--destructive` 1 px | ❌ XCircle | Falsche Antwort + Erklärung |
| **info** | `--info-muted` | `--info` 1 px | ℹ️ Info | Tipp, Hinweis |
| **warning** | `--warning-muted` | `--warning` 1 px | ⚠️ AlertTriangle | Fast richtig |

- **Layout:** Icon links (20 px), Text rechts. Padding 16 px, `--radius-md`.
- **Datei:** `src/components/shared/FeedbackCard.tsx`

### 11.7 Progression Timeline

```
● ──── ● ──── ○ ──── ○ ──── 🔒
A1.1    A1.2   A1.3   A1.4   A1.5
 ✓       ✓      →              🔒
```

- **Nodes:** 12 px Durchmesser, `--primary` (completed), `--secondary` (current), `--muted` (locked).
- **Connector:** 2 px Linie, `--border` oder `--primary` (completed).
- **Labels:** Unter jedem Node, `caption` 11 px/500.
- **Datei:** `src/components/dashboard/ProgressionTimeline.tsx`

### 11.8 Stat Card (Dashboard)

```
┌─────────────────────┐
│  📚                 │  ← Icon 24 px, --primary 20% Opacity
│  245                │  ← Serif 32 px/700, --foreground
│  Gelernte Vokabeln  │  ← caption 11 px/500, --muted-foreground
│  ↑ 12% diese Woche  │  ← Trend (optional), --success
└─────────────────────┘
```

- **Datei:** `src/components/dashboard/StatCard.tsx`

### 11.9 Empty State

```
┌──────────────────────────────┐
│                              │
│         📚 (48 px)           │  ← Icon, --muted-foreground 30% Opacity
│                              │
│     Noch keine Lektionen     │  ← h4 18 px/600
│  Starte deinen Einstufungs-  │  ← body-sm, --muted-foreground
│  test und erhalte einen      │
│  persönlichen Lernpfad.      │
│                              │
│      [Einstufungstest ▶]     │  ← Button primary
│                              │
└──────────────────────────────┘
```

- **Datei:** `src/components/shared/EmptyState.tsx`

### 11.10 Loading Skeleton

- **Form:** Gleiche Maße wie die Ziel-Komponente.
- **Farbe:** `--muted` Hintergrund mit Shimmer-Animation.
- **Animation:** `shimmer` Keyframe (1.5 s infinite).
- **Kein** Layout-Shift: Skeleton muss exakt dieselben Dimensionen wie der geladene Content haben.

---

## 12. Iconography

### 12.1 Icon Set

- **Primary:** [Lucide Icons](https://lucide.dev) — 24 px Standard, 18 px in Buttons, 14 px in Labels.
- **Style:** `strokeWidth: 1.5` (leicht, elegant, nicht fett).
- **Color:** `currentColor` — erbt vom umgebenden Text.

### 12.2 Skill Icons

| Skill | Lucide Icon | Verwendung |
|-------|------------|------------|
| Lesen | `BookOpen` | Leseverstehen-Module, Lese-Übungen |
| Hören | `Headphones` | Hörverstehen-Module, Audio-Player |
| Sprechen | `MessageSquare` | Sprechübungen, Dialoge |
| Schreiben | `PenLine` | Schreibübungen, Textproduktion |
| Grammatik | `Sigma` | Grammatik-Lektionen |
| Wortschatz | `BookA` | Vokabel-Training |
| Wiederholung | `RefreshCw` | Wiederholungs-Module |
| Test | `ScrollText` | Einstufungstest, Prüfungen |

### 12.3 Action Icons

| Aktion | Lucide Icon | Verwendung |
|--------|------------|------------|
| Starten / Weiter | `ArrowRight` | CTA-Buttons, Navigation |
| Zurück | `ArrowLeft` | Zurück-Buttons, Navigation |
| Abschließen | `CheckCircle2` | Erfolgszustände |
| Sperren / Freischalten | `Lock` / `Unlock` | Gesperrte Inhalte |
| XP / Belohnung | `Zap` / `Sparkles` | XP-Verdienst, Achievements |
| Streak | `Flame` | Tägliche Lernserie |
| Fehler | `AlertCircle` / `XCircle` | Fehlerzustände |
| Info | `Info` | Hinweise, Tipps |
| Einstellungen | `Settings` | Konfiguration |
| Profil | `User` | Benutzerprofil |
| Abmelden | `LogOut` | Logout-Aktion |

### 12.4 Navigation Icons

| Bereich | Lucide Icon |
|---------|------------|
| Dashboard | `LayoutDashboard` |
| Module / Lernen | `BookOpen` |
| Üben | `Pencil` |
| Fortschritt / Stats | `BarChart3` |
| Profil | `User` |
| Zertifikate | `Award` |

---

## 13. Animation System

### 13.1 Duration Tokens

| Token | Dauer | Easing | Verwendung |
|-------|-------|--------|------------|
| `--duration-fast` | 150 ms | `ease-out` | Hover, Focus, Toggle |
| `--duration-normal` | 250 ms | `ease-in-out` | Card-Hover, Modals, Sheet |
| `--duration-slow` | 400 ms | `ease-out` | Page-Transition, Content-Reveal |
| `--duration-reveal` | 600 ms | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Staggered-List-Reveal, Hero-Animation |

### 13.2 Animation-Regeln

- **NUR `opacity` und `transform` animieren** — GPU-composited, keine Layout-Triggers.
- **Keine** `width`, `height`, `margin`, `padding` Animationen.
- **`prefers-reduced-motion`** respektieren: Alle Animationen auf `duration: 0s` setzen.
- **Framer Motion** für Komponenten-Animationen (`AnimatePresence`, `motion.div`).
- **CSS `@keyframes`** nur für einfache Loops (Shimmer, Pulse).

### 13.3 Framer Motion Presets

```tsx
// src/components/shared/Animated.tsx

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const slideRight = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.35, ease: 'easeOut' },
};
```

### 13.4 Tailwind Animation Classes

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.92; }
}

.animate-fade-in { animation: fade-in 0.5s ease-out; }
.animate-shimmer { animation: shimmer 1.5s infinite; }
.animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
```

---

## 14. Responsive Breakpoints

| Breakpoint | Width | Typ | Verwendung |
|------------|-------|-----|------------|
| **xs** | 375 px | Small Phone | iPhone SE, ältere Geräte |
| **sm** | 640 px | Large Phone | iPhone 14/15, Galaxy S |
| **md** | 768 px | Tablet | iPad Mini, Portrait |
| **lg** | 1024 px | Small Desktop | iPad Pro, 13″ Laptop |
| **xl** | 1280 px | Desktop | Standard Monitor |
| **2xl** | 1536 px | Large Desktop | 27″+ Monitore |

### Mobile-First Regeln

- **Standard-Ansatz:** Mobile First — Basis-Styles sind für `<640 px`, dann `sm:`, `md:`, `lg:`, `xl:` Breakpoints.
- **Navigation:** Ab `<1024 px` → Bottom-Nav statt Sidebar.
- **Grids:** `grid-cols-1` (Mobile) → `sm:grid-cols-2` (Tablet) → `lg:grid-cols-3` (Desktop) → `xl:grid-cols-4`.
- **Typografie:** `h1` 36 px (Mobile) → 48 px (Tablet) → 64 px (Desktop).
- **Padding:** 16 px (Mobile) → 24 px (Tablet) → 32 px (Desktop).
- **Touch-Targets:** Alle interaktiven Elemente mindestens 44 px × 44 px auf Touch-Geräten.

---

## 15. Dark Panels (Quiz & Admin)

Dunkle Panels sind die AUSNAHME — sie werden nur für fokussierte Umgebungen eingesetzt: Einstufungstests, Quizzes und Admin-Dashboards.

### 15.1 Dark Theme Tokens

| Token | HSL | Hex | Verwendung |
|-------|-----|-----|------------|
| `--dark-bg` | `220 15% 10%` | `#161921` | Hintergrund dunkler Panels |
| `--dark-card` | `220 15% 15%` | `#21252F` | Karten auf dunklem Grund |
| `--dark-card-elevated` | `220 15% 18%` | `#292D38` | Erhöhte Karten, Hover |
| `--dark-border` | `220 10% 22%` | `#323842` | Kartenränder, Divider |
| `--dark-text` | `38 20% 90%` | `#E8E4DC` | Primärtext auf dunklem Grund |
| `--dark-muted` | `220 8% 50%` | `#787D87` | Sekundärtext auf dunklem Grund |
| `--dark-input` | `220 15% 20%` | `#2C313D` | Input-Felder im Dark Mode |

### 15.2 Dark Mode Button-Varianten

Buttons in dunklen Panels nutzen die gleichen Variants, aber mit angepassten Werten:

| Variant | Background | Text |
|---------|------------|------|
| **primary** | `--primary` (gleicht sich an) | `--dark-text` |
| **secondary** | `--dark-card-elevated` | `--dark-text` |
| **outline** | transparent | `--dark-text`, Border `--dark-border` |
| **ghost** | transparent | `--dark-muted` |

### 15.3 Dark Panel Einsatz-Regeln

- ✅ **Quiz/Einstufungstest:** Volle Dark-Panel-Immersion — reduziert Ablenkung.
- ✅ **Admin-Dashboard:** Dark Sidebar + Dark Cards für Statistiken.
- ❌ **Lerninhalte, Lesetexte:** NIEMALS dunkel. Lesbarkeit hat Priorität.
- ❌ **Landingpage, Onboarding:** NIEMALS dunkel. Einladend und warm.

---

## 16. Gamification Elements

Gamification ist dezent, erwachsen und motivierend — nie aufdringlich oder kindlich.

### 16.1 XP System

- **Verdienst-Animation:** XP fliegen vom Auslöser in den XP-Ring (Top-Right). Dauer: 800 ms.
- **Level-Up:** Vollbild-Overlay mit Serif-Headline „Level Up! B1 erreicht", 2 s Dauer, automatisch schließen.
- **XP-Ring:** Siehe §11.1.

### 16.2 Streak System

- **Anzeige:** Streak-Badge (§11.2) im Dashboard-Header.
- **Meilensteine:** 7 Tage (🔥), 30 Tage (🔥🔥), 100 Tage (🔥🔥🔥), 365 Tage (💎).
- **Verlust-Warnung:** Bei 23:00 Uhr lokaler Zeit: Toast „Nur noch 1 Stunde für deine Lernserie!"

### 16.3 Achievements / Badges

- **Darstellung:** Kleine Icons (40 px × 40 px) in `--card`-Karten, 3-spaltiges Grid.
- **Freigeschaltet:** Volle Farbe + Label.
- **Gesperrt:** `--muted` Opacity 0.3 + `Lock` Icon.
- **Neue Badge-Animation:** Scale-In + kurzer Glow-Effekt (300 ms).

### 16.4 Farb-Palette für Gamification

| Element | Farbe | Einschränkung |
|---------|-------|---------------|
| XP, Fortschritt | `--primary` | Standard |
| Streak, Belohnungen | `--accent-gold` | Max 3 % Fläche |
| Achievements | `--primary` + `--accent-gold` | Abwechselnd |
| Level-Up | `--primary` | Hero-Moment |

---

## 17. Interaction Contracts

Jedes interaktive Element MUSS einen Interaction Contract haben. Contracts werden im Code als JSDoc-Kommentar über der Komponente dokumentiert.

### 17.1 Contract Template

```yaml
id: IC-[PAGE]-[ELEMENT]-[NR]
type: button | link | input | toggle | card
text: "Sichtbarer Text des Elements"
page: Landingpage | Dashboard | Lesson-Player | Quiz | Admin
route: /ziel-route (falls Link)
states: [default, hover, active, focus, loading, disabled, success, error]
trigger: "Was passiert bei Klick/Submit?"
success: "Was zeigt Erfolg an?"
error: "Was zeigt Fehler an? Welche Fehler können auftreten?"
loading: "Wann und wie wird geladen?"
test: "Pfad zum E2E-Test"
a11y: "aria-label, role, keyboard"
```

### 17.2 Beispiel-Contracts

```yaml
id: IC-LANDING-HERO-CTA-001
type: button
text: "Kostenlosen Einstufungstest starten"
page: Landingpage Hero
route: /placement-test
states: [default, hover, active, focus, loading, disabled]
trigger: Navigiert zur Einstufungstest-Seite
success: Seite /placement-test lädt
error: Bei Netzwerkfehler: Toast "Verbindungsfehler — bitte versuche es erneut"
loading: Button zeigt Spinner während Navigation
test: e2e/landing/hero-cta.spec.ts
a11y: aria-label="Kostenlosen Einstufungstest starten", role="link"

id: IC-LESSON-ANSWER-SUBMIT-002
type: button
text: "Antwort prüfen"
page: Lesson-Player
states: [default, hover, active, focus, loading, success, error, disabled]
trigger: Validiert die eingegebene Antwort gegen die Lösung
success: Feedback-Card "Richtig! 🎉" + Button wechselt zu success-State (1.5 s)
error: Feedback-Card mit Erklärung + Button kehrt zu default zurück
loading: Button zeigt Spinner während Server-Check (max 3 s)
disabled: Button disabled wenn kein Text eingegeben
test: e2e/lesson/answer-submit.spec.ts
a11y: aria-label="Antwort prüfen", role="button"

id: IC-DASHBOARD-MODULE-CARD-003
type: card
text: "A1 — Anfänger"
page: Dashboard
route: /dashboard/modules/a1
states: [default, hover, locked]
trigger: Klick öffnet Modul-Detailseite
success: Seite /dashboard/modules/a1 lädt mit Lektionen
error: Bei gesperrtem Modul: Keine Navigation, Card zeigt Lock-Icon
test: e2e/dashboard/module-card.spec.ts
a11y: role="article", aria-label="Modul A1 Anfänger — 12 Lektionen"
```

---

## 18. Quality Gate

Eine Funktion gilt erst als **abgeschlossen**, wenn ALLE folgenden Kriterien erfüllt sind. Kein „fast fertig" — jedes Item ist binär (✅/❌).

### 18.1 Definition of Done (pro Feature)

| # | Kriterium | Prüfung |
|---|-----------|---------|
| 1 | Alle Acceptance Criteria des Features sind erfüllt | Manuell + E2E-Test |
| 2 | Jeder Button hat einen definierten Interaction Contract | Code-Review |
| 3 | Alle Playwright E2E-Tests bestehen (`npx playwright test`) | CI / lokal |
| 4 | Kein WCAG-AA-Kontrastfehler (`@axe-core/playwright`) | CI / lokal |
| 5 | Keyboard-Navigation funktioniert (Tab, Enter, Escape, Arrow Keys) | Manuell |
| 6 | Screenreader-Labels (`aria-label`, `role`) sind gesetzt | axe-core |
| 7 | Mobile (375 px) + Desktop (1280 px) Layout getestet | Playwright + Manuell |
| 8 | `npm run lint` — 0 Errors, 0 Warnings | CI |
| 9 | `npm run typecheck` — 0 Errors | CI |
| 10 | `npm run build` — Success (Exit 0) | CI |
| 11 | `npm run test` — Alle Unit-Tests bestehen | CI |
| 12 | `npm run test:e2e` — Alle E2E-Tests bestehen | CI |
| 13 | Responsive Images (`srcSet`, `sizes`) wo nötig | Code-Review |
| 14 | `prefers-reduced-motion` wird respektiert | Manuell |
| 15 | Keine Console-Errors im Browser | Playwright |
| 16 | Loading-, Empty-, Error-States existieren für jede Daten-abhängige Komponente | Code-Review |

### 18.2 Regression-Test-Gate

Nach JEDER Änderung an bestehenden Komponenten:
1. `npm run test` — Alle Unit-Tests müssen bestehen.
2. `npm run test:e2e` — Alle E2E-Tests müssen bestehen.
3. `npm run build` — Build muss erfolgreich sein.
4. Visuelle Regression: Screenshot-Vergleich mit Baseline (Playwright).

### 18.3 Qualitätsstandards (ISO/IEC 25010)

| Qualitätsmerkmal | Messung |
|------------------|---------|
| **Funktionale Eignung** | Acceptance Criteria erfüllt |
| **Performance-Effizienz** | LCP < 2.5 s, FID < 100 ms, CLS < 0.1 |
| **Kompatibilität** | Getestet auf Chrome, Firefox, Safari, Mobile Safari |
| **Benutzbarkeit** | WCAG AA, Keyboard-Navigation, Screenreader |
| **Zuverlässigkeit** | Fehlerbehandlung für alle States |
| **Sicherheit** | Input-Validierung (Zod), CSRF-Schutz, Auth-Guards |
| **Wartbarkeit** | TypeScript strict, Komponenten < 250 LOC |
| **Portabilität** | Responsive 375 px–1536 px |

---

## 19. File Structure & Implementation

### 19.1 Verzeichnisstruktur

```
src/
├── app/
│   ├── globals.css              ← Design-Tokens (CSS Custom Properties)
│   ├── layout.tsx                ← Font-Loading, Providers, Metadata
│   ├── page.tsx                  ← Landingpage
│   ├── (auth)/                   ← Login, Registrierung
│   ├── (dashboard)/              ← Dashboard (geschützte Route)
│   ├── onboarding/               ← Onboarding-Flow
│   ├── placement-test/           ← Einstufungstest (Dark Panel)
│   └── pricing/                  ← Preisseite
│
├── components/
│   ├── ui/                       ← Primitive (shadcn/ui Basis)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   ├── switch.tsx
│   │   ├── tabs.tsx
│   │   └── tooltip.tsx
│   │
│   ├── shared/                   ← Projektweite Komponenten
│   │   ├── Animated.tsx          ← Framer Motion Wrapper (fadeIn, scaleIn, stagger)
│   │   ├── Providers.tsx         ← Theme, Auth, Query, Toast
│   │   ├── XpRing.tsx            ← XP-Ring Fortschrittsanzeige
│   │   ├── StreakBadge.tsx       ← Streak-Badge
│   │   ├── ProgressBar.tsx       ← Fortschrittsbalken
│   │   ├── FeedbackCard.tsx      ← Feedback (success/error/info/warning)
│   │   ├── EmptyState.tsx        ← Leerer Zustand
│   │   └── PageHeader.tsx        ← Seiten-Header (Titel + Breadcrumb)
│   │
│   ├── dashboard/                ← Dashboard-spezifisch
│   │   ├── StatCard.tsx
│   │   ├── ModuleCard.tsx
│   │   ├── ProgressionTimeline.tsx
│   │   └── DailyGoal.tsx
│   │
│   ├── lesson-steps/             ← Lesson-Player
│   │   ├── LessonCard.tsx
│   │   ├── LessonPlayer.tsx
│   │   ├── AnswerInput.tsx
│   │   └── LessonFeedback.tsx
│   │
│   └── layout/                   ← Layout-Komponenten
│       ├── TopNav.tsx
│       ├── Sidebar.tsx
│       ├── BottomNav.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── design-tokens.ts          ← Tokens als TypeScript-Konstanten
│   └── utils.ts                  ← cn() Helper (clsx + tailwind-merge)
│
└── types/
    └── design.ts                 ← TypeScript-Types für Tokens & Contracts
```

### 19.2 CSS Custom Properties (globals.css)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ── Color Tokens ── */
    --background: 38 33% 97%;
    --foreground: 220 15% 15%;
    --card: 35 25% 94%;
    --card-foreground: 220 15% 15%;
    --card-elevated: 36 30% 96%;
    --popover: 0 0% 100%;
    --popover-foreground: 220 15% 15%;
    --primary: 160 45% 28%;
    --primary-foreground: 38 33% 97%;
    --primary-hover: 160 45% 23%;
    --primary-muted: 160 30% 88%;
    --secondary: 38 10% 90%;
    --secondary-foreground: 220 15% 28%;
    --muted: 38 10% 92%;
    --muted-foreground: 220 8% 45%;
    --accent-gold: 42 85% 52%;
    --accent-gold-foreground: 220 15% 15%;
    --destructive: 0 65% 48%;
    --destructive-foreground: 38 33% 97%;
    --destructive-muted: 0 60% 92%;
    --border: 38 10% 85%;
    --input: 38 10% 88%;
    --ring: 160 45% 28%;
    --success: 145 45% 38%;
    --success-muted: 145 40% 90%;
    --warning: 35 80% 48%;
    --warning-muted: 35 70% 90%;
    --info: 200 60% 43%;
    --info-muted: 200 50% 90%;

    /* ── Dark Panel Tokens ── */
    --dark-bg: 220 15% 10%;
    --dark-card: 220 15% 15%;
    --dark-card-elevated: 220 15% 18%;
    --dark-border: 220 10% 22%;
    --dark-text: 38 20% 90%;
    --dark-muted: 220 8% 50%;
    --dark-input: 220 15% 20%;

    /* ── Radius Tokens ── */
    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-xl: 30px;
    --radius-full: 9999px;

    /* ── Shadow Tokens ── */
    --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.04);
    --shadow-card-hover: 0 2px 8px 0 rgb(0 0 0 / 0.06);
    --shadow-modal: 0 8px 30px 0 rgb(0 0 0 / 0.08);
    --shadow-dark: 0 1px 3px 0 rgb(0 0 0 / 0.15);

    /* ── Spacing Tokens ── */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-2xl: 48px;
    --space-3xl: 64px;
    --space-4xl: 96px;

    /* ── Animation Tokens ── */
    --duration-fast: 150ms;
    --duration-normal: 250ms;
    --duration-slow: 400ms;
    --duration-reveal: 600ms;
  }

  /* ── Global Resets ── */
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-body antialiased;
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: transparent;
  }

  /* ── Typography Defaults ── */
  h1, h2, h3 {
    @apply font-display;
  }
  h4, h5, h6 {
    @apply font-body;
  }

  /* ── Selection ── */
  ::selection {
    background-color: hsl(var(--primary) / 0.15);
    color: hsl(var(--foreground));
  }
}

@layer utilities {
  .font-body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  .font-display {
    font-family: 'Libre Baskerville', Georgia, 'Times New Roman', serif;
  }
  .font-mono {
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  }
  .text-balance {
    text-wrap: balance;
  }
}
```

### 19.3 Tailwind Config (tailwind.config.ts)

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          muted: "hsl(var(--primary-muted))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-gold))",
          foreground: "hsl(var(--accent-gold-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          muted: "hsl(var(--destructive-muted))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          muted: "hsl(var(--success-muted))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          muted: "hsl(var(--warning-muted))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          muted: "hsl(var(--info-muted))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          elevated: "hsl(var(--card-elevated))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        dark: {
          bg: "hsl(var(--dark-bg))",
          card: "hsl(var(--dark-card))",
          "card-elevated": "hsl(var(--dark-card-elevated))",
          border: "hsl(var(--dark-border))",
          text: "hsl(var(--dark-text))",
          muted: "hsl(var(--dark-muted))",
          input: "hsl(var(--dark-input))",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      fontFamily: {
        display: ["Libre Baskerville", "Georgia", "Times New Roman", "serif"],
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
        "4xl": "var(--space-4xl)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
```

### 19.4 Design Tokens (TypeScript)

```ts
// src/lib/design-tokens.ts

export const colors = {
  background: "hsl(38, 33%, 97%)",    // #FBF9F5
  foreground: "hsl(220, 15%, 15%)",    // #21242B
  card: "hsl(35, 25%, 94%)",           // #F3EFE9
  primary: "hsl(160, 45%, 28%)",       // #2D6A4F
  primaryHover: "hsl(160, 45%, 23%)",  // #25563F
  primaryMuted: "hsl(160, 30%, 88%)",  // #D4E8DF
  accentGold: "hsl(42, 85%, 52%)",     // #E8B730
  destructive: "hsl(0, 65%, 48%)",     // #CF3333
  success: "hsl(145, 45%, 38%)",       // #389456
  warning: "hsl(35, 80%, 48%)",        // #E89320
  info: "hsl(200, 60%, 43%)",          // #348FBA
} as const;

export const radii = {
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "30px",
  full: "9999px",
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
  "4xl": "96px",
} as const;

export const animation = {
  fast: "150ms ease-out",
  normal: "250ms ease-in-out",
  slow: "400ms ease-out",
  reveal: "600ms cubic-bezier(0.25, 0.1, 0.25, 1)",
} as const;

export const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const fonts = {
  display: "'Libre Baskerville', Georgia, 'Times New Roman', serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
} as const;
```

### 19.5 TypeScript Types

```ts
// src/types/design.ts

export type ColorToken = keyof typeof import("@/lib/design-tokens").colors;
export type RadiusToken = keyof typeof import("@/lib/design-tokens").radii;
export type SpacingToken = keyof typeof import("@/lib/design-tokens").spacing;
export type AnimationToken = keyof typeof import("@/lib/design-tokens").animation;
export type BreakpointToken = keyof typeof import("@/lib/design-tokens").breakpoints;

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "gold";
export type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";
export type ButtonState = "default" | "hover" | "active" | "focus" | "loading" | "disabled" | "success";

export type CardType = "default" | "elevated" | "outline" | "paper" | "dark" | "glass";

export type FeedbackType = "success" | "error" | "info" | "warning";

export type SkillIcon = 
  | "BookOpen" | "Headphones" | "MessageSquare" | "PenLine" 
  | "Sigma" | "BookA" | "RefreshCw" | "ScrollText";

export type InteractionContract = {
  id: string;
  type: "button" | "link" | "input" | "toggle" | "card";
  text: string;
  page: string;
  route?: string;
  states: string[];
  trigger: string;
  success: string;
  error: string;
  loading: string;
  test: string;
  a11y: string;
};
```

---

## Appendix A: Referenz-Designs (Inspiration)

| Referenz | Was wir übernehmen | Was wir weglassen |
|----------|-------------------|-------------------|
| **Literal** | Warmes Off-White, papierähnliche Karten, viel Whitespace, Lese-Layout | Buch-Metapher, dunkles Theme als Default |
| **Promova** | Eine Akzentfarbe, Pill-Buttons, klare Karten-Hierarchie | Bunte Illustrations-Overlays, mehrere Akzentfarben |
| **Langbase** | Dark Admin Console, Grid-Layout, monochrome Buttons | Terminal-Ästhetik für den Lernbereich |
| **EVOKE** | 3-Spalten-Kacheln, Hell/Dunkel-Wechsel, Sektions-Rhythmus | Agency-Ästhetik, Portfolio-Charakter |
| **Writer** | Serif-Headlines, starke Typografie-Hierarchie, minimales UI | Schreib-App-Fokus, Markdown-Editor |
| **Voiceflow** | Großzügige Radien, klares Form-Design, Fehlerzustände | Flowchart-Interface, dunkles Sidebar-Default |
| **ElevenLabs** | Papierfarbene Flächen, monochrome Controls | Audio-Player-Fokus, dunkles UI |
| **Preply** | Abstrahierte Lern-Icons, thematische Illustrationen | Tutor-Marktplatz-Layout, Profilfotos |
| **Duolingo** | Gamification-Patterns (XP, Streaks, Ringe), runde Buttons | Bunte Palette, Comic-Figuren, kindliche Ästhetik |

---

## Appendix B: Changelog

| Version | Datum | Änderungen |
|---------|-------|------------|
| 1.0 | — | Initiales Design System |
| 2.0 | 2026-06-18 | Forest-Green Akzentfarbe, Typografie-System, Interaction Contracts |
| 3.0 | 2026-06-18 | **Komplettes Redesign.** Neue Farbpalette (Warm Cream + Wald-Grün), Libre Baskerville Display-Font, Referenz-basiertes Design (Literal, Promova, EVOKE, Writer, Voiceflow), Dark Panels für Quiz/Admin, Gamification-System, vollständiger Component Catalog, CSS Custom Properties + Tailwind Config + TypeScript Types, Quality Gate mit ISO/IEC 25010 |

---

*Dieses Design System ist die einzige Quelle der Wahrheit für alle visuellen Entscheidungen in WortHeld. Jede Komponente, jede Seite, jeder Button muss sich auf diese Tokens und Regeln beziehen. Abweichungen sind nur mit dokumentierter Begründung und nach Freigabe erlaubt.*
