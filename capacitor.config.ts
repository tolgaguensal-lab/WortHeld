import { CapacitorConfig } from "@capacitor/cli";

const isProd = process.env.NODE_ENV === "production";

const config: CapacitorConfig = {
  appId: "de.guenlab.wortwende",
  appName: "Wortwende",
  webDir: "public",
  server: {
    // Lädt die Live-URL im WebView – alle Features (Auth, API, Tutor) funktionieren
    url: isProd
      ? "https://wortwende.guenlab.de"
      : "http://192.168.178.91:3035",
    cleartext: !isProd,
    androidScheme: "https",
    iosScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0D2B45",
      showSpinner: false,
    },
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
