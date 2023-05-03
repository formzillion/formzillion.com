import { useRef } from "react";

export default function useUncertainRef(ref: any) {
  const newRef = useRef();

  if (ref) {
    return ref;
  }

  return newRef;
}
