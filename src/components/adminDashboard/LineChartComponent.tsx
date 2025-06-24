import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const LineChartComponent = () => {
  const [data, setData] = useState<{ month: string; payroll: number }[]>([]);


  useEffect(() => {
    setTimeout(() => {
      setData([
        { month: 'Dec', payroll: 120000 },
        { month: 'Jan', payroll: 110000 },
        { month: 'Feb', payroll: 150000 },
        { month: 'Mar', payroll: 115000 },
        { month: 'Apr', payroll: 108000 },
        { month: 'May', payroll: 102000 },
        { month: 'Jun', payroll: 130000 },
        { month: 'Jul', payroll: 140000 },
        { month: 'Aug', payroll: 155000 },
        { month: 'Sep', payroll: 170000 },
        { month: 'Oct', payroll: 150000 },
        { month: 'Nov', payroll: 125000 },
      ]);
    }, 300);
  }, []);

  return (
    <div className="bg-gray-100 p-4 w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00bcd4" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#00bcd4" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#888" strokeDasharray="4 4" vertical={false} />

          <XAxis dataKey="month" />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13 }}
          />

          <Tooltip />

          <Area
            type="linear"
            dataKey="payroll"
            stroke="#003366"
            fillOpacity={0.5}
            fill="url(#colorPayroll)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
