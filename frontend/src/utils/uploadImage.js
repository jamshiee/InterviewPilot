import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile)=>{
    const formData = new FormData();
    formData.append('image',imageFile)

    try{
        const res= await axiosInstance.post('/api/auth/upload-image',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        return res.data
    }catch(error){
        console.log("Error uploading the image: ",error)
        throw error
    }
}

export default uploadImage
