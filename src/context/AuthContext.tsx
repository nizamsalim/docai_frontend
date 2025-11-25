import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import AuthService from "@/api/auth";
import axios from "axios";

interface User {
  name: string;
  username: string;
  id: string;
}

export interface AuthContextType {
  user: User | null;
  isFetchingUser: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; user?: User; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  useEffect(() => {
    axios
      .get("https://localhost:5000/api/v1/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => setUser(null))
      .finally(() => setIsFetchingUser(false));
  }, []);

  const login = async (username: string, password: string) => {
    const res = await AuthService.login({ username, password });
    console.log({ res });

    if (res.success) {
      setUser(res.user);
    }
    return res;
  };
  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, isFetchingUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
