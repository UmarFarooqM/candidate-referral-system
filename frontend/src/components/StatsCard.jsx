// import React from 'react';

// const StatsCard = ({ stats }) => {
//   const statItems = [
//     { label: 'Total Candidates', value: stats.total, color: 'from-blue-500 to-blue-600', icon: '👥', bgColor: 'bg-blue-50' },
//     { label: 'Pending', value: stats.pending, color: 'from-yellow-500 to-yellow-600', icon: '⏳', bgColor: 'bg-yellow-50' },
//     { label: 'Reviewed', value: stats.reviewed, color: 'from-purple-500 to-purple-600', icon: '📋', bgColor: 'bg-purple-50' },
//     { label: 'Hired', value: stats.hired, color: 'from-green-500 to-green-600', icon: '✅', bgColor: 'bg-green-50' }
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//       {statItems.map((item, index) => (
//         <div key={index} className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm font-medium mb-1">{item.label}</p>
//               <p className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
//                 {item.value}
//               </p>
//             </div>
//             <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center text-3xl`}>
//               {item.icon}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsCard;

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