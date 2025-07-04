import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaUser, FaTrophy, FaCog } from "react-icons/fa";

const Profile = () => {
  const { userStats } = useContext(UserContext);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-green-800">
        👤 My Profile
      </h2>

      {/* Basic Info */}
      <div className="bg-gray-50 p-4 rounded-xl mb-6 shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          <FaUser className="inline mr-2" />
          User Info
        </h3>
        <p>
          <strong>Name:</strong> Suhaina 
        </p>
        <p>
          <strong>Email:</strong> suhaina@gmail.com
        </p>
        <p>
          <strong>Location:</strong> Tamil Nadu, India
        </p>
      </div>

      {/* Preferences */}
      <div className="bg-gray-50 p-4 rounded-xl mb-6 shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          <FaCog className="inline mr-2" />
          Preferences
        </h3>
        <p>
          <strong>Preferred Delivery Mode:</strong> Grouped
        </p>
        <p>
          <strong>Preferred Refill Product:</strong> Dish Soap
        </p>
      </div>

      {/* Achievements */}
      <div className="bg-gray-50 p-4 rounded-xl mb-6 shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          <FaTrophy className="inline mr-2" />
          Achievements
        </h3>
        <ul className="space-y-2">
          {userStats.badges.map((badge, idx) => (
            <li
              key={idx}
              className={`p-2 rounded ${
                badge.unlocked ? "bg-green-200" : "bg-gray-100"
              }`}
            >
              {badge.name} {badge.unlocked ? "✅" : "❌"}
            </li>
          ))}
        </ul>
      </div>

      {/* Leaderboard */}
      <div className="bg-gray-50 p-4 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          🏆 Leaderboard (Mock)
        </h3>
        <ol className="list-decimal list-inside space-y-1 text-gray-700">
          <li>Suhaina – 85 pts 🏅</li>
          <li>Arjun – 72 pts</li>
          <li>Aisha – 68 pts</li>
        </ol>
      </div>
    </div>
  );
};

export default Profile;
