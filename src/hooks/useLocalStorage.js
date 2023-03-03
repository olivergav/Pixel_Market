import { useEffect } from "react";
import { useState } from "react";

const getFromLocalStorage = (key, initialValue) => {
  const data = localStorage.getItem(key);

  if (data) return JSON.parse(data);

  return initialValue;
};

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() =>
    getFromLocalStorage(key, initialValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
