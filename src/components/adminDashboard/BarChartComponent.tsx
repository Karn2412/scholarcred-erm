import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from 'recharts';

const data = [
  { age: '20-25', value: 45 },
  { age: '25-30', value: 23 },
  { age: '30-35', value: 15 },
  { age: '35-40', value: 10 },
  { age: '40-45', value: 4 },
  { age: '45-50', value: 3 },
];

const BAR_COLOR = '#94e1db';

const BarChartComponent = () => {
  return (
    
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 20, bottom: 30 }}
        >
          {/* Age on X axis */}
          <XAxis
            dataKey="age"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14 }}
          />
          <YAxis hide domain={[0, 100]} />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Bar
            dataKey="value"
            fill={BAR_COLOR}
            radius={[10, 10, 0, 0]}
            barSize={30}
          >
            <LabelList
              dataKey="value"
              position="top"
              formatter={(value: number) =>
                `${value.toString().padStart(2, '0')}%`
              }
              style={{
                fill: '#1a1a1a',
                fontWeight: 600,
                fontSize: 12,
              }}
            />
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={BAR_COLOR} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    
  );
};

export default BarChartComponent;
