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

            {/* ABOUT SECTION */}
            <section
              id="about-medlens"
              className="rounded-3xl bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                About MedLens
              </h2>

              <p className="mt-4 text-gray-600">
                MedLens is an AI-powered prescription analysis
                platform that helps users digitize and understand
                handwritten medical prescriptions. Using OCR and AI,
                it extracts medicine names, dosage instructions,
                duration, timing, and other important details from
                uploaded prescriptions.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 p-6 text-white shadow-lg">
    <div className="mb-4 text-4xl">📄</div>
    <h3 className="text-xl font-bold">Upload</h3>
    <p className="mt-2 text-sm text-blue-50">
      Upload a prescription image securely from any device.
    </p>

    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10"></div>
  </div>

  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-purple-500 p-6 text-white shadow-lg">
    <div className="mb-4 text-4xl">🧠</div>
    <h3 className="text-xl font-bold">Analyze</h3>
    <p className="mt-2 text-sm text-purple-50">
      OCR and AI extract medicines, dosage and instructions.
    </p>

    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10"></div>
  </div>

  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-green-400 p-6 text-white shadow-lg">
    <div className="mb-4 text-4xl">📚</div>
    <h3 className="text-xl font-bold">Manage</h3>
    <p className="mt-2 text-sm text-green-50">
      Access all previous prescriptions from your history.
    </p>

    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10"></div>
  </div>
</div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}