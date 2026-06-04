import { FileText, Plus } from "lucide-react";

export default function Logo({ collapsed = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
        <FileText
          className="h-5 w-5 text-white"
          strokeWidth={2.4}
        />

        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow">
          <Plus
            className="h-3 w-3 text-blue-600"
            strokeWidth={3}
          />
        </span>
      </div>

      {!collapsed && (
        <span className="text-xl font-bold tracking-tight text-gray-900">
          Med<span className="text-blue-600">Lens</span>
        </span>
      )}
    </div>
  );
}