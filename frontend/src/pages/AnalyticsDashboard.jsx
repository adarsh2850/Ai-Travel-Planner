import React, { useState } from 'react';

const KPIS = [
  { label: 'Countries Visited', val: '2', icon: 'public', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20' },
  { label: 'Cities Visited', val: '8', icon: 'location_city', color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/20' },
  { label: 'Total Distance', val: '4,820 km', icon: 'insights', color: 'text-pink-500 bg-pink-50 dark:bg-pink-950/20' },
  { label: 'Money Spent', val: '₹92,500', icon: 'payments', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' },
];

const MONTHLY_SPENDING = [
  { month: 'Jul', spend: 8500 },
  { month: 'Aug', spend: 12000 },
  { month: 'Sep', spend: 4500 },
  { month: 'Oct', spend: 18500 },
  { month: 'Nov', spend: 24500 },
  { month: 'Dec', spend: 32000 },
];

export default function AnalyticsDashboard() {
  const [selectedKpi, setSelectedKpi] = useState('Money Spent');

  // Custom SVG line chart plotting
  const maxSpend = Math.max(...MONTHLY_SPENDING.map(m => m.spend));
  const points = MONTHLY_SPENDING.map((m, idx) => {
    const x = 50 + idx * 80;
    const y = 180 - (m.spend / maxSpend) * 120;
    return { x, y, label: m.month, val: m.spend };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length-1].x} 180 L ${points[0].x} 180 Z`;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Analytics Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Review your travel footprints, budgeting habits, and monthly trip frequencies.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {KPIS.map(k => (
          <button
            key={k.label}
            onClick={() => setSelectedKpi(k.label)}
            className={`p-6 rounded-3xl border text-left shadow-sm transition-all duration-200 cursor-pointer ${
              selectedKpi === k.label
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-slate-600'
            }`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${selectedKpi === k.label ? 'bg-white/20 text-white' : k.color}`}>
              <span className="material-symbols-outlined text-xl">{k.icon}</span>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block ${selectedKpi === k.label ? 'text-indigo-200' : 'text-slate-400'}`}>
              {k.label}
            </span>
            <span className={`text-2xl font-black font-display block mt-1 ${selectedKpi === k.label ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
              {k.val}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Spending Trend Line Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display mb-1">
              Monthly Travel Spending Trend
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Visualizing flight, lodging, and activity costs incurred over the last 6 months.
            </p>
          </div>

          {/* SVG Line & Area Chart */}
          <div className="w-full overflow-x-auto py-6">
            <svg viewBox="0 0 500 200" className="w-full min-w-[450px] h-48 overflow-visible">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="40" y1="60" x2="480" y2="60" stroke="rgba(226,232,240,0.15)" strokeDasharray="3" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="rgba(226,232,240,0.15)" strokeDasharray="3" />
              <line x1="40" y1="180" x2="480" y2="180" stroke="rgba(226,232,240,0.25)" />

              {/* Area */}
              <path d={areaPath} fill="url(#chartGrad)" />

              {/* Line */}
              <path d={linePath} fill="none" stroke="#6366F1" strokeWidth="2.8" />

              {/* Points */}
              {points.map((p, i) => (
                <g key={i} className="group cursor-pointer">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4.5"
                    fill="#6366F1"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    className="hover:r-6 transition-all duration-150"
                  />
                  {/* Tooltip on hover */}
                  <text
                    x={p.x}
                    y={p.y - 12}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-bold fill-indigo-600 dark:fill-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ₹{p.val.toLocaleString()}
                  </text>
                  {/* X Axis Labels */}
                  <text
                    x={p.x}
                    y="196"
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-slate-400 dark:fill-slate-500"
                  >
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Favorite stats list */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display mb-4">
              Top Visited Niches
            </h3>
            <div className="space-y-4 text-xs">
              {[
                { name: 'Hill Stations & Tea Estates', pct: '62%', color: 'bg-emerald-500' },
                { name: 'Sandy Beaches & Shacks', pct: '28%', color: 'bg-teal-500' },
                { name: 'Historical Forts & Culture', pct: '10%', color: 'bg-indigo-500' },
              ].map(niche => (
                <div key={niche.name} className="space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                    <span>{niche.name}</span>
                    <span>{niche.pct}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${niche.color}`} style={{ width: niche.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700/60 pt-4 text-[10px] text-slate-400 text-center font-sans">
            AI generates travel categories based on booked itinerary tag keywords.
          </div>
        </div>
      </div>
    </div>
  );
}
