import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "/Users/rahul/OneDrive/Desktop/New folder/client/src/assets");
    },
    filename(req, file, cb) {
        const id = uuid();
        const extName = file.originalname.split(".").pop();
        cb(null, `${id}.${extName}`);
    },
});

export const singleUpload = multer({ storage }).single("photo");

export const multipleUpload = multer({ storage }).array("image", 5);