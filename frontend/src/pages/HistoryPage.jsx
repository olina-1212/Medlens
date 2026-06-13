import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, Calendar, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function HistoryPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  // FETCH HISTORY
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/documents`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRecords(res.data);
      } catch (err) {
        console.error("Failed to load history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // DELETE DOCUMENT
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `import.meta.env.VITE_API_URL/api/documents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // remove from UI instantly
      setRecords((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete document");
    }
  };

// SEARCH + FILTER LOGIC
const filteredRecords = records.filter((r) => {
  const matchesSearch = (r.fileName || "")
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesFilter =
    filter === "all"
      ? true
      : filter === "analyzed"
      ? !!r.aiResult
      : filter === "pending"
      ? !r.aiResult
      : true;

  return matchesSearch && matchesFilter;
});

return (
  <div className="min-h-screen bg-background">
    <Navbar />

    <div className="flex w-full">
      <Sidebar />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Prescription History
          </h1>
          <p className="mt-2 text-muted-foreground">
            All your uploaded prescriptions.
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">

          {/* SEARCH BOX */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              placeholder="Search prescriptions..."
              className="w-full rounded-xl border p-2 pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* FILTER DROPDOWN */}
          <select
            className="rounded-xl border px-3 py-2 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="analyzed">Analyzed</option>
            <option value="pending">Pending</option>
          </select>

        </div>

        {/* CONTENT */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          {loading ? (
            <div className="p-6 text-gray-500">Loading...</div>
          ) : filteredRecords.length === 0 ? (
            <div className="p-6 text-gray-500">
              No prescriptions found.
            </div>
          ) : (
            filteredRecords.map((r, i) => (
              <div
                key={r.id}
                className={`flex flex-wrap items-center gap-4 p-5 hover:bg-gray-50 ${
                  i !== filteredRecords.length - 1
                    ? "border-b"
                    : ""
                }`}
              >
                  {/* ICON */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <FileText className="h-5 w-5" />
                  </div>

                  {/* FILE INFO */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">
                      {r.fileName || "Untitled"}
                    </p>

                    <p className="mt-0.5 flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>

                      <span>
                        {r.aiResult?.medicines?.length || 0} medicines
                      </span>
                    </p>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      r.aiResult
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {r.aiResult ? "Analyzed" : "Pending"}
                  </span>

                  {/* ACTIONS */}
                  <div className="flex gap-2">

                    {/* VIEW */}
                    <button
                      className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100"
                      onClick={() => navigate(`/analysis?docId=${r.id}`)}
                    >
                      View
                    </button>

                    {/* DELETE */}
                    <button
                      className="rounded-lg border px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>

        </main>
      </div>
    </div>
  );
}