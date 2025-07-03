import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { UserContext } from "../context/UserContext";
import { FaLeaf, FaRecycle, FaAward } from "react-icons/fa";

const Dashboard = () => {
  const { userStats } = useContext(UserContext);

  const data = {
    labels: ["Plastic Saved", "CO₂ Saved", "LoopPoints"],
    datasets: [
      {
        label: "Your Environmental Impact",
        data: [
          userStats.plasticSaved,
          userStats.co2Saved,
          userStats.loopPoints,
        ],
        backgroundColor: ["#4ade80", "#60a5fa", "#facc15"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-green-800">
        🌿 My Loop Dashboard
      </h2>

      {/* Impact Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <FaRecycle className="text-3xl text-green-500 mb-2" />
          <p className="text-gray-600">Plastic Saved</p>
          <h3 className="text-2xl font-bold text-green-700">
            {userStats.plasticSaved} kg
          </h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <FaLeaf className="text-3xl text-blue-500 mb-2" />
          <p className="text-gray-600">CO₂ Emissions Saved</p>
          <h3 className="text-2xl font-bold text-blue-700">
            {userStats.co2Saved} kg
          </h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <FaAward className="text-3xl text-yellow-500 mb-2" />
          <p className="text-gray-600">LoopPoints</p>
          <h3 className="text-2xl font-bold text-yellow-600">
            {userStats.loopPoints}
          </h3>
        </div>
      </div>

      {/* Emissions Chart */}
      <div className="bg-white rounded-xl p-4 shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          📊 Impact Summary Chart
        </h3>
        <Bar data={data} />
      </div>

      {/* Badges Section */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          🏅 Earned Badges
        </h3>
        <div className="flex flex-wrap gap-4">
          {userStats.badges.map((badge, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border w-48 text-center transition-all duration-300 ${
                badge.unlocked
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              }`}
            >
              <p className="font-semibold">{badge.name}</p>
              {badge.unlocked ? "✅ Unlocked" : "🔒 Locked"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
