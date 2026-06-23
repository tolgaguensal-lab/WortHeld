# Mobile Release – Wortwende

**Datum:** 2026-06-23
**Status:** 🟡 Build bereit, Signing fehlt

## Android

| Kriterium | Status |
|---|---|
| Package ID | `de.guenlab.wortwende` |
| Version | 1.0.0 (versionCode 1) |
| Target SDK | 36 |
| Min SDK | 24 (Android 7.0) |
| Permissions | INTERNET, RECORD_AUDIO |
| allowBackup | false (DSGVO) |
| Debug APK | `./gradlew assembleDebug` |
| Release AAB | `./gradlew bundleRelease` |

### Signing einrichten
1. Keystore erstellen: `keytool -genkey -v -keystore wortwende.keystore -alias wortwende -keyalg RSA -keysize 2048 -validity 10000`
2. `key.properties` im android/ Ordner erstellen (nicht committen!)
3. Keystore als Base64 in GitHub Secret `ANDROID_KEYSTORE_BASE64`

## iOS

| Kriterium | Status |
|---|---|
| Bundle ID | `de.guenlab.wortwende` |
| Deployment Target | iOS 14+ |
| Swift Version | 5 |
| Archive | `xcodebuild -workspace App.xcworkspace -scheme App archive` |

### Signing einrichten
1. Apple Developer Account ($99/Jahr)
2. App ID in Developer Portal registrieren
3. Provisioning Profile für Distribution
4. App Store Connect API Key als GitHub Secret

## Build-Befehle

```bash
# Android Debug APK
npm run mobile:android

# Android Release AAB  
npm run mobile:android:aab

# iOS Archive (nur macOS)
npm run mobile:ios
```
