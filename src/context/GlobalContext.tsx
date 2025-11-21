import { type ReactNode } from "react";
import AlertContextProvider from "./AlertContext";
import LoaderContextProvider from "./LoaderContext";
import AuthContextProvider from "./AuthContext";

export default function GlobalContext({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      <AlertContextProvider>
        <LoaderContextProvider>{children}</LoaderContextProvider>
      </AlertContextProvider>
    </AuthContextProvider>
  );
}
