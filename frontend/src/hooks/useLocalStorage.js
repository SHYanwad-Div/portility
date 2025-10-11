// frontend/src/hooks/useLocalStorage.js
import { useState, useEffect } from "react";

/**
 * useLocalStorage(key, initialValue)
 * - returns [value, setValue]
 * - syncs value to localStorage whenever it changes
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (error) {
      // log a lightweight warning and fallback to initialValue
      // using console.warn so eslint knows the variable is used
      console.warn(`useLocalStorage: read error for key "${key}"`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // writing to localStorage can fail (e.g. storage full, incognito)
      // warn but do not crash the app
      console.warn(`useLocalStorage: write error for key "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
