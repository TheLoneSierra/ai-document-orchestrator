import express from "express";
import multer from "multer";
import { processDocument } from "../controllers/processController.js";

const router = express.Router();

// multer setup
const upload = multer({ dest: "uploads/" });

// route
router.post("/", upload.single("file"), processDocument);

export default router;