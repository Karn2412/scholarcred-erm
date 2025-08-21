import React, { useEffect, useState } from 'react';

interface Props {
  title: string;
  value: string;
  change: string;
  color: string;
}

const OverviewCard: React.FC<Props> = ({ title, value, change, color }) => {
   const [, setData] = useState({
    totalEmployees: 0,
    newJoinees: 0,
    exits: 0,
    attritionRate: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      const total = 4820;
      const newJ = 482;
      const exit = 32;
      const attrition = ((exit / total) * 100).toFixed(2);

      setData({
        totalEmployees: total,
        newJoinees: newJ,
        exits: exit,
        attritionRate: parseFloat(attrition),
      });
    }, 300);
  }, []);

  return (
    <div className={`p-4 rounded shadow-sm ${color}`}>
      <p className="text-sm text-gray-600">{title}</p>
      <div className="text-xl font-bold">{value}</div>
      <p className="text-sm text-green-600">{change}</p>
    </div>
  );
};

export default OverviewCard;
