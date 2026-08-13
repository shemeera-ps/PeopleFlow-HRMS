import { api } from "../../../api/axios"

export const list = async (params)=>{
    try{
        const response = await api.get('/users/all',{params:params});
        return response.data;
    }catch(error){
        console.log("Employee listing error",error);
        return {
            success:false,
            message:"Failed to fetch employees list"
        }
    }
}
export const removeUser =async (userId)=> {
    try{
        const response = await api.delete(`/users/delete/${userId}`);
        return response.data;
    }catch(error){
        console.log("Employee delete error",error);
        return {
            success:false,
            message:"Failed to remove user"
        }
    }
}
export const createUser = async (payload)=>{
    try{
        const response = await api.post("/users/store",payload);
        return response.data;
    }catch(error){
        console.log("Employee creation error",error);
        return {
            success:false,
            message:"Failed to create user"
        }
    }
}
export const getUser=async (userId)=>{
    try{
        const response = await api.get(`/users/users/${userId}`);
        return response.data;
    }catch(error){
        console.log("Employee fetch error",error);
        return {
            success:false,
            message:"Failed to fetch individual user"
        }
    }
}
export const updateUser = async (payload, userId) => {
    try {
        const response = await api.put(
            `/users/${userId}/update`,
            payload
        );

        return response.data;

    } catch (error) {
        console.log(
            "Employee update error",
            error?.response?.data
        );

        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "Failed to update the user",

            errors:
                error?.response?.data?.errors || {},
        };
    }
};
