"use client";

import { useServiceWorkerUpdate } from "@/hooks/useServiceWorkerUpdate";

export function UpdateBanner() {
  const { updateAvailable, applyUpdate } = useServiceWorkerUpdate();

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl shadow-2xl p-4 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">Neue Version verfügbar</p>
          <p className="text-xs opacity-75 truncate">Tippe auf Aktualisieren, um die neueste Version zu laden.</p>
        </div>
        <button
          onClick={applyUpdate}
          className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white dark:bg-blue-700 dark:hover:bg-blue-600 text-sm font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Aktualisieren
        </button>
      </div>
    </div>
  );
}
