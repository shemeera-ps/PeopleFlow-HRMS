import { api } from "../../../api/axios"

export const allDepartments = async ()=>{
    try{
        const response =await api.get("/departments/all");
        return response.data;
    }catch(error){
        console.log(error);
        return {
            success:false,
            data:[]
        }
    }
}
export const createDepartment=async (payload)=>{
     try{
        const response =await api.post("/departments/store",payload);
        return response.data;
    }catch (error) {
        console.log(
            "Employee update error",
            error?.response?.data
        );

        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "Failed to create department",

            errors:
                error?.response?.data?.errors || {},
        };
    }
}

export const getDepartment=async (departmentId)=>{
    try{
        const response = await api.get(`/departments/getdepartment/${departmentId}`);

        return response.data;
    }catch(error){
        return {
            success:false,
            data:[]
        }
    }
}