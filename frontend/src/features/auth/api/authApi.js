import api from "../../../api/axios";

export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.log("This is error",error?.response);
        const serverMessage = error?.response?.data?.message
            || error?.response?.data?.error
            || 'Invalid username or password';

        return {
            success: false,
            message: serverMessage,
            data: error?.response?.data || {},
        };
    }
};
export const logout=async()=>{
    const response = await api.post('/auth/logout');
    return response.data;
}
export const refreshToken = async () => {
    const response = await api.post("/auth/refresh");
    return response.data;
};

export const changePassword = async (data) => {
    const response = await api.put("/auth/change-password", data);
    return response.data;
};

export const me = async ()=>{
    const response = await  api.get("/auth/me");
    return response.data;
}