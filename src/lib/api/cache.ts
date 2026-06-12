export function createCache<T>(ttlMs: number) {
  const store = new Map<string, { data: T; expiresAt: number }>();

  return {
    get(key: string): T | null {
      const entry = store.get(key);
      if (!entry || Date.now() > entry.expiresAt) {
        store.delete(key);
        return null;
      }
      return entry.data;
    },
    set(key: string, data: T): void {
      if (store.size > 1000) {
        const oldest = store.keys().next().value;
        if (oldest) store.delete(oldest);
      }
      store.set(key, { data, expiresAt: Date.now() + ttlMs });
    },
    delete(key: string): void { store.delete(key); },
    has(key: string): boolean { return this.get(key) !== null; },
    clear(): void { store.clear(); },
  };
}
