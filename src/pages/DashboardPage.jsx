import React from 'react';
import { mockUserStats } from '../data/mockData.js'; // ← adjust path/extension as needed
import { Recycle, Award, Leaf, TrendingUp, BarChart3 } from 'lucide-react';

const DashboardPage = () => {
  const stats = mockUserStats;

  const monthlyData = [
    { month: 'Jan', refills: 4, returns: 2, plastic: 2.5 },
    { month: 'Feb', refills: 6, returns: 4, plastic: 3.5 },
    { month: 'Mar', refills: 7, returns: 5, plastic: 6.5 },
    { month: 'Apr', refills: 9, returns: 6, plastic: 2.0 },
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Starter Spark',
      description: 'Took your first step toward sustainability!',
      icon: '🎉',
      earned: true,
    },
    {
      id: 2,
      title: 'Loop Legend',
      description: 'Small steps, big impact!',
      icon: '🌱',
      earned: true,
    },
    {
      id: 3,
      title: 'Green Master',
      description: 'You are on a roll!',
      icon: '♻️',
      earned: true,
    },
    {
      id: 4,
      title: 'Earth Ally',
      description: 'Nature thanks you!',
      icon: '🌍',
      earned: true,
    },
  ];

  return (
    <div className="bg-green-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Your Eco Journey
          </h1>
          <p className="text-lg text-gray-700 max-w-xl">
            Track your impact and build a cleaner tomorrow — one step at a time.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {/* Total Refills */}
          <div className="bg-white rounded-xl p-7 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-orange-600 rounded-lg flex items-center justify-center mb-5">
              <Recycle className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-orange-700">{stats.totalRefills}</span>
            <h3 className="mt-3 font-semibold text-gray-900">Total Refills</h3>
            <p className="text-sm text-gray-500 mt-1">Containers refilled</p>
          </div>

          {/* Loop Points */}
          <div className="bg-white rounded-xl p-7 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center mb-5">
              <Award className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-green-700">{stats.loopPoints}</span>
            <h3 className="mt-3 font-semibold text-gray-900">Loop Points</h3>
            <p className="text-sm text-gray-500 mt-1">Rewards earned</p>
          </div>

          {/* Plastic Prevented */}
          <div className="bg-white rounded-xl p-7 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-5">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-blue-700">
              {stats.plasticPrevented ?? stats.plasticSaved} kg
            </span>
            <h3 className="mt-3 font-semibold text-gray-900">Plastic Prevented</h3>
            <p className="text-sm text-gray-500 mt-1">Environmental impact</p>
          </div>

          {/* CO₂ Avoided */}
          <div className="bg-white rounded-xl p-7 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center mb-5">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-purple-700">{stats.co2Saved} kg</span>
            <h3 className="mt-3 font-semibold text-gray-900">CO₂ Avoided</h3>
            <p className="text-sm text-gray-500 mt-1">Carbon footprint reduction</p>
          </div>
        </div>

        {/* Monthly Achievements & Achievements */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          {/* Monthly Achievements */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-7">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-2xl font-semibold text-gray-900">Monthly Achievements</h2>
              <BarChart3 className="w-6 h-6 text-gray-400" />
            </div>

            <div className="space-y-5">
              {monthlyData.map((data) => (
                <div key={data.month} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{data.month}</span>
                    <span className="text-sm text-gray-600">{data.plastic} kg saved</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-700"
                      style={{ width: `${(data.plastic / 10) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{data.refills} refills</span>
                    <span>{data.returns} returns</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-7">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-2xl font-semibold text-gray-900">Achievements</h2>
              <Award className="w-6 h-6 text-gray-400" />
            </div>

            <div className="space-y-5">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-5 p-4 rounded-lg transition-colors duration-300 ${
                    achievement.earned
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${
                        achievement.earned ? 'text-green-900' : 'text-gray-500'
                      }`}
                    >
                      {achievement.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        achievement.earned ? 'text-green-700' : 'text-gray-500'
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-10 border border-green-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Eco Journey</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div>
                <div className="text-5xl font-extrabold text-green-600 mb-3">
                  {stats.plasticSaved} kg
                </div>
                <div className="text-gray-800 font-semibold mb-2">Plastic Saved</div>
                <div className="text-sm text-gray-600 max-w-xs mx-auto">
                  Equivalent to preventing {Math.round(stats.plasticSaved * 20)} single‑use bottles
                </div>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-blue-600 mb-3">{stats.co2Saved} kg</div>
                <div className="text-gray-800 font-semibold mb-2">Carbon Emissions Reduced</div>
                <div className="text-sm text-gray-600 max-w-xs mx-auto">
                  Same as avoiding a {Math.round(stats.co2Saved * 2.3)} km car trip
                </div>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-purple-600 mb-3">
                  {(stats.plasticSaved * 1000).toFixed(0)} L
                </div>
                <div className="text-gray-800 font-semibold mb-2">Water Conserved</div>
                <div className="text-sm text-gray-600 max-w-xs mx-auto">
                  Thanks to less plastic manufacturing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
