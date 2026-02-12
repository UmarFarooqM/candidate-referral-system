

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