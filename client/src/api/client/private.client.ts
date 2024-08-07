// private.client.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const privateClient = axios.create({
  baseURL,
});

privateClient.interceptors.request.use((config: any) => {
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

privateClient.interceptors.response.use(
  (response) => {
    // Check for new access token in headers
    const newAccessToken = response.headers["authorization"]?.split(" ")[1];
    if (newAccessToken) {
      // Update local storage with new token
      localStorage.setItem("accessToken", newAccessToken);
    }

    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (err.response && err.response.status === 403) {
      console.log("Your login session has expired");
    }
    throw err.response.data;
  }
);

export default privateClient;
