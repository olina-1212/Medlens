import { Upload, Sparkles } from "lucide-react";
import heroImg from "../assets/hero-medical.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-blue-50 p-8 md:p-12">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-600">
            <Sparkles className="h-4 w-4" />
            AI-Powered Prescription Analysis
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Understand Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Prescriptions
            </span>{" "}
            with AI
          </h1>

          <p className="mt-5 max-w-xl text-base text-gray-600 md:text-lg">
            Upload prescriptions, extract medicine details, understand
            medication usage, and maintain your medical records effortlessly.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              onClick={() =>
                document
                  .getElementById("upload")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Upload className="h-5 w-5" />
              Upload Prescription
            </button>

            <button className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-blue-400/20 blur-2xl animate-float" />

<img
  src={heroImg}
  alt="Healthcare prescription analysis illustration"
  className="relative w-full rounded-3xl shadow-xl animate-float"
/>
        </div>
      </div>
    </section>
  );
}