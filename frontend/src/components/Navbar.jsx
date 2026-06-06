import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
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

        </nav>

      </div>
    </header>
  );
}