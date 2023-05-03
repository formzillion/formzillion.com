import { createContext, useContext } from "react";

const FormContext: any = createContext({});

export const FormContextProvider = FormContext.Provider;

export const FormContextConsumer = FormContext.Consumer;

export function useForm(): any {
  return useContext(FormContext);
}

export default FormContext;
