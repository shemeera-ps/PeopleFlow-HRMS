import { api } from "../../../api/axios";

export const allShifts = async (params)=>{
    const response = await api.get("/shifts/all",params);
    return response.data;
}

export const createShift = async (payload)=>{
    try{
        const response = await api.post("/shifts/store",payload);
        return response.data;   
    }catch (error) {
        console.log(
            "Shift creation error",
            error?.response?.data
        );
        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "Failed to create shift",
        }
    }
}

export const getShift = async (shiftId)=>{
    try{
        const response = await api.get(`/shifts/${shiftId}`);
        return response.data;
    }catch(error){
        console.log(error);
        return {
            success:false,
            data:[]
        }
    }
}

export const updateShift = async (shiftId,payload)=>{
    try{
        const response = await api.put(`/shifts/${shiftId}/update`,payload);
        return response.data;
    }catch(error){
        console.log(error);
        return {
            success:false,
            message:
                error?.response?.data?.message ||
                "Failed to update shift",
        }
    }
}

export const deleteShift = async (shiftId)=>{
    try{
        const response = await api.delete(`/shifts/delete/${shiftId}`);
        return response.data;
    }catch(error){
        console.log(error);
        return {
            success:false,
            message:
                error?.response?.data?.message ||
                "Failed to delete shift",
        }
    }
}