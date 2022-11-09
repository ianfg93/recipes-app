import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialState) => {
  const [state, setState] = useState(() => {
    const localStorageList = JSON.parse(localStorage.getItem(key));
    return localStorageList || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return { state, setState };
};

export default useLocalStorage;
