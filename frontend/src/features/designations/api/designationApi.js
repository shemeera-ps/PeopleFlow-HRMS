import { api } from "../../../api/axios";

export const allDesignations = async ()=>{
    try{
        const response= await api.get("/designations/all");
        return response.data;
    }catch(error){
        console.log(error);
        return {success:true,data:[]};
    }
}
export const designationUnderDepartment=async (departmentId)=>{
    try{
        const response=await api.get(`/designations/departments/${departmentId}`);
        return response.data;
    }catch(error){
        console.log(error);
        return {success:true,data:[]};
    }
}
export const createDesignations=async (payload)=>{
     try{
        const response =await api.post("/designations/store",payload);
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
                "Failed to create designation",

            errors:
                error?.response?.data?.errors || {},
        };
    }
}
export const deleteDesignation=async (designationId)=>{
    try{
        const response=await api.delete(`/designations/delete/${designationId}`);
        return response.data;
    }catch (error) {
       

        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "Failed to delete designation",

            errors:
                error?.response?.data?.errors || {},
        };
    }
}