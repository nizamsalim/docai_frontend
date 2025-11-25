import { type ReactNode } from "react";
import AlertContextProvider from "./AlertContext";
import LoaderContextProvider from "./LoaderContext";
import AuthContextProvider from "./AuthContext";
import SectionContextProvider from "./SectionContext";

export default function GlobalContext({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      <AlertContextProvider>
        <SectionContextProvider>
          <LoaderContextProvider>{children}</LoaderContextProvider>
        </SectionContextProvider>
      </AlertContextProvider>
    </AuthContextProvider>
  );
}
