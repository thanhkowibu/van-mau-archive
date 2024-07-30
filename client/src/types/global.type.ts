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
};
