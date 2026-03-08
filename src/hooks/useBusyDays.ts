import { useState, useCallback } from "react";

const STORAGE_KEY = "campusnet-busy-days";

function loadBusyDays(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function toKey(date: Date) {
  return date.toISOString().split("T")[0];
}

export function useBusyDays() {
  const [busyDays, setBusyDays] = useState<string[]>(loadBusyDays);

  const toggleBusy = useCallback((date: Date) => {
    setBusyDays((prev) => {
      const key = toKey(date);
      const next = prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBusy = useCallback((date: Date) => busyDays.includes(toKey(date)), [busyDays]);

  const busyDates = busyDays.map((d) => new Date(d + "T00:00:00"));

  return { busyDays: busyDates, toggleBusy, isBusy };
}
