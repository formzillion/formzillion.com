import { useRef, useEffect, useMemo } from "react";

function useCallbackRef(cb: any) {
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  });

  return useMemo(
    () =>
      (...args: any) =>
        cbRef.current?.(...args),
    []
  );
}

export default useCallbackRef;
