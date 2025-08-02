import express from "express"
import { image_getter_converter, upload } from "../controllers/ocr_controller.js"


const router = express.Router()


router.post("/api/ocr", upload.single("image"), image_getter_converter);


export default router;
