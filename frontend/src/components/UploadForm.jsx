import { useState } from "react";

export default function UploadForm({ setExtractedData }) {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file || !question) {
      alert("Please upload a file and enter a question");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("question", question);

      const res = await fetch("http://localhost:5000/process-document", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      setExtractedData(data);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-gray-200 space-y-5">

      <h2 className="text-xl font-semibold">Upload & Analyze</h2>

      {/* FILE INPUT */}
      <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-black transition block">
        <p className="text-gray-500">
          {file ? file.name : "Click to upload PDF or TXT"}
        </p>
        <input
          type="file"
          accept=".pdf,.txt"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      {/* QUESTION */}
      <input
        type="text"
        placeholder="Ask something about the document..."
        className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-xl outline-none"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition font-medium disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Document"}
      </button>
    </div>
  );
}