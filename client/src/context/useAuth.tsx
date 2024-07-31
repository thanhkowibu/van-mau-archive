import { createContext, useState, useContext, useEffect } from "react";
import {
  ContextProps,
  ContextProviderProps,
  UserProps,
} from "../types/global.type";

export const GlobalContext = createContext({} as ContextProps);

export const GlobalContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (user && accessToken && refreshToken) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useAuth = () => useContext(GlobalContext);
