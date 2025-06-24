import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from 'recharts';

const COLORS = ['#b4fff3', '#a394f7'];

const PieChartComponent: React.FC = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { name: 'Men', value: 2480 },
        { name: 'Women', value: 2380 },
      ]);
    }, 300);
  }, []);

  const renderCustomLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    percent = 0,
    index = 0,
  }: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;
const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);


    const label = data[index];
    if (!label) return null;

    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: '14px', fontWeight: '500' }}
      >
        {label.name}
        <tspan x={x} dy={18} style={{ fontSize: '12px', fontWeight: 'normal' }}>
          {label.value}
        </tspan>
        <tspan x={x} dy={16} style={{ fontSize: '12px', fontWeight: 'normal' }}>
          {(percent * 100).toFixed(2)}%
        </tspan>
      </text>
    );
  };

  return (
    <div className="flex flex-col md:flex-row justify-between bg-white rounded-xl p-4 shadow-sm">
      {/* Pie chart */}
      <div className="w-full md:w-1/2 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={100}
              labelLine={false}
              label={renderCustomLabel}
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Box */}
      <div className="w-full md:w-[280px] mt-6 md:mt-0 md:ml-4 text-sm">
        <p>
          <span className="font-semibold">Female workforce</span> has grown by{' '}
          <span className="font-bold">18%</span> in the past 6 months.
        </p>
        <p className="mt-2">
          Male employee count remained steady, with a marginal growth of{' '}
          <span className="font-bold">2.5%</span> over the last quarter.
        </p>
      </div>
    </div>
  );
};

export default PieChartComponent;
