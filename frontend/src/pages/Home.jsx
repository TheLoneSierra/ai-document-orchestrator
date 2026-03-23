import UploadForm from "../components/UploadForm";
import ExtractedData from "../components/ExtractedData";
import EmailSection from "../components/EmailSection";
import ResultSection from "../components/ResultSection";
import { useState } from "react";

export default function Home() {
  const [extractedData, setExtractedData] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            AI Document Orchestrator
          </h1>
          <p className="text-gray-500">
            Extract insights and automate decisions instantly
          </p>
        </div>

        {/* SECTIONS */}
        <UploadForm setExtractedData={setExtractedData} />

        {extractedData && (
          <ExtractedData data={extractedData} />
        )}

        {extractedData && (
          <EmailSection data={extractedData} setResult={setResult} />
        )}

        {/* {result && <ResultSection result={result} />} */}

      </div>
    </div>
  );
}