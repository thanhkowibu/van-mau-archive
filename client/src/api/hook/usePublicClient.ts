import { useMemo } from "react";
import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/";

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
