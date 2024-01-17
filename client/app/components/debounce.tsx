import { useEffect, useMemo, useRef } from "react";
const debounce = require("../../node_modules/lodash/debounce")

export const useDebounce = (callback: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current && (ref.current as () => void)?.();
    };

    return debounce(func, 500);
  }, []);

  return debouncedCallback;
};
