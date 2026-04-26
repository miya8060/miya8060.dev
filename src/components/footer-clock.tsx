"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("ja-JP", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Tokyo",
});

let cached = "";

function subscribe(onStoreChange: () => void) {
  const update = () => {
    const next = formatter.format(new Date());
    if (next !== cached) {
      cached = next;
      onStoreChange();
    }
  };
  update();
  const id = setInterval(update, 30_000);
  return () => clearInterval(id);
}

const getClientSnapshot = () => cached;
const getServerSnapshot = () => "";

export function FooterClock() {
  const time = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!time) return null;
  return <span suppressHydrationWarning>{time} JST</span>;
}
