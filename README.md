# Wortwende

Deutsch lernen von A1 bis C1 – spielerisch, effektiv und spaßig.

## Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes
- **Datenbank:** PostgreSQL mit Prisma
- **Auth:** NextAuth v5 (Credentials + Google)
- **Mobile:** PWA-fähig, Mobile-First

## Quick Start

### 1. Docker starten

```bash
docker-compose up -d postgres
```

### 2. Environment konfigurieren

```bash
cp .env.example .env
# .env bearbeiten mit echten Werten
```

### 3. Datenbank initialisieren

```bash
npx prisma db push
npm run db:seed
```

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Die App läuft unter http://localhost:3000

## Projektstruktur

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Login & Register
│   ├── (dashboard)/       # Hauptapp mit Sidebar
│   │   ├── dashboard/     # Übersicht
│   │   ├── learn/         # Lernpfad
│   │   ├── exercise/      # Übungsengine
│   │   ├── review/        # Spaced Repetition
│   │   ├── vocabulary/    # Vokabeltrainer
│   │   ├── profile/       # Profil
│   │   ├── settings/      # Einstellungen
│   │   ├── leaderboard/   # Rangliste
│   │   └── admin/         # Admin-Bereich
│   ├── api/               # API-Routen
│   ├── datenschutz/       # DSGVO
│   ├── impressum/         # Impressum
│   └── agb/               # AGB
├── components/
│   ├── exercise/          # 16 Exercise-Komponenten
│   ├── ui/                # shadcn/ui Komponenten
│   └── shared/            # Provider, gemeinsame Teile
├── lib/
│   ├── auth.ts            # NextAuth Konfiguration
│   ├── db.ts              # Prisma Client
│   ├── gamification.ts    # XP, Level, Streak
│   ├── spaced-repetition.ts # SM-2 Algorithmus
│   ├── tts.ts             # Text-to-Speech
│   └── exercises/engine.ts # Exercise-Generatoren
└── types/                 # TypeScript Types
```

## Features

- **Lernstufen A1-C1** nach CEFR-Struktur
- **16 Übungstypen:** Multiple Choice, Lückentext, Satz sortieren, Übersetzung, Hörverständnis, Artikeltraining, Verbkonjugation, Dativ/Akkusativ, Schreiben, Aussprache, Wort-Memory, Artikel-Battle, Grammatik-Duell, Fehler-Finder
- **Gamification:** XP, Level, Streaks, Herzen, Abzeichen, Rangliste
- **Spaced Repetition** für nachhaltiges Lernen
- **Admin-Bereich** für Content-Management
- **PWA** für mobile Nutzung
- **DSGVO-konform**

## API-Endpunkte

| Route | Method | Beschreibung |
|-------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth |
| `/api/auth/register` | POST | Registrierung |
| `/api/user` | GET/PUT | Profil |
| `/api/lessons/recommended` | GET | Empfohlene Lektionen |
| `/api/lessons/[id]` | GET | Lektion-Details |
| `/api/progress/submit-answer` | POST | Antwort einreichen |
| `/api/progress/complete-lesson` | POST | Lektion abschließen |
| `/api/review/due` | GET/POST | Wiederholungen |
| `/api/import/tatoeba` | POST | Tatoeba-Import |
| `/api/import/wiktionary` | POST | Wiktionary-Import |
| `/api/check/grammar` | POST | Grammar-Check |
| `/api/achievements` | GET | Abzeichen |
| `/api/leaderboard` | GET | Rangliste |
| `/api/streak` | POST | Streak aktualisieren |

## Deployment

```bash
docker-compose up -d
```

Oder manuell:

```bash
npm run build
npm start
```

## Lizenz

Proprietär - Alle Rechte vorbehalten.
