import { useEffect, useState } from 'react';

const useDebounce = (initValue, time = 500) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(initValue);
    }, time);
    return () => clearTimeout(timeout);
  }, [initValue]);

  return value;
};

export default useDebounce;
