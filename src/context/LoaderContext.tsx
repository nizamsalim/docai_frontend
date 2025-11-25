import { createContext, useContext, useState, type ReactNode } from "react";

export interface LoaderContextType {
  isLoading: boolean;
  setLoading: (loadingValue: boolean, messageValue?: string) => void;
  message?: string;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export default function LoaderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const setLoading = (loadingValue: boolean, messageValue?: string) => {
    setIsLoading(loadingValue);
    setMessage(!loadingValue ? undefined : messageValue);
  };

  return (
    <LoaderContext.Provider value={{ isLoading, message, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);
