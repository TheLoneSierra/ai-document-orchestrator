export default function ExtractedData({ data }) {
  const rawAnswer = data?.answer;

  let parsedAnswer;

  try {
    parsedAnswer =
      typeof rawAnswer === "string"
        ? JSON.parse(rawAnswer)
        : rawAnswer;
  } catch (e) {
    parsedAnswer = null;
  }

  if (!parsedAnswer || typeof parsedAnswer !== "object") {
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
        <p className="font-semibold">Invalid Answer Format</p>
        <pre className="text-xs mt-2 whitespace-pre-wrap">
          {String(rawAnswer)}
        </pre>
      </div>
    );
  }

  console.log("Data: ", data);

  return (
    <div className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-indigo-50 to-indigo-100">
        <h2 className="text-lg font-semibold text-indigo-700">
          Extracted Insights
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Field</th>
              <th className="px-6 py-3 text-left">Value</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {Object.entries(parsedAnswer).map(([key, value], index) => {
              const displayValue =
                typeof value === "object"
                  ? JSON.stringify(value, null, 2)
                  : String(value);

              return (
                <tr
                  key={key}
                  className={`hover:bg-indigo-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800 w-1/3 align-top">
                    {key}
                  </td>

                  <td className="px-6 py-4 text-gray-600 whitespace-pre-wrap break-words">
                    {displayValue}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}