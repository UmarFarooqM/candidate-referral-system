// // import React, { useState, useEffect } from 'react';
// // import { candidateAPI } from '../services/api';
// // import CandidateCard from '../components/CandidateCard';
// // import SearchBar from '../components/SearchBar';
// // import StatsCard from '../components/StatsCard';
// // import LoadingSpinner from '../components/LoadingSpinner';

// // const Dashboard = () => {
// //   const [candidates, setCandidates] = useState([]);
// //   const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, hired: 0 });
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);
// //       const [candidatesRes, statsRes] = await Promise.all([
// //         candidateAPI.getCandidates(searchTerm),
// //         candidateAPI.getStats()
// //       ]);
      
// //       setCandidates(candidatesRes.data || []);
// //       setStats(statsRes.data || { total: 0, pending: 0, reviewed: 0, hired: 0 });
// //       setError(null);
// //     } catch (err) {
// //       setError('Failed to fetch data. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [searchTerm]);

// //   const handleStatusChange = async (id, newStatus) => {
// //     try {
// //       await candidateAPI.updateStatus(id, newStatus);
// //       fetchData();
// //     } catch (err) {
// //       setError('Failed to update status. Please try again.');
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this candidate?')) {
// //       try {
// //         await candidateAPI.deleteCandidate(id);
// //         fetchData();
// //       } catch (err) {
// //         setError('Failed to delete candidate. Please try again.');
// //       }
// //     }
// //   };

// //   if (loading && candidates.length === 0) {
// //     return <LoadingSpinner />;
// //   }

// //   return (
// //     <div className="space-y-8">
// //       <div className="bg-white rounded-2xl shadow-lg p-8">
// //         <h2 className="text-3xl font-bold text-gray-900 mb-2">
// //           Welcome to Your Dashboard 👋
// //         </h2>
// //         <p className="text-gray-600">
// //           Track and manage all your candidate referrals in one place.
// //         </p>
// //       </div>

// //       <StatsCard stats={stats} />

// //       <div className="bg-white rounded-2xl shadow-lg p-6">
// //         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
// //           <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
// //             <span className="text-2xl">📋</span>
// //             Candidate List
// //             <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
// //               {candidates.length} {candidates.length === 1 ? 'Candidate' : 'Candidates'}
// //             </span>
// //           </h3>
// //           <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
// //         </div>

// //         {error && (
// //           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //               </svg>
// //               <span className="text-red-700">{error}</span>
// //             </div>
// //             <button
// //               onClick={fetchData}
// //               className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
// //             >
// //               Retry
// //             </button>
// //           </div>
// //         )}

// //         {!loading && candidates.length === 0 ? (
// //           <div className="text-center py-16">
// //             <div className="text-6xl mb-4">🔍</div>
// //             <h3 className="text-xl font-semibold text-gray-900 mb-2">No candidates found</h3>
// //             <p className="text-gray-600 mb-6">
// //               {searchTerm ? 'Try adjusting your search term' : 'Start by referring a new candidate'}
// //             </p>
// //             {searchTerm && (
// //               <button
// //                 onClick={() => setSearchTerm('')}
// //                 className="btn-primary"
// //               >
// //                 Clear Search
// //               </button>
// //             )}
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {candidates.map(candidate => (
// //               <CandidateCard
// //                 key={candidate._id}
// //                 candidate={candidate}
// //                 onStatusChange={handleStatusChange}
// //                 onDelete={handleDelete}
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { candidateAPI } from '../services/api';
// import CandidateCard from '../components/CandidateCard';
// import StatsCard from '../components/StatsCard';

// const Dashboard = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, hired: 0 });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [candidatesRes, statsRes] = await Promise.all([
//         candidateAPI.getCandidates(searchTerm),
//         candidateAPI.getStats()
//       ]);
      
//       setCandidates(candidatesRes.data || []);
//       setStats(statsRes.data || { total: 0, pending: 0, reviewed: 0, hired: 0 });
//       setError(null);
//     } catch (err) {
//       setError('Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [searchTerm]);

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await candidateAPI.updateStatus(id, newStatus);
//       fetchData();
//     } catch (err) {
//       setError('Failed to update status');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Delete this candidate?')) {
//       try {
//         await candidateAPI.deleteCandidate(id);
//         fetchData();
//       } catch (err) {
//         setError('Failed to delete candidate');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Stats Section */}
//       <StatsCard stats={stats} />

//       {/* Candidates Section */}
//       <div className="bg-white rounded-lg shadow p-6">
//         {/* Header with Title and Search Bar - INLINE, no extra icons */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Candidate List ({candidates.length})
//           </h2>
          
//           {/* Search Bar - Clean, no icon inside */}
//           <div className="relative w-full sm:w-64">
//             <input
//               type="text"
//               placeholder="Search by job title or status..."
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm('')}
//                 className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex justify-between items-center">
//             <span className="text-sm">{error}</span>
//             <button 
//               onClick={fetchData}
//               className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         {/* Candidates Grid */}
//         <div className="mt-6">
//           {candidates.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500 text-sm">No candidates found</p>
//               {searchTerm && (
//                 <button
//                   onClick={() => setSearchTerm('')}
//                   className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
//                 >
//                   Clear search
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {candidates.map(candidate => (
//                 <CandidateCard
//                   key={candidate._id}
//                   candidate={candidate}
//                   onStatusChange={handleStatusChange}
//                   onDelete={handleDelete}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { candidateAPI } from '../services/api';
import CandidateCard from '../components/CandidateCard';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, hired: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ FIXED: useEffect with fetchData inside
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [candidatesRes, statsRes] = await Promise.all([
          candidateAPI.getCandidates(searchTerm),
          candidateAPI.getStats()
        ]);
        
        setCandidates(candidatesRes.data || []);
        setStats(statsRes.data || { total: 0, pending: 0, reviewed: 0, hired: 0 });
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]); // ✅ Only re-run when searchTerm changes

  const handleStatusChange = async (id, newStatus) => {
    try {
      await candidateAPI.updateStatus(id, newStatus);
      // Refresh data after status update
      const [candidatesRes, statsRes] = await Promise.all([
        candidateAPI.getCandidates(searchTerm),
        candidateAPI.getStats()
      ]);
      setCandidates(candidatesRes.data || []);
      setStats(statsRes.data || { total: 0, pending: 0, reviewed: 0, hired: 0 });
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this candidate?')) {
      try {
        await candidateAPI.deleteCandidate(id);
        // Refresh data after delete
        const [candidatesRes, statsRes] = await Promise.all([
          candidateAPI.getCandidates(searchTerm),
          candidateAPI.getStats()
        ]);
        setCandidates(candidatesRes.data || []);
        setStats(statsRes.data || { total: 0, pending: 0, reviewed: 0, hired: 0 });
      } catch (err) {
        setError('Failed to delete candidate');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <StatsCard stats={stats} />

      {/* Candidates Section */}
      <div className="bg-white rounded-lg shadow">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 sm:mb-0">
              Candidate List 
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({candidates.length} {candidates.length === 1 ? 'candidate' : 'candidates'})
              </span>
            </h2>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by job title or status..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex justify-between items-center">
            <span className="text-sm">{error}</span>
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        )}

        {/* Candidates Grid */}
        <div className="p-6">
          {candidates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No candidates found</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map(candidate => (
                <CandidateCard
                  key={candidate._id}
                  candidate={candidate}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;