import React from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

const Dashboard = () => {
  const data = {
    labels: ["Plastic Saved (kg)", "CO₂ Saved (kg)", "LoopPoints"],
    datasets: [
      {
        label: "Your Impact",
        data: [1.5, 3.9, 85],
        backgroundColor: ["#4ade80", "#60a5fa", "#facc15"]
      }
    ]
  };

  const badges = [
    { name: "Refill Rookie", unlocked: true },
    { name: "Tote Champ", unlocked: false },
    { name: "Loop Legend", unlocked: false }
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Loop Dashboard</h2>
      <Bar data={data} />

      <h3 className="mt-6 text-xl font-semibold">Badges</h3>
      <div className="flex space-x-4 mt-2">
        {badges.map((badge, idx) => (
          <div key={idx} className={`p-4 rounded shadow ${badge.unlocked ? "bg-yellow-300" : "bg-gray-200"}`}>
            {badge.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
