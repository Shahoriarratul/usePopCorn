import { useEffect, useState } from "react";
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(
    function () {
      if (typeof window === "undefined") return;

      try {
        const storedValue = window.localStorage.getItem(key);
        if (storedValue) setValue(JSON.parse(storedValue));
      } catch {
        // Ignore malformed localStorage data and keep the initial value.
      } finally {
        setIsHydrated(true);
      }
    },
    [key]
  );

  useEffect(
    function () {
      if (!isHydrated || typeof window === "undefined") return;
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key, isHydrated]
  );

  return [value, setValue];
}
