# WortWende AI-Tutor Pivot — Implementation Plan

> **Für Hermes/OpenCode:** Schrittweise umsetzen, nach jedem Task committen.

**Goal:** WortWende von einer kursbasierten Gamification-App zu einer **KI-Tutor-First-App** umbauen, bei der CEFR-Level Kaufoptionen sind und alles Lernen über den KI-Tutor Leo läuft.

**Architecture:** Tutor wird zentrale UX (Landing-Page nach Login). Navigation radikal vereinfacht. Rate-Limiting und Level-Entitlements steuern die Monetarisierung. Kurse/Lektionen/Übungen werden archiviert.

**Tech Stack:** Next.js 14, TypeScript, Tailwind, shadcn/ui, Prisma, NextAuth v5, DeepSeek API

---

## Analyse: Was bleibt, was geht

### Bleibt & wird ausgebaut
| Komponente | Aktion |
|---|---|
| KI-Tutor Leo (`/tutor`, `AIChat`, `tutor.ts`) | **Bleibt** — wird zentrale UX |
| Rate Limiting (`tutor/chat/route.ts`) | **Ausbauen** — sichtbarer Counter, bessere Upsells |
| Entitlement-System (`entitlements.ts`) | **Ausbauen** — Level → Tier-Mapping |
| Pricing Page (`/pricing`) | **Bleibt** — schon gut, anpassen |
| Auth (`auth.ts`, Login/Register) | **Bleibt** |
| Vokabel-Review (SM-2) | **Bleibt** — wird in Tutor integriert |
| Grammar Topics DB | **Bleibt** — Tutor nutzt sie als RAG-Context |
| Landing Page (`/`) | **Bleibt** — schon Tutor-fokussiert |

### Wird entfernt / umgeleitet
| Komponente | Aktion |
|---|---|
| `/learn` Kurs-Listing | → Redirect zu `/tutor` |
| `/learn/[courseId]` Kurs-Detail | → Redirect zu `/tutor` |
| `/exercise/[lessonId]` | → Redirect zu `/tutor` |
| `/leaderboard` | → Entfernen |
| `/grammar` | → Entfernen (Tutor übernimmt) |
| `/dtz` | → Entfernen oder als Feature im Tutor |
| Gamification (XP, Level, Hearts, Streaks) | → Aus UI entfernen, DB-Modelle behalten |
| `src/components/exercise/` | → Archivieren |
| `src/lib/gamification.ts` | → Behalten (Daten), UI-Referenzen entfernen |
| `src/lib/exercises/engine.ts` | → Archivieren |

### Wird vereinfacht
| Komponente | Aktion |
|---|---|
| Dashboard (`/dashboard`) | → Wird "Home" mit Session-Stats + Tutor-Button |
| Sidebar-Navigation | → 4-5 Items: Tutor, Vokabeln, Preise, Einstellungen |
| Mobile Nav | → Tutor-first |

---

## Phase 1: Navigation & Routing (Fundament)

### Task 1.1: Sidebar-Navigation umbauen

**Objective:** Navigation auf Tutor-First reduzieren, Kurs-basierte Items entfernen.

**Files:**
- Modify: `src/app/(dashboard)/layout.tsx`

**Änderung:** `navItems` reduziert auf:
```tsx
const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/tutor", label: "KI-Tutor", icon: Bot, highlight: true },
  { href: "/vocabulary", label: "Vokabeln", icon: BookA },
  { href: "/pricing", label: "Preise", icon: Zap },
];
```

Optional: Settings/Profile-Icon im User-Footer.

**Mobile Nav:** Erste 4 Items statt erste 5, Tutor prominent (mittig, farbig).

**Verify:** `npm run dev` → Navigation zeigt nur 4 Items, Tutor hervorgehoben.

---

### Task 1.2: Kurs-Routen umleiten

**Objective:** Alle alten Lern-Routen fangen sauere Redirects auf `/tutor`.

**Files:**
- Modify: `src/middleware.ts`
- Create: `src/app/(dashboard)/learn/route.ts` (redirect)
- Create: `src/app/(dashboard)/grammar/route.ts` (redirect)  
- Create: `src/app/(dashboard)/dtz/route.ts` (redirect)
- Create: `src/app/(dashboard)/review/route.ts` (redirect)
- Create: `src/app/(dashboard)/leaderboard/route.ts` (redirect)

**Middleware-Änderung:** Redirects für alte Routen:
```ts
const REDIRECT_MAP: Record<string, string> = {
  "/learn": "/tutor",
  "/grammar": "/tutor",
  "/dtz": "/tutor", 
  "/review": "/tutor",
  "/leaderboard": "/tutor",
  "/exercise": "/tutor",
};
// Wenn pathname mit einem Key beginnt → 301 Redirect
```

**Verify:** `curl -I http://localhost:3000/learn` → 301 → `/tutor`

---

### Task 1.3: Exercise-Route umleiten

**Objective:** `/exercise/[lessonId]` fängt und redirected.

**Files:**
- Create: `src/app/(dashboard)/exercise/route.ts`

Die dynamische Route `[lessonId]` leitet alle Requests auf `/tutor` um.

**Verify:** `curl -I http://localhost:3000/exercise/any-id` → 301 → `/tutor`

---

## Phase 2: Dashboard → Tutor-Home

### Task 2.1: Dashboard zur Tutor-Startseite umbauen

**Objective:** Dashboard wird einladende Startseite mit Session-Stats und direktem Tutor-Zugang.

**Files:**
- Modify: `src/app/(dashboard)/dashboard/page.tsx`

**Neue Struktur:**
```tsx
// Stats: Heutige Sessions, Wörter gelernt, Aktuelles Level
// Großer "Mit Leo lernen"-Button (primary, groß)
// Letzte Tutor-Session Zusammenfassung
// Upgrade-Prompt (wenn Free-Tier)
```

Entfernen: XP, Hearts, Level-Badge, "Nächste Lektion", "Wiederholungen", "Letzte Aktivitäten"-Card.

**Verify:** Dashboard zeigt Stats + Tutor-Button, kein Gamification-Kram.

---

### Task 2.2: Session-Stats-API

**Objective:** API für Dashboard-Stats (heutige Tutor-Sessions, Vokabeln, Level).

**Files:**
- Create: `src/app/api/user/stats/route.ts`

```ts
// GET → { sessionsToday, totalWords, currentLevel, tier, sessionsRemaining }
// Nutzt TutorRequestLog + UserProfile + Entitlements
```

**Verify:** `curl http://localhost:3000/api/user/stats` (auth) → JSON mit Stats.

---

## Phase 3: Pricing & Level-Tiers

### Task 3.1: Pricing Page anpassen

**Objective:** CEFR-Level als klare Kauf-Stufen darstellen. A1 = Free mit Limit.

**Files:**
- Modify: `src/app/pricing/page.tsx`

**Neue Plan-Struktur:**
```ts
const plans = [
  { name: "A1 Starter", price: "0 €", level: "A1", sessions: 10, ... },
  { name: "A2 Alltag", price: "4,99 €", level: "A2", sessions: 100, ... },
  { name: "B1 Fortgeschritten", price: "8,99 €", level: "B1", sessions: 200, ... },
  { name: "B2 Selbstständig", price: "12,99 €", level: "B2", sessions: 300, ... },
  { name: "C1 Experte", price: "14,99 €", level: "C1", sessions: 500, ... },
];
```

Jeder Plan = ein CEFR-Level + alle darunter (B1 enthält A1+A2+B1).

**Verify:** Pricing Page zeigt 5 Level-Pläne mit klaren Session-Limits.

---

### Task 3.2: Entitlement → Tier Mapping

**Objective:** `canAccessLevel()` mit den neuen Plänen synchronisieren.

**Files:**
- Modify: `src/lib/auth/entitlements.ts`

```ts
const LEVEL_TIERS: Record<CEFRLevel, { free: boolean; sessionsPerDay: number }> = {
  A1: { free: true, sessionsPerDay: 10 },
  A2: { free: false, sessionsPerDay: 100 },
  B1: { free: false, sessionsPerDay: 200 },
  B2: { free: false, sessionsPerDay: 300 },
  C1: { free: false, sessionsPerDay: 500 },
};

export function getLevelConfig(level: CEFRLevel) { return LEVEL_TIERS[level]; }
```

**Verify:** Unit-Test `entitlements.test.ts` extended für neue Tiers.

---

### Task 3.3: Rate-Limit pro Level

**Objective:** Session-Limit hängt vom gekauften Level ab, nicht von globalem Tier.

**Files:**
- Modify: `src/app/api/tutor/chat/route.ts`

```ts
async function getUserTier(userId: string): Promise<{ tier: string; maxSessions: number; level: CEFRLevel }> {
  // Prüfe höchstes gekauftes Level → bestimme Session-Limit
  // A1 = 10, A2 = 100, B1 = 200, B2 = 300, C1 = 500
}
```

**Verify:** Free user kriegt 429 nach 10 Requests. B1-User nach 200.

---

## Phase 4: Upsell-Flow im Tutor

### Task 4.1: Session-Counter in AIChat

**Objective:** Im Tutor-UI sichtbarer Counter "5/10 Sessions heute" + Upgrade-Prompt bei Limit.

**Files:**
- Modify: `src/components/ai/AIChat.tsx`

**Änderungen:**
- Header zeigt: `🔥 5/10 Sessions heute` (Badge)
- Bei 8/10: sanfter Hinweis "Bald Limit erreicht — Upgrade?"
- Bei 10/10: Rate-Limit-Response elegant anzeigen mit "Upgrade →" Button
- Response vom Server (`X-RateLimit-Remaining` Header) parsen

**Verify:** Nach 10 Requests erscheint Upgrade-Prompt statt Fehler.

---

### Task 4.2: Upgrade-Prompt Komponente

**Objective:** Wiederverwendbare Upsell-Komponente für "Level freischalten".

**Files:**
- Create: `src/components/ai/UpgradePrompt.tsx`

```tsx
// Props: currentLevel, nextLevel, sessionsRemaining
// Zeigt: "Du hast alle A1-Sessions verbraucht. 
//         Schalte A2 frei für 100 Sessions/Tag →"
// Button: "A2 freischalten (4,99 €/Monat)"
```

**Verify:** Komponente rendert korrekt mit Test-Daten.

---

### Task 4.3: Tutor kennt User-Level

**Objective:** Der KI-Tutor bekommt das gekaufte Level als Kontext und passt Unterricht an.

**Files:**
- Modify: `src/lib/ai/tutor.ts` (`buildTutorContext`)

```ts
// Statt profile.currentLevel → höchstes gekauftes Level
const purchasedLevel = await getHighestPurchasedLevel(userId);
context.userLevel = purchasedLevel;
```

**Verify:** Tutor antwortet auf B1-Niveau wenn User B1 gekauft hat.

---

## Phase 5: Cleanup & Polish

### Task 5.1: Vokabeltrainer in Tutor integrieren

**Objective:** `/vocabulary`-Seite wird Review-Dashboard, direkt aus Tutor erreichbar.

**Files:**
- Modify: `src/app/(dashboard)/vocabulary/page.tsx`
- Modify: `src/components/ai/AIChat.tsx` (Link zu Vokabeln)

**Änderung:** Vokabel-Seite zeigt "Deine Wiederholungen" (SM-2 Review-Stack), keine Kurs-Vokabeln.

**Verify:** Vokabel-Seite zeigt fällige Reviews, keine leere Liste.

---

### Task 5.2: Meta-Tags & SEO anpassen

**Objective:** Titel/Beschreibungen reflektieren "KI-Tutor für Deutsch".

**Files:**
- Modify: `src/app/layout.tsx`

```ts
title: "Wortwende – Dein KI-Tutor für Deutsch",
description: "Lerne Deutsch mit Leo, deinem persönlichen KI-Tutor. 24/7 verfügbar, personalisiert, ab 0 €.",
```

**Verify:** `curl http://localhost:3000` → title tag zeigt neuen Text.

---

### Task 5.3: Ungenutzte Seiten/Codes entfernen

**Objective:** Tote Code-Pfade löschen, Build-Größe reduzieren.

**Files (entfernen/archivieren):**
- `src/app/(dashboard)/learn/` komplett (nach redirect)
- `src/app/(dashboard)/grammar/` komplett
- `src/app/(dashboard)/dtz/` komplett
- `src/app/(dashboard)/review/` komplett
- `src/app/(dashboard)/leaderboard/` komplett
- `src/components/exercise/` komplett
- `src/components/dashboard/` (wenn nur Dashboard-spezifisch)
- `src/lib/exercises/engine.ts`
- `src/lib/gamification.ts` (oder behalten, UI-Referenzen killen)

**Verify:** `npm run build` läuft ohne Fehler, keine Import-Errors.

---

## Verbesserungs-Vorschläge (nicht im Scope, aber empfohlen)

1. **A/B-Test für Pricing:** Free-Tier mit 5 Sessions statt 10 testen → höhere Conversion?
2. **Tutor-Feedback-Loop:** Nach jeder Session "Wie hilfreich war Leo? 1-5 ⭐" → Qualitäts-Monitoring
3. **Weekly Report:** Jeden Montag "Diese Woche: 45 Sessions, 23 neue Wörter, Dativ gemeistert" per Email/Push
4. **Tutor-Gedächtnis:** Session-übergreifendes Kontext-Window (letzte 3 Sessions zusammenfassen)
5. **Stripe-Integration:** Entitlements automatisch bei Zahlung freischalten (aktuell nur DB-Entitlements, keine Payment-Integration)
6. **Offline-Fallback:** Vokabeln + Grammar-DB lokal cachen für Offline-Nutzung
7. **Tutor-Share:** "Teile deinen Lernfortschritt" → Social Proof / Viral-Loop

---

## Ausführungs-Reihenfolge

```
Phase 1 (Nav) → Phase 2 (Dashboard) → Phase 3 (Pricing) → Phase 4 (Upsell) → Phase 5 (Cleanup)
```

Jede Phase ist unabhängig testbar. Nach jeder Phase: `npm run build && npm test`.

---

## Risiken

- **Datenverlust:** User-Daten in alten Modellen (UserProgress, UserAnswer) bleiben in DB, werden nur nicht mehr angezeigt
- **SEO:** Redirects auf `/tutor` sind 301 — Suchmaschinen folgen
- **Bestehende User:** Haben ggf. Fortschritt in Kursen — Kommunikation nötig ("Wir haben auf KI-Tutor umgestellt!")
