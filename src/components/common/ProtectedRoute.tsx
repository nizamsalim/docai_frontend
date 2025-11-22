import type { ReactNode } from "react";
import { useAuth, type AuthContextType } from "../../context/AuthContext";
import { Navigate } from "react-router";
import { StaticLoader } from "./Loader";

interface Props {
  children: ReactNode;
}
export function ProtectedRoute({ children }: Props) {
  const { user, isFetchingUser } = useAuth() as AuthContextType;

  if (isFetchingUser) return <StaticLoader />;

  return user ? children : <Navigate to="/auth/login" replace />;
}
export function AuthRoute({ children }: Props) {
  const { user, isFetchingUser } = useAuth() as AuthContextType;

  if (isFetchingUser) return <StaticLoader />;

  return user ? <Navigate to="/" replace /> : children;
}
