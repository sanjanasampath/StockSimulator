import { useEffect, useState } from 'react';

export default function useParamState(key, initialValue) {
  const [state, setState] = useState(() => {
    // get value from search params
    const urlParams = new URLSearchParams(window.location.search);
    const storedValue = urlParams.get(key);
    return storedValue  ? storedValue : initialValue;
  });

  useEffect(() => {
    // update search params
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, state);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  }, [key, state]);

  return [state, setState];
}