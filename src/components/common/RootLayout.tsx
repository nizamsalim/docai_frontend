import { Outlet } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { Alert } from "./Alert";
import { Loader } from "./Loader";

export default function RootLayout() {
  return (
    <GlobalContext>
      <Alert />
      <Loader />
      <Outlet /> {/* 👈 required */}
    </GlobalContext>
  );
}
