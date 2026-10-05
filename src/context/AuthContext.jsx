import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

const defaultCredentials = { email: "admin@example.com", password: "admin123" };

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("auth", null);
  const [credentials, setCredentials] = useLocalStorage("adminCredentials", defaultCredentials);

  const isDefaultCredentials =
    credentials.email === defaultCredentials.email &&
    credentials.password === defaultCredentials.password;

  const login = (email, password) => {
    if (email.trim().toLowerCase() === credentials.email && password === credentials.password) {
      setUser({ name: "Admin User", email: credentials.email, role: "Admin" });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  // Saves new credentials only if the current ones are correct
  const updateCredentials = (currentEmail, currentPassword, newEmail, newPassword) => {
    if (
      currentEmail.trim().toLowerCase() !== credentials.email ||
      currentPassword !== credentials.password
    ) {
      return false;
    }
    setCredentials({ email: newEmail.trim().toLowerCase(), password: newPassword });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateCredentials, isDefaultCredentials }}>
      {children}
    </AuthContext.Provider>
  );
}