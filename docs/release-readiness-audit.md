# Wortwende – Release Readiness Audit

**Datum:** 2026-06-23
**Branch:** main (dcf48c1)
**Auditor:** Automated CI/CD & Security Audit
**Repository:** github.com/tolgaguensal-lab/WortHeld

---

## Executive Summary

**Gesamtstatus: NO-GO für Release**

11 P0-Blocker identifiziert. Die App ist in einem fortgeschrittenen Entwicklungsstadium, aber nicht produktionsreif. Website, Backend, Mobile und Recht müssen vor einem Store-Release gehärtet werden.

---

## 1. Repository Status

| Kriterium | Status | Detail |
|---|---|---|
| Working Tree | ✅ Clean | Keine uncommitteten Änderungen |
| Branch | ✅ main | Up-to-date mit origin/main |
| Tags | ✅ Vorhanden | v0.1.0.105–v0.1.0.108 |
| .gitignore | 🔴 P0 | `android/` und `ios/` sind gitignored |
| Secrets im Repo | ✅ Keine | Keine .env, keine Keys gefunden |

---

## 2. P0 BLOCKER (müssen vor Release behoben werden)

### P0-1: 🔴 android/ und ios/ nicht versioniert
- **Datei:** `.gitignore` Zeile 47-48
- **Problem:** `/android/` und `/ios/` sind in .gitignore
- **Impact:** Frischer Clone kann keine Mobile-Apps bauen. GitHub Actions Workflows brechen.
- **Fix:** Nur Build-Artefakte und Secrets in .gitignore, aber native Projektdateien versionieren.

### P0-2: 🔴 Wildcard-CORS
- **Datei:** `src/middleware.ts` Zeile 60
- **Problem:** `Access-Control-Allow-Origin: *` auf öffentlichen API-Routen
- **Impact:** Jede Website kann die API aufrufen. DSGVO-Risiko, Security-Audit-Fail.
- **Fix:** ALLOWED_ORIGINS per ENV, Vary: Origin Header.

### P0-3: 🔴 Remote Image Wildcard
- **Datei:** `next.config.mjs` Zeile 35-37
- **Problem:** `images.remotePatterns: [{ hostname: "**" }]`
- **Impact:** Beliebige externe Bilder erlaubt. SSRF/CSP-Risiko.
- **Fix:** Auf bekannte Hosts einschränken (lh3.googleusercontent.com für OAuth Avatare, etc.)

### P0-4: 🔴 Auth: Keine Admin-Rolle
- **Datei:** `src/lib/auth.ts` Zeile 47
- **Problem:** `token.role = profile ? "USER" : "USER";` – immer "USER", nie "ADMIN"
- **Impact:** Admin-Routen funktionieren nicht. Entitlement-Prüfungen könnten umgangen werden.
- **Fix:** Rolle aus `UserProfile.role` oder `User.role` lesen.

### P0-5: 🔴 Playwright: Feste LAN-IP
- **Datei:** `playwright.config.ts` Zeile 7
- **Problem:** `baseURL: "http://192.168.178.91:3035"`
- **Impact:** Tests nur auf einem spezifischen Gerät ausführbar. CI kann nicht testen.
- **Fix:** `baseURL: process.env.BASE_URL || "http://127.0.0.1:3000"`

### P0-6: 🔴 Service Worker cached personenbezogene API-Daten
- **Datei:** `public/sw.js` Zeile 48-62
- **Problem:** Alle GET /api/ Responses werden gecached inkl. User-Profile, Progress, etc.
- **Impact:** DSGVO-Verstoß. Sensible Nutzerdaten im Browser-Cache.
- **Fix:** Keine /api/ Responses cachen. Nur statische Assets und Offline-Seite.

### P0-7: 🔴 Capacitor Mixed Content Risiko
- **Datei:** `capacitor.config.ts`
- **Problem:** `cleartext: !isProd` erlaubt HTTP in Development.
- **Impact:** Wenn Prod-Build falsch konfiguriert → Mixed Content → App Store Rejection.
- **Fix:** Für Release-Builds strikt `cleartext: false`. Android Network Security Config prüfen.

### P0-8: 🔴 Missing CSP Header
- **Datei:** `src/middleware.ts`
- **Problem:** Kein Content-Security-Policy Header gesetzt.
- **Impact:** XSS-Schutz fehlt. Security-Audit-Fail.
- **Fix:** CSP mit nonce/hash für Inline-Styles, script-src 'self', style-src 'self' 'unsafe-inline'.

### P0-9: 🔴 Health Endpoint leakt interne Details
- **Datei:** `src/app/api/health/route.ts`
- **Problem:** Gibt DB-Connectivity, Vokabel-Counts, ENV-Config-Status aus.
- **Impact:** Reconnaissance-Vektor für Angreifer.
- **Fix:** Öffentlich nur `{ status: "ok", timestamp }`. Interner Health-Endpoint geschützt.

### P0-10: 🔴 Keine Account-Lösch-URL für Stores
- **Datei:** Fehlt
- **Problem:** Google Play und Apple verlangen eine öffentliche Web-URL zum Account löschen.
- **Fix:** `/konto-loeschen` Seite erstellen, in Datenschutz und Store-Metadaten verlinken.

### P0-11: 🔴 CI/CD: Android Workflow nutzt continue-on-error
- **Datei:** `.github/workflows/build-android.yml`
- **Problem:** Release-AAB Build hat `continue-on-error: true`
- **Impact:** Fehlerhafte Builds werden nicht als Failure markiert.
- **Fix:** continue-on-error entfernen, Signing-Keystore als GitHub Secret konfigurieren.

---

## 3. Security Status

| Kriterium | Status |
|---|---|
| HSTS | ✅ max-age=2 Jahre, includeSubDomains, preload |
| X-Frame-Options | ✅ DENY |
| X-Content-Type-Options | ✅ nosniff |
| Referrer-Policy | ✅ strict-origin-when-cross-origin |
| Permissions-Policy | ✅ camera=(), microphone=(), geolocation=() |
| CSP | 🔴 Fehlt |
| CORS | 🔴 Wildcard `*` |
| Secure Cookies | ✅ (AUTH_SECURE_COOKIES) |
| HttpOnly Cookies | ⚠️ Nicht explizit konfiguriert |
| SameSite Cookies | ⚠️ Nicht explizit konfiguriert |
| Remote Images | 🔴 Wildcard `**` |
| API Key im Frontend | ✅ Keine gefunden |
| Secrets im Repo | ✅ Keine |

---

## 4. DSGVO / Recht Status

| Kriterium | Status | Detail |
|---|---|---|
| Impressum | 🔴 | Enthält Platzhalter `[Straße und Hausnummer]`, `[PLZ und Stadt]` |
| Datenschutz | 🟡 | Grundstruktur vorhanden, KI-Disclosure ergänzt, aber: |
| | 🔴 | Widerspruch: "Keine Weitergabe an Dritte" aber Google OAuth, DeepSeek genutzt |
| | 🔴 | Widerspruch: "Alle Daten in Deutschland" aber DeepSeek in China |
| AGB | 🟡 | Vorhanden, [Ort]-Platzhalter entfernt, aber: |
| | 🔴 | Keine Widerrufsbelehrung für Abos/digitale Inhalte |
| Account-Löschung | 🟡 | DELETE /api/user implementiert, UI in Settings, aber: |
| | 🔴 | Keine öffentliche Web-URL (Store-Anforderung) |
| Datenexport | 🟡 | PATCH /api/user implementiert, UI in Settings |
| Cookie Consent | ✅ | Banner-Komponente vorhanden |
| iOS PrivacyInfo | ✅ | PrivacyInfo.xcprivacy vorhanden |

---

## 5. Website Status

| Kriterium | Status |
|---|---|
| Landingpage | ✅ Produktionsreif |
| Login/Register | ✅ Funktional |
| Pricing | ✅ Realistische Limits |
| KI-Tutor | ✅ Funktional (Leo, Tool-Use) |
| Dashboard | ⚠️ Hardcoded Stats |
| Leaderboard | ⚠️ UI ohne echte Daten |
| Writing Trainer | 🔴 Nur Platzhalter |
| Mobile Responsive | ✅ |
| 404 Seite | ⚠️ Nicht geprüft |
| 500 Error Seite | ⚠️ Nicht geprüft |
| robots.txt | 🔴 Fehlt |
| sitemap.xml | 🔴 Fehlt |
| SEO Metadata | 🟡 Teilweise (Titel/Description auf Hauptseiten) |

---

## 6. CI/CD Status

| Kriterium | Status |
|---|---|
| Docker Build | 🔴 docker-publish.yml scheitert an npm build |
| Docker Push | 🔴 Noch nie erfolgreich |
| Android CI | 🔴 continue-on-error, nie erfolgreich gelaufen |
| iOS CI | 🔴 Development-Fallback, nie erfolgreich gelaufen |
| Lint | ⚠️ Kein CI-Schritt |
| Typecheck | ⚠️ Kein CI-Schritt |
| Unit Tests | ⚠️ Kein CI-Schritt |
| E2E Tests | 🔴 Feste LAN-IP, CI-unfähig |

---

## 7. Mobile Status

| Kriterium | Status |
|---|---|
| Android Projekt | 🔴 In .gitignore, nicht versioniert |
| iOS Projekt | 🔴 In .gitignore, nicht versioniert |
| Capacitor Config | 🟡 Remote URL Modus, cleartext Risiko |
| Android AAB Build | 🔴 Nicht reproduzierbar |
| iOS TestFlight Build | 🔴 Nicht reproduzierbar |
| App Icons | ⚠️ Vorhanden aber nicht auf allen Plattformen geprüft |
| Splash Screen | ✅ Capacitor Plugin konfiguriert |
| Push Notifications | ⚠️ Plugin installiert, nicht getestet |

---

## 8. Test Status

| Kriterium | Status |
|---|---|
| Unit Tests | ✅ Vitest konfiguriert, Tests vorhanden |
| E2E Tests | 🔴 Playwright mit fester LAN-IP |
| Accessibility Tests | ✅ @axe-core/playwright installiert |
| Quality Audit Script | ✅ 0 Fehler, 0 Warnungen |
| E2E Coverage | 🔴 Nur quality-gate.spec.ts |

---

## 9. Priorisierte Fix-Liste

### P0 – Release-Blocker (11)
1. android/ios aus .gitignore entfernen
2. CORS Wildcard fixen
3. Remote Image Wildcard fixen
4. Auth Admin-Rolle fixen
5. Playwright baseURL auf ENV umstellen
6. Service Worker API-Cache entfernen
7. Capacitor cleartext fixen
8. CSP Header setzen
9. Health Endpoint minimal machen
10. /konto-loeschen Seite erstellen
11. CI/CD continue-on-error entfernen

### P1 – Hoch (vor Store-Submission)
- robots.txt + sitemap.xml
- 404/500 Error Pages
- SEO Metadata vervollständigen
- Datenschutz-Widersprüche beheben
- Writing Trainer Platzhalter kennzeichnen
- Dashboard echte Daten anbinden
- E2E-Tests erweitern

### P2 – Mittel (vor Production Launch)
- Store-Metadaten (fastlane)
- Screenshots
- App Icons finalisieren
- Push Notifications testen
- Subscription/IAP entscheiden

### P3 – Niedrig (Post-Release)
- Performance-Optimierung
- Analytics (wenn gewünscht)
- A/B Testing
