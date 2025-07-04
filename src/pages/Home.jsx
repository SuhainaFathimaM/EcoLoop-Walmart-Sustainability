import React from "react";
import { motion } from "framer-motion";
import HeroImage from "../assets/hero-ecoloop.png"; // Add an image file in assets folder

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white text-gray-800 font-sans">
      {/* 🌿 Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-10 pt-16 max-w-7xl mx-auto">
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold text-green-800 leading-tight drop-shadow-md">
            One Loop, Zero Waste
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Join the EcoLoop and make your shopping habits more sustainable.
            Refill. Return. Reduce.
          </p>
          <div className="mt-6 flex gap-4 justify-center md:justify-start">
            <button className="bg-green-700 text-white px-6 py-3 rounded-full shadow hover:bg-green-800 transition-all">
              Find Refill Station
            </button>
            <button className="bg-white border border-green-600 text-green-700 px-6 py-3 rounded-full hover:bg-green-100 transition-all">
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center mb-10 md:mb-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={HeroImage}
            alt="EcoLoop Hero"
            className="w-4/5 md:w-full max-w-md drop-shadow-xl"
          />
        </motion.div>
      </section>

      {/* 💡 Feature Icons */}
      <section className="py-16 bg-lime-50 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "♻️ Refill & Reuse",
              desc: "Bring back your empty containers and refill essentials at Walmart refill stations.",
            },
            {
              title: "🎯 CO₂ Emission Tracker",
              desc: "Track your reduced emissions by switching to green delivery and packaging.",
            },
            {
              title: "🎁 Earn LoopPoints",
              desc: "Get rewarded every time you reuse, return, or choose sustainable delivery.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📊 Impact Stats */}
      <section className="py-14 bg-gradient-to-br from-green-100 to-white text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6">
          🌱 Together We've Saved
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-10 text-lg">
          <div className="bg-white px-6 py-4 rounded shadow">
            <strong className="text-2xl text-green-700">132 kg</strong>
            <p className="text-gray-600">Plastic Saved</p>
          </div>
          <div className="bg-white px-6 py-4 rounded shadow">
            <strong className="text-2xl text-green-700">420 kg</strong>
            <p className="text-gray-600">CO₂ Emissions Avoided</p>
          </div>
          <div className="bg-white px-6 py-4 rounded shadow">
            <strong className="text-2xl text-green-700">6,800</strong>
            <p className="text-gray-600">LoopPoints Earned</p>
          </div>
        </div>
      </section>

      {/* 🌟 Achievements Section */}
      <section className="py-16 bg-lime-50 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-8">
          🎖️ Eco Achievements
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {["Refill Rookie", "Tote Champ", "Loop Legend"].map((badge) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              key={badge}
              className="bg-white px-6 py-4 rounded-lg shadow text-green-800 font-semibold"
            >
              🏅 {badge}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
