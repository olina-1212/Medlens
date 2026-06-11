import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Trash2, Plus } from "lucide-react";

export default function AnalysisPage() {
  const [searchParams] = useSearchParams();
  const docId = searchParams.get("docId");

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editableAi, setEditableAi] = useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `import.meta.env.VITE_API_URL/api/documents/${docId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDocument(res.data);
        setEditableAi(res.data.aiResult || "");
      } catch (err) {
        console.error("Failed to fetch document:", err);
      } finally {
        setLoading(false);
      }
    };

    if (docId) fetchDocument();
  }, [docId]);
  const deleteMedicine = (indexToDelete) => {
  const updated = structuredClone(document);

  updated.aiResult.medicines =
    updated.aiResult.medicines.filter(
      (_, index) => index !== indexToDelete
    );

  setDocument(updated);
};

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
                      src={`import.meta.env.VITE_API_URL${encodeURI(document.fileUrl)}`}
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
                      <div className="bg-white p-6 rounded-xl shadow overflow-y-auto">

                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-semibold">
                            AI Prescription Analysis
                          </h2>

                          <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                            AI Verified
                          </span>
                        </div>

                        {/* Patient Summary */}
                        {document.aiResult?.summary && (
                          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
                            <h3 className="font-semibold mb-2">
                              Patient Summary
                            </h3>

                            <p className="text-sm text-gray-700">
                              {document.aiResult.summary}
                            </p>
                          </div>
                        )}

                        {/* Medicines */}
                        {!document.aiResult?.medicines?.length ? (
                          <p className="text-gray-500">
                            No medicines detected.
                          </p>
                        ) : (
                          <div className="space-y-5">

  <button
    onClick={() => {
      const updated = structuredClone(document);

      if (!updated.aiResult.medicines) {
        updated.aiResult.medicines = [];
      }

      updated.aiResult.medicines.push({
        name: "",
        dosage: "",
        frequency: "",
        timing: "",
        duration: "",
        usage: "",
        sideEffects: "",
      });

      setDocument(updated);
    }}
    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
  >
    <Plus size={18} />
    Add Medicine
  </button>

                            {document.aiResult?.medicines?.map((medicine, index) => (
                              <div
                                key={index}
                                className="border rounded-xl p-4 bg-gray-50"
                              >

                                {/* MEDICINE NAME */}
                                <div className="flex items-center gap-2 mb-4">
  <span className="text-xl">💊</span>

  <input
    value={medicine.name}
    onChange={(e) => {
      const updated = { ...document };
      updated.aiResult.medicines[index].name =
        e.target.value;
      setDocument(updated);
    }}
    className="font-semibold text-lg bg-transparent outline-none w-full"
  />

  <button
    onClick={() => deleteMedicine(index)}
    className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-red-600 hover:bg-red-200"
  >
    <Trash2 size={16} />
    Delete
  </button>
</div>

                                {/* GRID */}
                                <div className="grid grid-cols-2 gap-4">

                                  <div>
                                    <label className="text-xs text-gray-500">Dosage</label>
                                    <input
                                      value={medicine.dosage}
                                      onChange={(e) => {
                                        const updated = { ...document };
                                        updated.aiResult.medicines[index].dosage = e.target.value;
                                        setDocument(updated);
                                      }}
                                      className="w-full border rounded-lg p-2 mt-1"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-xs text-gray-500">Frequency</label>
                                    <input
                                      value={medicine.frequency}
                                      onChange={(e) => {
                                        const updated = { ...document };
                                        updated.aiResult.medicines[index].frequency = e.target.value;
                                        setDocument(updated);
                                      }}
                                      className="w-full border rounded-lg p-2 mt-1"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-xs text-gray-500">Timing</label>
                                    <input
                                      value={medicine.timing}
                                      onChange={(e) => {
                                        const updated = { ...document };
                                        updated.aiResult.medicines[index].timing = e.target.value;
                                        setDocument(updated);
                                      }}
                                      className="w-full border rounded-lg p-2 mt-1"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-xs text-gray-500">Duration</label>
                                    <input
                                      value={medicine.duration}
                                      onChange={(e) => {
                                        const updated = { ...document };
                                        updated.aiResult.medicines[index].duration = e.target.value;
                                        setDocument(updated);
                                      }}
                                      className="w-full border rounded-lg p-2 mt-1"
                                    />
                                  </div>

                                </div>

                                <div className="mt-4">
                                  <label className="text-xs text-gray-500">Purpose</label>
                                  <textarea
                                    value={medicine.usage}
                                    onChange={(e) => {
                                      const updated = { ...document };
                                      updated.aiResult.medicines[index].usage = e.target.value;
                                      setDocument(updated);
                                    }}
                                    className="w-full border rounded-lg p-2 mt-1"
                                    rows={2}
                                  />
                                </div>

                                <div className="mt-4">
                                  <label className="text-xs text-gray-500">
                                    Common Side Effects
                                  </label>

                                  <textarea
                                    value={medicine.sideEffects}
                                    onChange={(e) => {
                                      const updated = { ...document };
                                      updated.aiResult.medicines[index].sideEffects = e.target.value;
                                      setDocument(updated);
                                    }}
                                    className="w-full border rounded-lg p-2 mt-1"
                                    rows={2}
                                  />
                                </div>

                                <button
                                  onClick={async () => {
                                    const token = localStorage.getItem("token");

                                    await axios.put(
                                      `import.meta.env.VITE_API_URL/api/documents/${document.id}/ai`,
                                      {
                                        aiResult: document.aiResult,
                                      },
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    );

                                    alert("Saved");
                                  }}
                                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                  Save Changes
                                </button>

                              </div>
                            ))}
                          </div>
                        )}

                      </div>
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