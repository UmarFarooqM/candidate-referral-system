// import React from 'react';

// const CandidateCard = ({ candidate, onStatusChange, onDelete }) => {
//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'Pending': return 'badge-pending';
//       case 'Reviewed': return 'badge-reviewed';
//       case 'Hired': return 'badge-hired';
//       default: return 'badge-pending';
//     }
//   };

//   return (
//     <div className="card overflow-hidden group">
//       <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
//         <div className="flex justify-between items-start">
//           <div className="flex-1">
//             <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
//               {candidate.name}
//             </h3>
//             <span className={getStatusClass(candidate.status)}>
//               {candidate.status}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="p-6">
//         <div className="space-y-4">
//           <div className="flex items-center gap-3 text-gray-600">
//             <span className="text-xl">📧</span>
//             <span className="text-sm break-all">{candidate.email}</span>
//           </div>
//           <div className="flex items-center gap-3 text-gray-600">
//             <span className="text-xl">📞</span>
//             <span className="text-sm">{candidate.phone}</span>
//           </div>
//           <div className="flex items-center gap-3 text-gray-600">
//             <span className="text-xl">💼</span>
//             <span className="text-sm font-medium">{candidate.jobTitle}</span>
//           </div>
//           {candidate.resumeUrl && (
//             <div className="flex items-center gap-3">
//               <span className="text-xl">📄</span>
//               <a
//                 href={`http://localhost:5000${candidate.resumeUrl}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
//               >
//                 View Resume
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-500">Status:</span>
//           <select
//             value={candidate.status}
//             onChange={(e) => onStatusChange(candidate._id, e.target.value)}
//             className="form-input py-1.5 px-3 text-sm w-32"
//           >
//             <option value="Pending">Pending</option>
//             <option value="Reviewed">Reviewed</option>
//             <option value="Hired">Hired</option>
//           </select>
//         </div>
//         <button
//           onClick={() => onDelete(candidate._id)}
//           className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
//           title="Delete candidate"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CandidateCard;


import React from 'react';

const CandidateCard = ({ candidate, onStatusChange, onDelete }) => {
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Reviewed: 'bg-purple-100 text-purple-800',
    Hired: 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[candidate.status]}`}>
            {candidate.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <span className="w-5">📧</span>
            <span className="ml-2 truncate">{candidate.email}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-5">📞</span>
            <span className="ml-2">{candidate.phone}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-5">💼</span>
            <span className="ml-2">{candidate.jobTitle}</span>
          </div>
          {candidate.resumeUrl && (
            <div className="flex items-center">
              <span className="w-5">📄</span>
              <a
                href={`http://localhost:5000${candidate.resumeUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-indigo-600 hover:text-indigo-800 text-sm"
              >
                View Resume
              </a>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <select
            value={candidate.status}
            onChange={(e) => onStatusChange(candidate._id, e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Hired">Hired</option>
          </select>
          <button
            onClick={() => onDelete(candidate._id)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1.5"
            title="Delete candidate"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;