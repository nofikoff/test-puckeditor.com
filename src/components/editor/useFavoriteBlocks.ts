"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "puck-favorite-blocks";

let favorites: Set<string> = new Set();
let listeners: Array<() => void> = [];

function loadFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return new Set(arr);
      }
    }
  } catch {
    // ignore malformed data
  }
  return new Set();
}

function persistToStorage(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.push(listener);

  // Sync across tabs
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      favorites = loadFromStorage();
      emitChange();
    }
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners = listeners.filter((l) => l !== listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): Set<string> {
  return favorites;
}

function getServerSnapshot(): Set<string> {
  return new Set();
}

// Initialize on first client-side load
if (typeof window !== "undefined") {
  favorites = loadFromStorage();
}

export function useFavoriteBlocks() {
  const currentFavorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const toggle = useCallback((name: string) => {
    const next = new Set(favorites);
    if (next.has(name)) {
      next.delete(name);
    } else {
      next.add(name);
    }
    favorites = next;
    persistToStorage(next);
    emitChange();
  }, []);

  const isFavorite = useCallback(
    (name: string) => currentFavorites.has(name),
    [currentFavorites]
  );

  return { favorites: currentFavorites, toggle, isFavorite };
}
