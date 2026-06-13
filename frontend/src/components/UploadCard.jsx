import { useState, useRef } from "react";
import { UploadCloud, FileUp } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadCard() {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const uploadFile = async (file) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first (no token found)");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload/prescription`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("OCR + AI Result:", res.data);

      // 🔥 IMPORTANT: pass full data to next page
      navigate(`/analysis?docId=${res.data.documentId}`);

      setFileName(file.name);

    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed. Check backend.");
    } finally {
      setUploading(false);
    }
  };

  const onFiles = (files) => {
    if (files && files[0]) {
      setFileName(files[0].name);
      uploadFile(files[0]);
    }
  };

  return (
    <section id="upload" className="scroll-mt-24">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          onFiles(e.dataTransfer.files);
        }}
        className={`rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-300 md:p-16 ${
          dragOver
            ? "border-blue-500 bg-blue-50 scale-[1.01]"
            : "border-gray-300 bg-white hover:border-blue-400"
        }`}
      >
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
            <UploadCloud className="h-10 w-10 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Drag & Drop Prescription Here
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Supports JPG, PNG and PDF files
          </p>

          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            onChange={(e) => onFiles(e.target.files)}
          />

          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            <FileUp className="h-5 w-5" />
            {uploading ? "Processing AI..." : "Browse Files"}
          </button>

          {fileName && (
            <p className="mt-4 rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              Selected: {fileName}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}