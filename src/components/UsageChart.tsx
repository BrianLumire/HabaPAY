"use client";
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface UsageChartProps {
  data: { day: string; usage: number }[]; // Explicitly type the data structure
}

const UsageChart = ({ data }: UsageChartProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getFontSize = () => {
    if (screenWidth >= 1024) {
      return "14px";
    } else if (screenWidth >= 768) {
      return "14px";
    } else {
      return "10px";
    }
  };

  return (
    <div className="flex flex-col items-center">
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
            dataKey="day"
            axisLine={{ strokeDasharray: "3 3", stroke: "#ccc" }}
            style={{ fontSize: getFontSize() }}
          />
          <YAxis
            domain={[0, "dataMax + 50"]}
            ticks={[0, 100, 200, 300, 400, 500]}
            axisLine={{ strokeDasharray: "3 3", stroke: "#ccc" }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="usage" stroke="#FDAC15" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageChart;
