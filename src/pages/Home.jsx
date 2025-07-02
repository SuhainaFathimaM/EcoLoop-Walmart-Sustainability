import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">One Loop, Zero Waste 🌿</h1>
      <p className="mb-6">Shop Smart with Refill & Reuse</p>
      <Link to="/refill" className="btn">Find Refill Station</Link>
      <Link to="/return" className="btn ml-4">Start Packaging Return</Link>
    </div>
  );
}

export default Home;
