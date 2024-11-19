import { useEffect, useState } from "react";



export default function useLocalStorage(val, key) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : val;
  });
  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }, [value, key])

  return [value, setValue];

}