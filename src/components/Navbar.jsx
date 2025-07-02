import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-green-700 text-white">
      <h1 className="text-xl font-bold">EcoLoop</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/refill">Refill</Link>
        <Link to="/return">Return</Link>
        <Link to="/checkout">PackLite</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
