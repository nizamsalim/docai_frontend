import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import { Alert } from "./components/Alert.tsx";
import { Loader } from "./components/Loader.tsx";
import GlobalContext from "./context/GlobalContext.tsx";
import { AuthRoute, ProtectedRoute } from "./components/ProtectedRoute.tsx";
import HomePage from "./pages/home/HomePage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalContext>
        <Alert />
        <Loader />
        <Routes>
          <Route path="/" element={<App />} />

          <Route path="/auth">
            <Route
              path="register"
              element={
                <AuthRoute>
                  <RegisterPage />
                </AuthRoute>
              }
            />
            <Route
              path="login"
              element={
                <AuthRoute>
                  <LoginPage />
                </AuthRoute>
              }
            />
          </Route>

          <Route
            path="projects"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  </StrictMode>
);
