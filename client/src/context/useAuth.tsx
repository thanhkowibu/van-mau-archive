import { createContext, useState, useContext, useEffect } from "react";
import {
  ContextProps,
  ContextProviderProps,
  UserProps,
} from "../types/global.type";

export const GlobalContext = createContext({} as ContextProps);

export const GlobalContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchTrigger, setSearchTrigger] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (user && accessToken && refreshToken) {
      setUser(JSON.parse(user));
    }
  }, []);

  const triggerSearch = () => {
    if (searchTerm === "" && searchTags.length === 0) {
      setSearchTrigger(0);
    } else {
      setSearchTrigger((prev) => prev + 1); // Increment to trigger a search
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        searchTerm,
        setSearchTerm,
        searchTags,
        setSearchTags,
        triggerSearch,
        searchTrigger,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useAuth = () => useContext(GlobalContext);
