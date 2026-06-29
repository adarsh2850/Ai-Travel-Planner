import React from 'react';
import { motion } from 'framer-motion';

export default function Dashboard({ onTabChange, user, activeItinerary }) {
  const userName = user?.name || 'Explorer';

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-teal-500 rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute right-0 top-0 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-200">
            Welcome back
          </span>
          <h2 className="text-3xl font-black font-display mt-1">
            Hello, {userName}!
          </h2>
          <p className="text-sm text-indigo-100 mt-2 leading-relaxed font-sans">
            Ready to explore? Check your upcoming bookings, monitor trip budgets, and let our AI curation construct your dream itineraries.
          </p>
          <div className="flex gap-3 mt-6 flex-wrap">
            <button
              onClick={() => onTabChange('Planner')}
              className="bg-white hover:bg-slate-50 text-indigo-600 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm font-bold">auto_awesome</span>
              Start AI Planner
            </button>
            <button
              onClick={() => onTabChange('Explore')}
              className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">explore</span>
              Explore Trends
            </button>
          </div>
        </div>
      </div>

      {/* Grid segments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Current Trip Overview */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-md font-bold text-slate-900 dark:text-white font-display mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">luggage</span>
              Active Itinerary
            </h3>

            {activeItinerary ? (
              <div className="space-y-3">
                <div className="h-32 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={activeItinerary.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80'}
                    alt={activeItinerary.destination}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white font-display truncate">
                    {activeItinerary.destination}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {activeItinerary.duration} Days · {activeItinerary.vibe} budget
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-1.5 opacity-50">map</span>
                <p className="text-xs">No active trip itinerary generated.</p>
              </div>
            )}
          </div>

          <button
            onClick={() => onTabChange('My Trips')}
            className="w-full bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-700 dark:text-slate-250 py-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border border-slate-100 dark:border-slate-700/60"
          >
            Manage Trips
          </button>
        </div>

        {/* Quick Action Grid */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">grid_view</span>
            Quick Utilities
          </h3>
          <div className="grid grid-cols-2 gap-3 text-center">
            {[
              { id: 'Saved', label: 'Wishlist', icon: 'bookmark', color: 'bg-rose-50 text-rose-500 dark:bg-rose-950/20' },
              { id: 'Budget Planner', label: 'Budget', icon: 'payments', color: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950/20' },
              { id: 'Calendar', label: 'Calendar', icon: 'calendar_today', color: 'bg-blue-50 text-blue-500 dark:bg-blue-950/20' },
              { id: 'Documents', label: 'Vault', icon: 'cloud_done', color: 'bg-teal-50 text-teal-500 dark:bg-teal-950/20' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="p-3 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                  <span className="material-symbols-outlined text-base">{item.icon}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-950 dark:text-slate-300">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rewards and Points status */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-md font-bold text-slate-900 dark:text-white font-display mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">workspace_premium</span>
              Rewards Point Club
            </h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold block">Lumina Gold Balance</span>
                <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-display">1,450</span>
              </div>
              <span className="material-symbols-outlined text-yellow-500 text-3xl font-light">stars</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 font-sans leading-relaxed">
              Earn points for bookings and reviews. Redeem codes for hotel and flight coupons!
            </p>
          </div>

          <button
            onClick={() => onTabChange('Rewards & Loyalty')}
            className="w-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 py-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
          >
            Redeem Rewards
          </button>
        </div>
      </div>
    </div>
  );
}
