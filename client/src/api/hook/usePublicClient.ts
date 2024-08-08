import { useMemo } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const usePublicClient = () => {
  const publicClient = useMemo(() => {
    const client = axios.create({
      baseURL,
    });

    client.interceptors.request.use((config: any) => {
      return {
        ...config,
      };
    });

    client.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        throw err.response.data;
      }
    );

    return client;
  }, []);

  return publicClient;
};

export default usePublicClient;
