export default function ResultSection({ result }) {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-gray-200 space-y-5">

      <h2 className="text-xl font-semibold">Final Output</h2>

      <div className="p-4 bg-gray-50 rounded-xl border">
        <p className="text-sm text-gray-500">Final Answer</p>
        <p className="mt-1 font-medium">{result.answer}</p>
      </div>

      <div className="p-4 bg-gray-50 rounded-xl border">
        <p className="text-sm text-gray-500">Email Body</p>
        <p className="mt-1">{result.emailBody}</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Status</span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            result.status === "sent"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {result.status}
        </span>
      </div>
    </div>
  );
}