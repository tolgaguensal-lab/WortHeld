const CACHE_NAME = "wortwende-v1";
const STATIC_ASSETS = ["/", "/offline", "/manifest.json", "/favicon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // KEINE API-Responses cachen (enthält personenbezogene Daten)
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Statische Assets: Cache-First, dann Network-Fallback
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetched = fetch(request).then((response) => {
        if (response.ok && request.method === "GET") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        if (request.mode === "navigate") {
          return caches.match("/offline");
        }
        return cached || new Response("Offline", { status: 503 });
      });
      return cached || fetched;
    })
  );
});
