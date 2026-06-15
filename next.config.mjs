// Startup-Check: Fehlende Environment-Vars fangen, bevor der Server startet
try {
  // dynamic import — env.ts ist TypeScript, next.config.mjs ist ESM
  // Daher den Check direkt hier mit process.env
  const REQUIRED = ["DATABASE_URL", "NEXTAUTH_URL", "NEXTAUTH_SECRET"];
  const missing = REQUIRED.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    console.error(
      `[ENV] Missing required variables:\n  ${missing.join("\n  ")}`
    );
    process.exit(1);
  }
  const secret = process.env.NEXTAUTH_SECRET || "";
  if (secret.length < 32) {
    throw new Error(
      "NEXTAUTH_SECRET must be at least 32 characters. Generate one with: openssl rand -base64 32"
    );
  }
} catch (e) {
  console.error("[ENV] Validation failed:", e instanceof Error ? e.message : e);
  process.exit(1);
}

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        // Statische Assets (JS, CSS, Bilder, Fonts)
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
