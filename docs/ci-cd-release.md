# CI/CD Release Pipeline – Wortwende

**Datum:** 2026-06-23

## Workflow-Übersicht

```
Push/PR → CI (Lint → Typecheck → Test → Build → Audit)
                ↓
         Docker Publish (Build Image → Push GHCR → ZimaOS via Watchtower)
                ↓
         Android Build (APK + AAB Signing)
         iOS Build (Archive + IPA Export)
```

## Workflows

| Workflow | Trigger | Runner | Output |
|---|---|---|---|
| `ci.yml` | Push/PR auf main | ubuntu-latest | Quality Gate ✅/❌ |
| `docker-publish.yml` | Push auf main | ubuntu-latest | Docker Image auf GHCR |
| `build-android.yml` | Push auf main (android/**) + workflow_dispatch | ubuntu-latest | Debug APK + Release AAB |
| `build-ios.yml` | Push auf main (ios/**) + workflow_dispatch | macos-latest | IPA Archive |
| `shadcn-update-check.yml` | Schedule (weekly) + workflow_dispatch | ubuntu-latest | Issue/PR |
| `content-sync.yml` | Schedule + workflow_dispatch | ubuntu-latest | Content PR |

## Quality Gates

| Step | Command | Required |
|---|---|---|
| Lint | `npm run lint` | ✅ Must pass |
| Typecheck | `npm run typecheck` | ✅ Must pass |
| Unit Tests | `npm run test` | ✅ Must pass |
| Build | `npm run build` | ✅ Must pass |
| Audit | `npx tsx scripts/quality-audit.ts` | ✅ Must pass |
| E2E Tests | `npm run test:e2e` | 🟡 Optional (needs server) |

## Secrets (GitHub)

| Secret | Workflow |
|---|---|
| `DEEPSEEK_API_KEY` | ci.yml (Build) |
| `ANDROID_KEYSTORE_PASSWORD` | build-android.yml |
| `APP_STORE_CONNECT_API_KEY` | build-ios.yml |

## Deployment

- **Staging:** Nicht vorhanden
- **Production:** Docker Image → GHCR → Watchtower auf ZimaOS auto-deploy
- **Rollback:** `docker compose up -d` mit vorherigem Image-Tag
