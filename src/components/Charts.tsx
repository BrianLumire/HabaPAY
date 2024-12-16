"use client";
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartProps {
  data: any[];
}

const Charts = ({ data }: ChartProps) => {
  // Start with a default value to avoid SSR issues
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    // Set the initial width on mount
    setScreenWidth(window.innerWidth);

    // Update the screen width on window resize
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Dynamically adjust font size based on screen width
  const getFontSize = () => {
    if (screenWidth >= 1024) {
      return "14px"; // Larger font for desktop screens
    } else if (screenWidth >= 768) {
      return "14px"; // Medium font for tablet screens
    } else {
      return "10px"; // Smaller font for mobile screens
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Responsive Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 50,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            axisLine={{ strokeDasharray: "3 3", stroke: "#ccc" }}
            style={{ fontSize: getFontSize() }} // Adjust font size dynamically based on screen width
          />
          <YAxis
            domain={[0, "dataMax + 50000"]} // Ensuring the Y-axis dynamically scales
            ticks={[0, 100000, 200000, 300000, 400000, 500000]}
            axisLine={{ strokeDasharray: "3 3", stroke: "#ccc" }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="Transactions" stroke="#FDAC15" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
