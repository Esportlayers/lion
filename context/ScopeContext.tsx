import { ReactElement, ReactNode, createContext, useReducer } from "react";

import { useLocalStorageState } from "@/hooks/useLocalStorageState";

interface ScopeContextType {
  scope: "-" | number;
  setScope: (value: "-" | number) => void;
}

export const ScopeContext = createContext<ScopeContextType>({ scope: '-', setScope: () => false });

interface Props {
  children: ReactNode;
}

export function ScopeContextProvider({ children }: Props): ReactElement {
  const [scope, setScope] = useLocalStorageState('scope', '-');
  return <ScopeContext.Provider value={{ scope: scope === '-' ? '-' : +scope, setScope }}>
    {children}
  </ScopeContext.Provider>;
}