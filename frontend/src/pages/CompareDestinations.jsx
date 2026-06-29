import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DESTINATIONS_DB = {
  'Munnar': {
    name: 'Munnar, Kerala',
    weather: '18°C - 24°C · Pleasant/Rainy',
    budget: '₹12,000 - ₹18,000 / week',
    attractions: 'Tea Gardens, Eravikulam Park, Anamudi Peak',
    safety: 'Excellent · 9.2/10',
    visa: 'Not required (Domestic)',
    food: 'Idli, Keralan Sadya, Banana Fritters',
    internet: '15 - 35 Mbps (Moderate)',
    bestTime: 'September to March',
  },
  'Goa': {
    name: 'Goa Coast',
    weather: '28°C - 33°C · Tropical Sunny',
    budget: '₹18,000 - ₹30,000 / week',
    attractions: 'Anjuna Beach, Basilica of Bom Jesus, Fort Aguada',
    safety: 'Good · 8.4/10',
    visa: 'Not required (Domestic)',
    food: 'Fish Curry Rice, Bebinca, Pork Vindaloo',
    internet: '30 - 75 Mbps (Fast)',
    bestTime: 'November to February',
  },
  'Jaipur': {
    name: 'Jaipur, Rajasthan',
    weather: '22°C - 35°C · Dry Sunny',
    budget: '₹14,000 - ₹22,000 / week',
    attractions: 'Hawa Mahal, Amber Fort, City Palace',
    safety: 'Good · 8.1/10',
    visa: 'Not required (Domestic)',
    food: 'Dal Baati Churma, Gatte ki Sabzi, Pyaaz Kachori',
    internet: '40 - 90 Mbps (Very Fast)',
    bestTime: 'October to March',
  },
  'Manali': {
    name: 'Manali, Himachal',
    weather: '8°C - 16°C · Snowy/Cold',
    budget: '₹16,000 - ₹25,050 / week',
    attractions: 'Solang Valley, Hadimba Temple, Rohtang Pass',
    safety: 'Very Good · 8.8/10',
    visa: 'Not required (Domestic)',
    food: 'Siddu, Trout Fish, Tudkiya Bhath',
    internet: '20 - 45 Mbps (Moderate)',
    bestTime: 'October to June',
  },
};

export default function CompareDestinations() {
  const [dest1, setDest1] = useState('Munnar');
  const [dest2, setDest2] = useState('Goa');

  const data1 = DESTINATIONS_DB[dest1];
  const data2 = DESTINATIONS_DB[dest2];

  const compareRows = [
    { key: 'weather', label: 'Weather', icon: 'wb_sunny', color: 'text-amber-500' },
    { key: 'budget', label: 'Est. Budget', icon: 'payments', color: 'text-emerald-500' },
    { key: 'attractions', label: 'Key Attractions', icon: 'explore', color: 'text-indigo-500' },
    { key: 'safety', label: 'Safety Index', icon: 'gpp_good', color: 'text-teal-500' },
    { key: 'visa', label: 'Visa Regulations', icon: 'description', color: 'text-blue-500' },
    { key: 'food', label: 'Signature Cuisine', icon: 'restaurant', color: 'text-red-500' },
    { key: 'internet', label: 'Wi-Fi / Network Speed', icon: 'wifi', color: 'text-purple-500' },
    { key: 'bestTime', label: 'Best Time to Visit', icon: 'calendar_month', color: 'text-violet-500' },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Compare Destinations
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Select two travel locations side-by-side to compare cost, connectivity, culinary choices, and safety.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm">
        {/* Selector 1 */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Location A
          </label>
          <select
            value={dest1}
            onChange={e => setDest1(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
          >
            {Object.keys(DESTINATIONS_DB).map(k => (
              <option key={k} value={k} disabled={k === dest2}>{DESTINATIONS_DB[k].name}</option>
            ))}
          </select>
        </div>

        {/* Selector 2 */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Location B
          </label>
          <select
            value={dest2}
            onChange={e => setDest2(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
          >
            {Object.keys(DESTINATIONS_DB).map(k => (
              <option key={k} value={k} disabled={k === dest1}>{DESTINATIONS_DB[k].name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-700/60">
          
          {/* Column headers */}
          <div className="p-5 font-black text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/40 text-sm flex items-center md:justify-center">
            Comparison Criteria
          </div>
          <div className="p-5 font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50/20 dark:bg-indigo-950/20 text-center text-sm font-display">
            {data1.name}
          </div>
          <div className="p-5 font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50/20 dark:bg-indigo-950/20 text-center text-sm font-display">
            {data2.name}
          </div>

          {/* Rows mapping */}
          {compareRows.map(row => (
            <React.Fragment key={row.key}>
              {/* Feature Title */}
              <div className="p-5 flex items-center gap-2.5 text-xs font-bold text-slate-550 dark:text-slate-350 bg-slate-50/30 dark:bg-slate-900/10">
                <span className={`material-symbols-outlined text-lg ${row.color}`}>{row.icon}</span>
                <span>{row.label}</span>
              </div>
              
              {/* Dest 1 value */}
              <div className="p-5 text-xs text-slate-800 dark:text-slate-200 font-medium md:text-center flex items-center md:justify-center">
                {data1[row.key]}
              </div>

              {/* Dest 2 value */}
              <div className="p-5 text-xs text-slate-800 dark:text-slate-200 font-medium md:text-center flex items-center md:justify-center">
                {data2[row.key]}
              </div>
            </React.Fragment>
          ))}

        </div>
      </div>
    </div>
  );
}
