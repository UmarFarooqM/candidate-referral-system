

import React from 'react';

const StatsCard = ({ stats }) => {
  const items = [
    { label: 'Total', value: stats.total, bg: 'bg-blue-100', text: 'text-blue-600', icon: '👥' },
    { label: 'Pending', value: stats.pending, bg: 'bg-yellow-100', text: 'text-yellow-600', icon: '⏳' },
    { label: 'Reviewed', value: stats.reviewed, bg: 'bg-purple-100', text: 'text-purple-600', icon: '📋' },
    { label: 'Hired', value: stats.hired, bg: 'bg-green-100', text: 'text-green-600', icon: '✅' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
              <p className={`text-2xl font-bold mt-1 ${item.text}`}>{item.value}</p>
            </div>
            <div className={`${item.bg} w-10 h-10 rounded-lg flex items-center justify-center text-lg`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;