import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCallbackRef = <T extends (...args: any[]) => any>(
  func: T,
): ((...funcArgs: Parameters<T>) => ReturnType<T>) => {
  const funcRef = useRef<T>();
  funcRef.current = func;

  return useCallback(
    (...args: Parameters<T>) => funcRef.current?.(...args) as ReturnType<T>,
    [],
  );
};

export default useCallbackRef;
