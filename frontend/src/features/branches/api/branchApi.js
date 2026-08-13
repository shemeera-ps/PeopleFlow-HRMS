import {api} from "../../../api/axios";
export const listAllBranches=async ()=>{
    try{
        const response = await api.get("/branches/all");
        return response.data;
    }catch{}
}
export const listBranches=async(params)=>{
    try{
        const response=await api.get("branches/list",params);
        return response.data;
    }catch{
        return {
            response:false,
            data:[]
        }
    }
}
export const createBranch=async (payload)=>{
     try{
        console.log(payload);
        const response =await api.post("/branches/store",payload);
        return response.data;
    }catch (error) {
        console.log(error);
        console.log(
            "Branch creation error:",
            error?.response?.data
        );

        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "Failed to create branch",

            errors:
                error?.response?.data?.errors || {},
        };
    }
}

export const getBranch=async (branchId)=>{
    try{
        const response = await api.get(`/branches/${branchId}`);
        return response.data;
    }catch(error){
        console.log(error);
        return {
            success:false,
            data:[]
        }
    }
}
export const updateBranch=async (branchId,payload)=>{
    try{
        const response = await api.put(`/branches/${branchId}/update`,payload);
        return response.data;
    }catch(error){
        console.log(error);
        return { success:false,message:"Failed to update branch",errors:{}}
    }
}

export const deleteBranch=async (branchId)=>{
    try{
        const response = await api.delete(`/branches/delete/${branchId}`);
        return response.data;
    }catch(error){
        console.log(error);
        return { success:false,message:"Failed to delete branch",errors:{}}
    }
}