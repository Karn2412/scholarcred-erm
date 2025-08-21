import React from 'react'
import { PieChart, Pie, Cell, Label } from 'recharts'

interface Props {
  present: number
  absent: number
}

const COLORS = ['#b2fff7', '#fdaaaa']

const AttendanceChartCard: React.FC<Props> = ({ present, absent }) => {
  const data = [
    { name: 'Present', value: present },
    { name: 'Absent', value: absent },
  ]

  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-lg ">
      <h3 className="text-lg font-medium mb-4 text-gray-800">
        Attendance Distribution
      </h3>

      <div className="flex items-center">
        <PieChart width={270} height={180}>
          <Pie 
            data={data}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            innerRadius={40}
            outerRadius={120}
            paddingAngle={4}
            cornerRadius={8}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}

            <Label
              position="center"
              content={({ cx, cy,  }) => {
  if (cx == null || cy == null) return null;
  return (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      <tspan x={cx} dy="-0.5em" fontSize="16" fontWeight="600" fill="#111">
        {(present * 100).toFixed(0)}%
      </tspan>
    </text>
  );
}}

            />
          </Pie>
        </PieChart>

        <div className="ml-6 text-gray-700 text-sm space-y-2">
          <p>
            You’ve maintained an <strong>{present.toFixed(0)}%</strong> attendance rate this month — great consistency!
          </p>
          <p>
            <strong>{Math.round((absent / 100) * 30)}</strong> days absent this month.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AttendanceChartCard

