import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function JsonDisplay({ results }: { results: any[] }) {
  const jsonString =
    results.length > 0 ? JSON.stringify(results, null, 2) : "No results found";

  return (
    <div className="p-4 w-full bg-gray-100 rounded-lg">
      <SyntaxHighlighter language="json" style={vs} wrapLongLines>
        {jsonString}
      </SyntaxHighlighter>
    </div>
  );
}
