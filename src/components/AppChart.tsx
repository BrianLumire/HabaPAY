"use client";
import React from 'react';
import Image from 'next/image';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Define types for metric prop
interface AppChartProps {
  selectedMetric: 'All' | 'NewUsers' | 'NationalReach';
  data: any[];
}

const AppChart = ({ selectedMetric, data }: AppChartProps) => {
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
            axisLine={{ strokeDasharray: '3 3', stroke: '#ccc' }}
          />
          {/* Left Y-axis for NewUsers */}
          {selectedMetric !== 'NationalReach' && (
            <YAxis
              domain={[0, 500]}
              ticks={[0, 100, 200, 300, 400, 500]}
              axisLine={{ strokeDasharray: '3 3', stroke: '#ccc' }}
              label={{
                value: 'New Users',
                angle: -90,
                position: 'insideLeft',
                dy: -5,
              }}
            />
          )}
          {/* Right Y-axis for NationalReach */}
          {selectedMetric !== 'NewUsers' && (
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 50]}
              ticks={[0, 10, 20, 30, 40, 50]}
              axisLine={{ strokeDasharray: '3 3', stroke: '#ccc' }}
              label={{
                value: 'National Reach',
                angle: 90,
                position: 'insideRight',
                dy: -5,
              }}
            />
          )}
          <Tooltip />
          {/* Conditionally render New Users Line */}
          {selectedMetric === 'All' || selectedMetric === 'NewUsers' ? (
            <Line
              type="monotone"
              dataKey="NewUsers"
              stroke="#FDAC15"
              activeDot={{ r: 8 }}
            />
          ) : null}
          {/* Conditionally render National Reach Line */}
          {selectedMetric === 'All' || selectedMetric === 'NationalReach' ? (
            <Line
              type="monotone"
              dataKey="NationalReach"
              stroke="black"
              yAxisId="right"
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>

      {/* Legend Section */}
      <p className="text-sm font-bold">LEGEND</p>
      <div className="flex gap-4">
        {selectedMetric !== 'NationalReach' && (
          <div className="flex items-center gap-2">
            <Image src="/yellow.svg" alt="" width={14} height={14} />
            <span className="text-[#FDAC15] text-sm">New Users</span>
          </div>
        )}
        {selectedMetric !== 'NewUsers' && (
          <div className="flex items-center gap-2">
            <Image src="/black.svg" alt="" width={14} height={14} />
            <span className="text-sm">National Reach</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppChart;
