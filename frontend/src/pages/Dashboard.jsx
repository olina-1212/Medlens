import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import UploadCard from "../components/UploadCard";
import StatsGrid from "../components/StatsGrid";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <Hero />
            <UploadCard />
            <StatsGrid />
          </div>
        </main>
      </div>
    </div>
  );
}