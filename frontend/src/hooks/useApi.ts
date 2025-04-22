import axios from "axios";
import { useEffect } from "react";
import { api } from "@/lib/api";
import { useSession } from "./useSession";

const useApi = () => {
    const { session, setSession } = useSession();

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                if (session?.access_token) {
                    config.headers.Authorization = `Bearer ${session?.access_token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    originalRequest.url !== "/api/new-token"
                ) {
                    originalRequest._retry = true;
                    try {
                        if (session) {
                            const res = await axios.get("/api/new-token");
                            setSession({ ...session, access_token: res.data.token });
                            return api(error.config);
                        }
                    } catch (refreshError) {
                        setSession(null);
                        const res = await axios.post("/api/logout");
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [session, setSession]);

    return api;
};

export default useApi;