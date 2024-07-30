import { useMemo } from "react";
import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/";

const usePrivateClient = () => {
  const privateClient = useMemo(() => {
    const client = axios.create({
      baseURL,
    });

    client.interceptors.request.use((config: any) => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      return {
        ...config,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken,
        },
      };
    });

    client.interceptors.response.use(
      (response) => {
        const newAccessToken = response.headers["authorization"]?.split(" ")[1];
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
        }

        return response;
      },
      (err) => {
        if (err.response && err.response.status === 403) {
          console.log("Your login session has expired");
        }
        throw err.response.data;
      }
    );

    return client;
  }, []);

  return privateClient;
};

export default usePrivateClient;
