import { useCallback, useState } from 'react';

export default function useFlag(initFlag = false) {
  const [flag, setFlag] = useState(initFlag);

  const setFlagTrue = useCallback(() => setFlag(true), []);
  const setFlagFalse = useCallback(() => setFlag(false), []);

  return [flag, setFlagTrue, setFlagFalse];
}
