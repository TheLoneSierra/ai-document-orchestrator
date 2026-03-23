import { createRequire } from "module";
const require = createRequire(import.meta.url);

import axios from "axios";

export const sendEmail = async (req, res) => {
  try {
    const { email, question, answers, rawText } = req.body;
    console.log("Body: ", req.body);

    if (!email || !answers) {
      console.log("Missing required fields: email or answers");
      return res.status(400).json({ error: "email and answers are required" });
    }

    // Send to n8n webhook for email automation
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    try {
      console.log("Sending to n8n for email automation...");
      console.log("Recipient email:", email);
      const n8nResponse = await axios.post(n8nWebhookUrl, {
        email,
        question,
        answers,
        rawText,
      });

      console.log("n8n webhook success, status:", n8nResponse.status);
      return res.status(n8nResponse.status).json({
        status: "success",
        message: "Email sent successfully via n8n",
        data: n8nResponse.data,
      });
    } catch (n8nError) {
      console.error("n8n webhook error:", n8nError.message);
      console.error("n8n error response data:", n8nError.response?.data);
      console.error("n8n error response status:", n8nError.response?.status);

      return res.status(502).json({
        status: "n8n_error",
        message: "Failed to send email via n8n",
        error: n8nError.response?.data || n8nError.message,
        webhookUrl: n8nWebhookUrl,
      });
    }
  } catch (err) {
    console.error("EMAIL SEND ERROR:", err);
    res.status(500).json({ error: "Something went wrong while sending email" });
  }
};
