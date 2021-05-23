import { ReactElement, ReactNode, createContext, useCallback, useState } from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType>({ loading: false, setLoading: () => false });

interface Props {
  children: ReactNode;
  timeout?: number;
}

export function LoadingContextProvider({ children, timeout = 10000 }: Props): ReactElement {
  const [loading, setLoading] = useState(false);
  const update = useCallback((loading: boolean) => {
    setLoading(loading);
    setTimeout(() => setLoading(false), timeout);
  }, [timeout]);

  return <LoadingContext.Provider value={{ loading, setLoading: update }}>
    {children}
  </LoadingContext.Provider>;
}