import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ProjectsDashboardPage from "./pages/projects/ProjectsDashboardPage";
import CreateProjectPage from "./pages/projects/CreateProjectPage";

import { AuthRoute, ProtectedRoute } from "./components/common/ProtectedRoute";
import ProjectService from "./api/project";

import "./index.css";
import RootLayout from "./components/common/RootLayout";

// -------------------------------
// 🔹 Route Config
// -------------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> }, // 👈 cleaner

      {
        path: "auth",
        children: [
          {
            path: "register",
            element: (
              <AuthRoute>
                <RegisterPage />
              </AuthRoute>
            ),
          },
          {
            path: "login",
            element: (
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            ),
          },
        ],
      },

      {
        path: "projects",
        element: (
          <ProtectedRoute>
            <ProjectsDashboardPage />
          </ProtectedRoute>
        ),
        loader: async () => await ProjectService.getAllProjects(),
      },

      {
        path: "projects/new",
        element: (
          <ProtectedRoute>
            <CreateProjectPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// -------------------------------
// 🔹 Render App
// -------------------------------
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
