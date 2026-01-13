import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
});


//  interceptors

import { api } from "./api";

export const setupInterceptors = (setToken) => {
    api.interceptors.response.use(
        res => res,
        async error => {
            if (error.response.status === 401) {
                const res = await api.post("/refresh");
                setToken(res.data.accessToken);
                error.config.headers.Authorization =
                    "Bearer " + res.data.accessToken;
                return api(error.config);
            }
            return Promise.reject(error);
        }
    );
};