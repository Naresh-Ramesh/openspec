import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import UserProfileCard from '../components/UserProfileCard.jsx';
import ProfileEditForm from '../components/ProfileEditForm.jsx';

const SAMPLE_POLICIES = [
  { id: 'POL-89021', insured: 'Apex Logistics LLC', type: 'Commercial Auto Fleet', premium: '$34,200', status: 'Active' },
  { id: 'POL-77312', insured: 'BioHealth Tech Inc', type: 'General Liability & E&O', premium: '$58,000', status: 'Active' },
  { id: 'POL-90412', insured: 'Crestline Properties', type: 'Commercial Property', premium: '$126,500', status: 'Under Review' },
  { id: 'POL-65104', insured: 'Summit Retail Group', type: 'Workers Compensation', premium: '$29,800', status: 'Active' },
];

export default function Dashboard() {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState('');

  const handleSaveProfile = (updatedFields) => {
    const result = updateProfile(updatedFields);
    if (result.success) {
      setIsEditing(false);
      setNotification('Profile details updated successfully.');
      setTimeout(() => setNotification(''), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-none">
                Policy Management
              </h1>
              <span className="text-xs text-slate-500 font-medium">Enterprise Underwriter Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Banner notification */}
        {notification && (
          <div
            className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800 flex items-center justify-between"
            role="status"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{notification}</span>
            </div>
            <button
              onClick={() => setNotification('')}
              className="text-emerald-600 hover:text-emerald-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dashboard Title & Overview Header */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Overview & Underwriter Profile
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage your policy portfolio metrics and keep your user credentials up to date.
          </p>
        </div>

        {/* Metrics Grid */}
        <section aria-label="Portfolio metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500 block">Total Active Policies</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">{user?.activePoliciesCount ?? 14}</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+2 this month</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500 block">Total Premium Volume</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">$248,500</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">USD</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500 block">Pending Claims</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">3</span>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Under review</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500 block">Renewal Rate</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">96.4%</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">High</span>
            </div>
          </div>
        </section>

        {/* Two-Column Section: User Profile Management & Policies List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* User Profile Card or Edit Form */}
          <div className="lg:col-span-1">
            {isEditing ? (
              <ProfileEditForm
                user={user}
                onSave={handleSaveProfile}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <UserProfileCard
                user={user}
                onEdit={() => setIsEditing(true)}
              />
            )}
          </div>

          {/* Policy Portfolio Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Assigned Policies</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Commercial policies currently assigned to your portfolio
                </p>
              </div>
              <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-100">
                4 Active Records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-2.5 pr-3">Policy ID</th>
                    <th className="py-2.5 px-3">Insured Name</th>
                    <th className="py-2.5 px-3">Line of Coverage</th>
                    <th className="py-2.5 px-3">Premium</th>
                    <th className="py-2.5 pl-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SAMPLE_POLICIES.map((policy) => (
                    <tr key={policy.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 pr-3 font-semibold text-blue-600">{policy.id}</td>
                      <td className="py-3 px-3 font-medium text-slate-900">{policy.insured}</td>
                      <td className="py-3 px-3 text-slate-600">{policy.type}</td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{policy.premium}</td>
                      <td className="py-3 pl-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-semibold ${policy.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                        >
                          {policy.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
