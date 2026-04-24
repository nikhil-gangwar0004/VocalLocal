import React from 'react';

const ProfessionalDashboard = ({ user }) => {
  return (
    <div className="p-8 text-white min-h-screen">
      <div className="flex justify-between items-center bg-slate-800 p-6 rounded-2xl border-l-4 border-yellow-500">
        <div>
          <h1 className="text-3xl font-black italic">EXPERT CONSOLE: {user.name}</h1>
          <p className="text-slate-400">Category: <span className="text-yellow-400">{user.proDetails?.category || 'Expert'}</span></p>
        </div>
        <div className="text-right text-green-400 font-bold">Verified ✅</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-slate-900 p-6 rounded-2xl border border-white/5">
          <h2 className="text-xl font-bold mb-4">Nayi Bookings</h2>
          <div className="p-4 bg-slate-800 rounded-xl border border-dashed border-white/10 text-center text-slate-500">
            Filhaal koi booking nahi mili hai. Jaise hi kaam milega, yahan dikhega!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;