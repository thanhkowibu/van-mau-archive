import { createContext, useState, useContext } from "react";
import {
  ContextProps,
  ContextProviderProps,
  UserProps,
} from "../types/global.type";

export const GlobalContext = createContext({} as ContextProps);

export const GlobalContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useAuth = () => useContext(GlobalContext);
