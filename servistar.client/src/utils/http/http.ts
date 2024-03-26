import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_APP_API;

const instancia = axios.create({
  baseURL,
});

instancia.interceptors.request.use(
  (response: InternalAxiosRequestConfig) => {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      const {
        state: { token },
      } = JSON.parse(credentials);
      response.headers.Authorization = `Bearer ${token}`;
    }
    return response;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

//i Interceptamos las respuestas
instancia.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && window.location.pathname !== "/") {
      localStorage.removeItem("credenciales");
      window.location.href = "/";
    }
    throw error;
  }
);

export default instancia;
