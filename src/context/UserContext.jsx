import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userStats, setUserStats] = useState({
    plasticSaved: 1.5,
    co2Saved: 3.9,
    loopPoints: 85,
    badges: [
      { name: "Refill Rookie", unlocked: true },
      { name: "Tote Champ", unlocked: false },
      { name: "Loop Legend", unlocked: false },
    ],
  });

  return (
    <UserContext.Provider value={{ userStats, setUserStats }}>
      {children}
    </UserContext.Provider>
  );
};
