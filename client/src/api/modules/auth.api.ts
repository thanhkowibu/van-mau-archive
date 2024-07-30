import usePublicClient from "../hook/usePublicClient";

const useAuthApi = () => {
  const publicClient = usePublicClient();

  const login = async (email: string, password: string) => {
    return publicClient.post("auth/login", { email, password });
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    return publicClient.post("auth/register", {
      username,
      email,
      password,
    });
  };

  return { login, register };
};

export default useAuthApi;
