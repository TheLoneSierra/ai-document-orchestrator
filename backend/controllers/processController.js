import { createRequire } from "module";
const require = createRequire(import.meta.url);

import fs from "fs";
import axios from "axios";``
import { extractData } from "../services/aiService.js";

// Import pdf-parse at module level
const pdfParse = require("pdf-parse");

export const processDocument = async (req, res) => {
  try {
    const file = req.file;
    const question = req.body.question;

    if (!file || !question) {
      console.log("Missing file or question");
      return res.status(400).json({ error: "File and question are required" });
    }

    let text = "";
``
    if (file.mimetype === "application/pdf") {
      console.log("Processing PDF file:", file.path);
      try {
        const buffer = fs.readFileSync(file.path);
        console.log("Buffer read successfully, size:", buffer.length);
        const data = await pdfParse(buffer);
        text = data.text;
        console.log("PDF parsed successfully, text length:", text.length);
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        throw pdfError;
      }
    } 
    else {
      console.log("Processing TXT file:", file.path);
      text = fs.readFileSync(file.path, "utf-8");
      console.log("TXT read successfully, text length:", text.length);
    }

    // limit text (avoid huge input)
    text = text.slice(0, 3000);

    // AI extraction
    const extracted = await extractData(text, question);

    // Return extracted data to frontend
    return res.status(200).json({
      answer: extracted,
      question,
      rawText: text,
    });

  } catch (err) {
    console.error("PROCESS ERROR:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};