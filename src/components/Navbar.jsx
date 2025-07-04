import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "🏠 Home" },
  { path: "/refill", label: "🧴 Refill" },
  { path: "/return", label: "♻️ Return" },
  { path: "/checkout", label: "📦 PackLite" },
  { path: "/dashboard", label: "📊 Dashboard" },
  { path: "/profile", label: "👤 Profile" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-green-800 via-lime-600 to-green-500 shadow-md py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <span className="text-xl font-bold text-white tracking-wide">
          🌿 EcoLoop
        </span>
        <div className="flex space-x-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-white text-green-700 font-semibold shadow-lg"
                  : "text-white hover:bg-white hover:text-green-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
