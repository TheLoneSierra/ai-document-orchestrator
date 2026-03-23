import { useState } from "react";

export default function EmailSection({ setResult, data }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email) {
      alert("Please enter an email address");
      return;
    }

    if (!data || !data.answer) {
      alert("No extracted data to send");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          question: data.question,
          answers: data.answer,
          rawText: data.rawText,
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to send email");
      }

      console.log("Email send response:", responseData);
      setResult({
        answer: data.answer,
        emailStatus: responseData.status,
        message: responseData.message,
      });

      setEmail("");
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      setResult({
        error: error.message || "Failed to send email",
      });
      alert("Failed to send email: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-gray-200 space-y-4">

      <h2 className="text-xl font-semibold">
        Trigger Automation
      </h2>

      <input
        type="email"
        placeholder="Enter recipient email"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-xl outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Alert Mail"}
      </button>
    </div>
  );
}
