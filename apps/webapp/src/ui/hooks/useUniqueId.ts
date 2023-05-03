import { useRef } from "react";
import uniqueId from "lodash/uniqueId";
import createUID from "@/utils/createUid";

export default function useUniqueId(prefix: any, len: any) {
  const idRef: any = useRef();

  if (!idRef.current) {
    idRef.current = `${uniqueId(prefix)}-${createUID(len)}`;
  }

  return idRef.current;
}
