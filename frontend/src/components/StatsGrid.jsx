import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, Brain, Pill } from "lucide-react";
import KpiCard from "./KpiCard";

export default function StatsGrid() {
  const [stats, setStats] = useState({
    totalPrescriptions: 0,
    analyzedCount: 0,
    medicineCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://import.meta.env.VITE_API_URL/api/documents/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-3">

  <KpiCard
    label="Total Prescriptions"
    value={stats.totalPrescriptions}
    icon={FileText}
    gradient="bg-gradient-to-br from-blue-100 via-blue-50 to-white"
    iconBg="bg-blue-600"
  />

  <KpiCard
    label="AI Analyses Completed"
    value={stats.analyzedCount}
    icon={Brain}
    gradient="bg-gradient-to-br from-violet-100 via-purple-50 to-white"
    iconBg="bg-violet-600"
  />

  <KpiCard
    label="Medicines Identified"
    value={stats.medicineCount}
    icon={Pill}
    gradient="bg-gradient-to-br from-emerald-100 via-green-50 to-white"
    iconBg="bg-emerald-600"
  />

</div>
  );
}