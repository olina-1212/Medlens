import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AnalysisPage() {
  const [searchParams] = useSearchParams();
  const docId = searchParams.get("docId");
  

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/documents/${docId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDocument(res.data);
      } catch (err) {
        console.error("Failed to fetch document:", err);
      } finally {
        setLoading(false);
      }
    };

    if (docId) fetchDocument();
  }, [docId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            
            {loading ? (
              <div className="text-gray-500">Loading analysis...</div>
            ) : !document ? (
              <div className="text-red-500">Document not found</div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                
                {/* LEFT SIDE - IMAGE */}
<div className="bg-white p-4 rounded-xl shadow">
  <h2 className="font-semibold mb-4">Prescription</h2>

  {document.fileUrl ? (
    <img
      src={`http://localhost:5000${encodeURI(document.fileUrl)}`}
      alt="Prescription"
      className="w-full rounded-lg"
    />
  ) : (
    <div className="text-gray-500">No image found</div>
  )}
</div>

                {/* RIGHT SIDE - DATA */}
                <div className="bg-white p-4 rounded-xl shadow space-y-4">
                  
                  <div>
                    <h2 className="font-semibold">Extracted Text</h2>
                    {document.aiResult ? (
  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
    {JSON.stringify(document.aiResult, null, 2)}
  </pre>
) : (
  <p className="text-gray-500">AI processing...</p>
)}
                  </div>

                  <div>
                    <h2 className="font-semibold">Document Info</h2>
                    <p className="text-sm text-gray-600">
                      ID: {document.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      Created: {new Date(document.createdAt).toLocaleString()}
                    </p>
                  </div>

                </div>

              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}