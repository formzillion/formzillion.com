import { createContext, useContext } from "react";

const InputGroupContext = createContext({});

export const InputGroupContextProvider = InputGroupContext.Provider;

export const InputGroupContextConsumer = InputGroupContext.Consumer;

export function useInputGroup(): any {
  return useContext(InputGroupContext);
}

export default InputGroupContext;
