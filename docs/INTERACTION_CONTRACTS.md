# Interaktionsverträge (Interaction Contracts) - Wortwende

Dieses Dokument definiert die exakten Systemantworten auf Benutzerinteraktionen, um Konsistenz zwischen Design, Entwicklung und QA zu gewährleisten.

## Vertrag-Definitionen

| ID | Element | Seite | data-testid | Aktion | Systemantwort | Route/Funktion | Pre-Cond | States (L/S/E/D) | A11y Label | Keyboard | Mobile | Playwright Test | Status |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---:|
| IC-001 | Primärer CTA | Landing | `hero-cta` | Click | Navigation zu `/onboarding` | `router.push` | Gast-User | L:- / S:Nav / E:Err / D:- | "Jetzt Lernen starten" | Enter $\to$ Nav | Touch $\to$ Nav | `test_hero_nav` | [ ] |
| IC-002 | Answer Option | Lesson | `ans-opt` | Click | Farbe $\to$ Grün/Rot, XP-Update, Next-Btn aktiv | `handleAnswer()` | Lektion offen | L:- / S:Color / E:- / D:Disabled | "Antwort [X] wählen" | Space $\to$ Sel | Touch $\to$ Sel | `test_ans_feedback` | [ ] |
| IC-003 | Audio Button | Lesson | `audio-btn` | Click | Abspielen Audio-File (.mp3) | `playAudio()` | Asset geladen | L:Spin / S:Play / E:Alert / D:- | "Aussprache abspielen" | Enter $\to$ Play | Touch $\to$ Play | `test_audio_play` | [ ] |
| IC-004 | Progress Bar | Onboarding| `prog-bar` | Auto | Breite $\to$ % basierend auf Index/Total | `computeProgress()`| Test läuft | L:- / S:Update / E:- / D:- | "Fortschritt [X]%" | N/A | N/A | `test_prog_update` | [ ] |
| IC-005 | SRS Rating | Review | `srs-rate` | Click | Update Intervall in DB, nächste Karte | `updateSRS()` | Review aktiv | L:Wait / S:Next / E:Toast / D:- | "Schwierigkeit [X]" | 1-4 Keys $\to$ Rate | Touch $\to$ Rate | `test_srs_update` | [ ] |
| IC-006 | Course Card | Dashboard | `course-card`| Click | Navigation zu `/course/[id]` | ` router.push` | User eingeloggt | L:- / S:Nav / E:Err / D:- | "Kurs [Name] öffnen" | Enter $\to$ Nav | Touch $\to$ Nav | `test_course_nav` | [ ] |
| IC-007 | Paywall Close | Paywall | `pw-close` | Click | Modal schließt, Rückkehr zur Seite | `closeModal()` | Modal offen | L:- / S:Close / E:- / D:- | "Paywall schließen" | Esc $\to$ Close | Touch $\to$ Close | `test_pw_close` | [ ] |
| IC-008 | Search Input | Vocab | `vocab-search`| Type | Liste wird in Echtzeit gefiltert | `filterVocab()` | Liste geladen | L:Skelett / S:Filter / E:- / D:- | "Vokabeln suchen" | Typing $\to$ Filter | Touch $\to$ Keyboard | `test_search_filter`| [ ] |
| IC-009 | Upgrade Button | Profile | `upgrade-btn` | Click | Navigation zu `/pricing` | `router.push` | Free-User | L:- / S:Nav / E:Err / D:- | "Auf Premium upgraden" | Enter $\to$ Nav | Touch $\to$ Nav | `test_upgrade_nav` | [ ] |
| IC-010 | Save Settings | Settings | `save-set` | Click | Toast-Meldung "Gespeichert", Sync DB | `savePrefs()` | Formular valid | L:Loading / S:Toast / E:Err / D:No-Change | "Einstellungen speichern" | Enter $\to$ Save | Touch $\to$ Save | `test_save_prefs` | [ ] |

## Legend
- **States (L/S/E/D):** **L**oading / **S**uccess / **E**rror / **D**isabled
- **Pre-Cond:** Bedingung, die erfüllt sein muss, damit die Interaktion möglich ist.
- **A11y Label:** Erwarteter Text für Screenreader (`aria-label`).
