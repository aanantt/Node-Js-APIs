import { config, uploader } from 'cloudinary'; 
const cloudinaryConfig = () => config({ 
    cloud_name: "freecloudstorageforapis", 
    api_key: "413646862596223", 
    api_secret: "UEyG7hW99eDrG0YtFsccmToI6Jc", });
export { cloudinaryConfig, uploader };