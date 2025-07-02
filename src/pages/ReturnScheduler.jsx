import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function ReturnScheduler() {
  const [packId, setPackId] = useState("");
  const [date, setDate] = useState(new Date());
  const [points, setPoints] = useState(0);

  const handleReturn = () => {
    if (packId) {
      const bonus = date.getDay() === 0 ? 5 : 0;
      setPoints(points + 10 + bonus);
      alert(`You earned ${10 + bonus} LoopPoints!`);
      setPackId("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Return Packaging</h2>
      <input
        type="text"
        value={packId}
        onChange={(e) => setPackId(e.target.value)}
        placeholder="Enter Packaging Code"
        className="border p-2 mr-2"
      />
      <button onClick={handleReturn} className="bg-green-600 text-white px-3 py-1 rounded">
        Return Now
      </button>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Schedule Group Pickup</h3>
        <Calendar onChange={setDate} value={date} />
        <p className="mt-2">Selected Date: {date.toDateString()}</p>
      </div>
    </div>
  );
}

export default ReturnScheduler;
