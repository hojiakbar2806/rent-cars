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
                    config.headers.Authorization = `Bearer ${session?.access_token}`
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    try {
                        // const refreshRes = await api.post("/v1/auth/refresh_token", {
                        //     refresh_token: session.refresh_token,
                        // });
                        // const { access_token } = refreshRes.data;

                        // setSession({ ...session, access_token });
                        // axios.post("/api/update-access", { access_token });

                        // error.config.headers.Authorization = `Bearer ${access_token}`;
                        // return api(error.config);
                    } catch (refreshError) {
                        setSession(null);
                        axios.post("/api/update-access", { access_token: null });
                        return Promise.reject(refreshError);
                    }
                }
                else {
                    setSession(null);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [session, setSession])

    return api;
};

export default useApi;