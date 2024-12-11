"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartProps {
  data: any[];
}

const Chart = ({ data }: ChartProps) => {
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
          <XAxis dataKey="name" axisLine={{ strokeDasharray: "3 3", stroke: "#ccc" }} />
          <YAxis
            domain={[0, 'dataMax + 50000']} // Ensuring the Y-axis dynamically scales
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

export default Chart;
