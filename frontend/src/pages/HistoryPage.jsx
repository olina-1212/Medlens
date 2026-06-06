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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/documents",
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

  // Filter by file name
  const filteredRecords = records.filter((r) =>
    (r.fileName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto flex max-w-7xl">
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

          {/* SEARCH */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search prescriptions..."
                className="rounded-xl pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button variant="outline" className="gap-2 rounded-xl">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>

          {/* CONTENT */}
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">

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
                  className={`group flex flex-wrap items-center gap-4 p-5 transition-smooth hover:bg-primary/5 ${
                    i !== filteredRecords.length - 1
                      ? "border-b border-border/60"
                      : ""
                  }`}
                >

                  {/* ICON */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>

                  {/* FILE INFO */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-foreground">
                      {r.fileName || "Untitled"}
                    </p>

                    <p className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">

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

                  {/* BUTTON */}
                 <Button
  size="sm"
  variant="outline"
  className="rounded-lg"
  onClick={() => navigate(`/analysis?docId=${r.id}`)}
>
  View Details
</Button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}