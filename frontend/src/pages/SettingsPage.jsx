import React, { useState } from 'react';

export default function SettingsPage({ isDark, onToggleDark }) {
  const [lang, setLang] = useState('English (US)');
  const [notify, setNotify] = useState({ flights: true, weather: true, aiTips: false, promo: true });
  const [privacy, setPrivacy] = useState({ gpsShare: true, profilePublic: false });

  const handleDeleteAccount = () => {
    const confirmation = window.confirm(
      "WARNING: Are you sure you want to delete your sarthiAi account? This will permanently wipe all your saved trips, reviews, rewards, and journal logs. This action CANNOT be undone."
    );
    if (confirmation) {
      alert("Account deletion request submitted. Logging you out.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Account Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Adjust preferences, manage system notifications, linked accounts, and privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar-Stub */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-2 h-fit">
          <button className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 transition-all flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-base">settings</span>
            Preferences & Theme
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-base">notifications</span>
            Notifications Settings
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-base">shield</span>
            Privacy & Safety
          </button>
        </div>

        {/* Configurations Area */}
        <div className="md:col-span-2 space-y-6">
          {/* General Preferences */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display border-b border-slate-100 dark:border-slate-700/60 pb-3">
              General Preferences
            </h3>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Dark Color Mode</h4>
                <p className="text-xs text-slate-400 mt-0.5">Toggle app themes between dark slate and clean white surfaces.</p>
              </div>
              <button
                onClick={onToggleDark}
                className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">System Language</h4>
                <p className="text-xs text-slate-400 mt-0.5">Choose translation options for menus and guides.</p>
              </div>
              <select
                value={lang}
                onChange={e => setLang(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
              >
                <option value="English (US)">English (US)</option>
                <option value="Hindi (India)">Hindi (India)</option>
                <option value="Spanish (Spain)">Spanish (Spain)</option>
              </select>
            </div>
          </div>

          {/* Notifications config */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display border-b border-slate-100 dark:border-slate-700/60 pb-3">
              Notification Preferences
            </h3>

            {[
              { key: 'flights', title: 'Flight Delay & Gate Updates', desc: 'Alerts for boarding passes, terminal changes, and gate delays.' },
              { key: 'weather', title: 'Weather warnings & Alerts', desc: 'Realtime weather forecast changes for your destination.' },
              { key: 'aiTips', title: 'AI Recommendation Logs', desc: 'Daily smart hacks and dining tips close to check-in stays.' },
              { key: 'promo', title: 'Seasonal deals & flash sales', desc: 'Alerts when hotels or flights on wishlist drop in price.' },
            ].map(item => (
              <div key={item.key} className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notify[item.key]}
                  onChange={e => setNotify({ ...notify, [item.key]: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-slate-200 dark:border-slate-700 rounded focus:ring-indigo-500 cursor-pointer mt-1"
                />
              </div>
            ))}
          </div>

          {/* Connected Accounts */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display border-b border-slate-100 dark:border-slate-700/60 pb-3">
              Connected Social Accounts
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl">
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-red-500 text-xl font-bold">google</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Google Cloud Sign-In</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 px-3 py-1 rounded-full font-bold">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl opacity-60">
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-blue-500 text-xl font-bold">facebook</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Facebook Account</span>
                </div>
                <button className="text-[10px] bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-bold cursor-pointer">
                  Link Account
                </button>
              </div>
            </div>
          </div>

          {/* Hazard Area */}
          <div className="bg-red-50/40 dark:bg-red-950/10 border border-red-200/50 dark:border-red-950/40 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-red-600 dark:text-red-400 font-display uppercase tracking-wide">
              Danger Zone
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Permanently Delete Account</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Wipe all saved destinations, booking history, and journals. Irreversible.</p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-red-200/20 cursor-pointer"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
