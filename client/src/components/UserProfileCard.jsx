import React from 'react';

export default function UserProfileCard({ user, onEdit }) {
  if (!user) return null;

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-24 px-6 pt-6 flex justify-end">
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg backdrop-blur-sm transition border border-white/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit Profile
        </button>
      </div>

      <div className="px-6 pb-6 pt-0 relative">
        <div className="-mt-12 mb-4 flex items-end justify-between">
          <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-md border border-slate-100 flex items-center justify-center">
            <div className="w-full h-full rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl tracking-wider">
              {getInitials(user.name)}
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active Account
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900" data-testid="profile-name">
            {user.name}
          </h3>
          <p className="text-xs font-medium text-blue-600 mt-0.5" data-testid="profile-role">
            {user.role}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div>
            <span className="block text-slate-400 font-medium">Email Address</span>
            <span className="text-slate-800 font-semibold mt-0.5 block truncate" data-testid="profile-email">
              {user.email}
            </span>
          </div>
          <div>
            <span className="block text-slate-400 font-medium">Department</span>
            <span className="text-slate-800 font-semibold mt-0.5 block truncate" data-testid="profile-dept">
              {user.department}
            </span>
          </div>
          <div>
            <span className="block text-slate-400 font-medium">Phone Number</span>
            <span className="text-slate-800 font-semibold mt-0.5 block" data-testid="profile-phone">
              {user.phone || 'Not provided'}
            </span>
          </div>
          <div>
            <span className="block text-slate-400 font-medium">Assigned Policies</span>
            <span className="text-slate-800 font-semibold mt-0.5 block" data-testid="profile-policies-count">
              {user.activePoliciesCount ?? 0} Policies
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

