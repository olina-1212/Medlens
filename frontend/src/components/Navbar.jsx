import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
window.location.href = "/auth";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Logo />

        <nav className="hidden md:flex items-center gap-6">

          <Link
            to="/"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            History
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Logout
          </button>

        </nav>

      </div>
    </header>
  );
}