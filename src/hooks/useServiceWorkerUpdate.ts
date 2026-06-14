"use client";

import { useState, useEffect, useCallback } from "react";

export function useServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingSW, setWaitingSW] = useState<ServiceWorker | null>(null);

  const applyUpdate = useCallback(() => {
    if (!waitingSW) return;
    waitingSW.postMessage({ type: "SKIP_WAITING" });
  }, [waitingSW]);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    let currentRegistration: ServiceWorkerRegistration | null = null;

    navigator.serviceWorker.ready.then((reg) => {
      currentRegistration = reg;

      function detectUpdate() {
        if (reg.installing) {
          reg.installing.addEventListener("statechange", (e) => {
            if ((e.target as ServiceWorker).state === "installed") {
              if (navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
                setWaitingSW(reg.installing);
              }
            }
          });
        }

        if (reg.waiting) {
          setUpdateAvailable(true);
          setWaitingSW(reg.waiting);
        }
      }

      detectUpdate();
      reg.addEventListener("updatefound", detectUpdate);
    });

    const onControllerChange = () => {
      if (currentRegistration?.installing) return;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  return { updateAvailable, applyUpdate };
}
