export type UserProps = {
  id: number;
  username: string;
  email: string;
  favs: number[];
};

export type ContextProviderProps = {
  children: React.ReactNode;
};

export type ContextProps = {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTags: string[];
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>;
  searchTrigger: number;
  triggerSearch: () => void;
};
