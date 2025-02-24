"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import React from "react";

const AreaMetrics = () => {
  const data = [
    { name: "Omar", value: 10 },
    { name: "Ali", value: 20 },
    { name: "Sara", value: 15 },
    { name: "John", value: 25 },
  ];

  return (
"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import React from "react";

const Component = () => {
  const data = [
    { name: "Omar", value: 10 },
    { name: "Ali", value: 20 },
    { name: "Sara", value: 15 },
    { name: "John", value: 25 },
  ];

  return (
    <div className="flex">
      <div className="flex-grow w-2/3"> {/* Takes left space */}
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="w-1/3 bg-gray-200 p-4"> {/* Right section (optional) */}
        Other content here
      </div>
    </div>
  );
};

export default Component;


export default AreaMetrics;
