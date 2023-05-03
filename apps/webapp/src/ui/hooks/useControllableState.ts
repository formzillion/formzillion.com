import { useState, useCallback, useRef, useEffect } from "react";
import useCallbackRef from "./useCallbackRef";

function useUncontrolledState({ defaultProp, onChange }: any) {
  const uncontrolledState = useState(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = useRef(value);
  const handleChange = useCallbackRef(onChange);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);

  return uncontrolledState;
}

function useControllableState({ prop, defaultProp, onChange = () => {} }: any) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);

  const setValue = useCallback(
    (nextValue: any) => {
      const setter = nextValue;
      if (isControlled) {
        const value =
          typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value !== prop) {
          handleChange(value);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange]
  );

  return [value, setValue];
}

export default useControllableState;
