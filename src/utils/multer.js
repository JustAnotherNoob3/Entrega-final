import multer from "multer";
import { __dirname } from "./misc_utils.js";

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,__dirname+'/public/docs');
    },
    filename: (req,file,cb)=>{
        cb(null,req.params.uid +"-"+ file.fieldname + "-" + file.originalname);
    }
})
export const uploader = multer({storage});