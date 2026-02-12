import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ReferralForm from './pages/ReferralForm';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Candidate Referral System
          </h1>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'dashboard'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('referral')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'referral'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              New Referral
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' ? <Dashboard /> : <ReferralForm />}
      </main>
    </div>
  );
}

export default App;