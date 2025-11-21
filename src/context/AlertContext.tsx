import { createContext, useState, type ReactNode, useContext } from "react";

interface Alert {
  title: string | null;
  type: AlertType | null;
}

export enum AlertType {
  DANGER = "danger",
  SUCCESS = "success",
  WARNING = "warning",
}

export interface AlertContextType {
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
  isVisible: boolean;
  showAlert: (inputAlert: Alert, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const AlertContextProvider = ({ children }: Props) => {
  const [alert, setAlert] = useState<Alert>({ title: null, type: null });
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = (inputAlert: Alert, duration: number = 2000) => {
    setAlert(inputAlert);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ alert, setAlert, isVisible, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
export default AlertContextProvider;

export const useAlert = () => useContext(AlertContext);
