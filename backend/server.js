import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import processRoute from "./routes/processRoute.js";
import emailRoute from "./routes/emailRoute.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/process-document", processRoute);
app.use('/send-email', emailRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});