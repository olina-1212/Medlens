import { LayoutDashboard, Upload, History } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Upload, label: "Upload", href: "#upload" },
  { icon: History, label: "History", href: "/history" },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-20 shrink-0 border-r border-gray-100 bg-white/60 backdrop-blur lg:block">
      <nav className="flex flex-col items-center gap-2 p-4">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.href}
              title={item.label}
              className="group relative flex h-12 w-12 items-center justify-center rounded-xl text-gray-600 transition hover:bg-blue-600 hover:text-white"
            >
              <Icon className="h-5 w-5" />

              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}

      </nav>
    </aside>
  );
}