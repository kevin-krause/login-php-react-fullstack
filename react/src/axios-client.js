import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.get("ACESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("ACESS_TOKEN");
        }

        throw error;
    }
);

export default axiosClient;