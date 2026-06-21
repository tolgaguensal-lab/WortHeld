#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Wortwende Mobile Build Script
# Erstellt Android APK/AAB + iOS IPA via Capacitor
# ═══════════════════════════════════════════════════════════════

set -e

echo "📱 Wortwende Mobile Build"
echo "========================="

# 1. Web-App bauen (für Fallback/PWA)
echo ""
echo "🔨 Baue Web-App..."
npm run build

# 2. Capacitor sync
echo ""
echo "🔄 Sync Capacitor..."
npx cap sync

# 3. Android Build
echo ""
echo "🤖 Baue Android..."

if [ "$1" = "aab" ]; then
  echo "  → Android App Bundle (AAB) für Play Store..."
  cd android && ./gradlew bundleRelease && cd ..
  echo "  ✅ AAB: android/app/build/outputs/bundle/release/app-release.aab"
else
  echo "  → Android APK..."
  cd android && ./gradlew assembleDebug && cd ..
  echo "  ✅ APK: android/app/build/outputs/apk/debug/app-debug.apk"
fi

# 4. iOS (nur auf macOS)
if [ "$(uname)" = "Darwin" ]; then
  echo ""
  echo "🍎 iOS Build..."
  cd ios && xcodebuild -workspace App.xcworkspace -scheme App -configuration Release archive -archivePath ../build/ios/Wortwende.xcarchive 2>/dev/null || echo "  ⚠️  iOS-Build benötigt Xcode Signing"
  cd ..
fi

echo ""
echo "✅ Build abgeschlossen!"
