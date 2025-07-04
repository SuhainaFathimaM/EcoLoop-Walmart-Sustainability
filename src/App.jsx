import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RefillFinder from "./pages/RefillFinder";
import ReturnScheduler from "./pages/ReturnScheduler";
import PackLiteCheckout from "./pages/PackLiteCheckout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";

// Add inside <BrowserRouter> before closing
<Footer />

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/refill" element={<RefillFinder />} />
        <Route path="/return" element={<ReturnScheduler />} />
        <Route path="/checkout" element={<PackLiteCheckout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
