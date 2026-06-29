import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_HOSPITALS = [
  { name: 'Munnar General Hospital', contact: '+91 4865 230 263', distance: '1.2 km away', type: 'Public Hospital' },
  { name: 'Tata Global Health Center', contact: '+91 4865 240 220', distance: '2.5 km away', type: 'Private Clinic' },
];

const EMERGENCY_NUMBERS = [
  { service: 'National Helpline', number: '112', icon: 'phone_in_talk' },
  { service: 'Police', number: '100', icon: 'local_shield' },
  { service: 'Ambulance / Fire', number: '102 / 101', icon: 'emergency' },
  { service: 'Tourist Hotline', number: '1363', icon: 'support_agent' },
];

export default function EmergencyAssistance() {
  const [sosActive, setSosActive] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);
  const [embassySearch, setEmbassySearch] = useState('');
  const [embassyDetails, setEmbassyDetails] = useState(null);

  const triggerSOS = () => {
    setSosActive(true);
    setShareLocation(true);
  };

  const cancelSOS = () => {
    setSosActive(false);
    alert('SOS alert has been cancelled.');
  };

  const handleEmbassySearch = (e) => {
    e.preventDefault();
    if (!embassySearch) return;
    setEmbassyDetails({
      country: embassySearch,
      address: `12, Shantipath, Chanakyapuri, New Delhi, Delhi 110021`,
      phone: '+91 11 2687 3000',
      email: `support.${embassySearch.toLowerCase()}@foreign.gov`,
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Emergency Assistance
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Access immediate SOS alerts, find local emergency numbers, locate nearby hospitals, and contact embassies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SOS Panel */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col justify-between items-center text-center space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display mb-2">
              Instant SOS Signal
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Press the button below to instantly broadcast your current GPS coordinates, local medical data, and battery status to nearby authorities and your emergency contacts.
            </p>
          </div>

          <div className="relative my-4">
            <AnimatePresence>
              {sosActive && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: [0, 0.4, 0] }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 bg-red-500 rounded-full"
                />
              )}
            </AnimatePresence>
            <button
              onClick={sosActive ? cancelSOS : triggerSOS}
              className={`w-36 h-36 rounded-full font-black text-xl tracking-wider font-display text-white transition-all shadow-lg active:scale-95 cursor-pointer relative z-10 ${
                sosActive
                  ? 'bg-slate-900 dark:bg-slate-950 ring-4 ring-slate-800 animate-pulse'
                  : 'bg-red-600 hover:bg-red-700 ring-4 ring-red-200 dark:ring-red-950/60'
              }`}
            >
              {sosActive ? 'CANCEL' : 'SOS'}
            </button>
          </div>

          {sosActive ? (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 text-[11px] text-red-600 dark:text-red-400 rounded-2xl w-full border border-red-100/40">
              <strong className="block mb-1">SOS Active!</strong>
              Broadcasting your live location (10.0889° N, 77.0595° E) with local emergency squad.
            </div>
          ) : (
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 text-[11px] text-slate-400 rounded-2xl w-full">
              System armed. Standard dispatch takes ~8 seconds.
            </div>
          )}
        </div>

        {/* Speed Dial Contacts */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600">call</span>
            Emergency Speed Dial
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {EMERGENCY_NUMBERS.map(num => (
              <a
                key={num.service}
                href={`tel:${num.number}`}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center h-32 group"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-lg">{num.icon}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display">
                    {num.service}
                  </h4>
                  <span className="text-xs font-mono font-black text-red-500 block mt-0.5">
                    {num.number}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Hospital Directory */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display mb-4">
              Nearest Medical Centers
            </h3>
            <div className="space-y-4">
              {MOCK_HOSPITALS.map((hosp, index) => (
                <div key={index} className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/20 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>{hosp.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{hosp.distance}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{hosp.type}</p>
                  <a
                    href={`tel:${hosp.contact}`}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mt-2.5"
                  >
                    <span className="material-symbols-outlined text-[13px]">phone</span>
                    {hosp.contact}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700/60 pt-4 text-[10px] text-slate-400 text-center font-sans">
            Medical directory auto-updates based on GPS coordinates.
          </div>
        </div>
      </div>

      {/* Embassy Lookup */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">flag</span>
            Embassy Finder
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">
            Search for your native country embassy address and contact details in your current destination.
          </p>
        </div>

        <form onSubmit={handleEmbassySearch} className="flex gap-3 max-w-md">
          <input
            type="text"
            placeholder="e.g. United Kingdom, Germany, United States"
            value={embassySearch}
            onChange={e => setEmbassySearch(e.target.value)}
            className="flex-1 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
          >
            Search
          </button>
        </form>

        {embassyDetails && (
          <div className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-1">
                Embassy of {embassyDetails.country}
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {embassyDetails.address}
              </p>
            </div>
            <div className="space-y-1 md:border-l md:border-slate-200 dark:md:border-slate-700/60 md:pl-6 flex flex-col justify-center">
              <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">phone</span>
                Phone: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{embassyDetails.phone}</span>
              </p>
              <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">mail</span>
                Email: <span className="font-semibold text-slate-800 dark:text-slate-200">{embassyDetails.email}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
