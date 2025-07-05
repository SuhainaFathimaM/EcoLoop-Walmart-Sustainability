import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const EmissionChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const reduction = ((2.5 - payload[0].value) / 2.5 * 100).toFixed(1);
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label} Packaging</p>
          <p className="text-green-600">
            <span className="text-2xl font-bold">{payload[0].value}kg</span> CO₂
          </p>
          {payload[0].value < 2.5 && (
            <p className="text-sm text-gray-600 mt-1">
              🎉 That's {reduction}% lower than the standard option!
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Compare Your Packaging Footprint 🌍
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        See how different delivery choices stack up in terms of CO₂ emissions.
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{ value: 'CO₂ (kg)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="emissions" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.selected ? '#16A34A' : '#D1D5DB'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-5 flex items-center justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <span>Your Selection</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-300 rounded"></div>
          <span>Other Options</span>
        </div>
      </div>
    </div>
  );
};

export default EmissionChart;
