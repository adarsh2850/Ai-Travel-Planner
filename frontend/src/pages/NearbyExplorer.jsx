import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'restaurant', name: 'Restaurants', icon: 'restaurant', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
  { id: 'hotel', name: 'Hotels', icon: 'hotel', color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/20' },
  { id: 'cafe', name: 'Cafes', icon: 'local_cafe', color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/20' },
  { id: 'attraction', name: 'Attractions', icon: 'explore', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20' },
  { id: 'atm', name: 'ATMs', icon: 'local_atm', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' },
  { id: 'hospital', name: 'Hospitals', icon: 'emergency', color: 'text-red-500 bg-red-50 dark:bg-red-950/20' },
];

const PLACES_DATABASE = {
  restaurant: [
    { name: 'Rapsy Keralan Dining', distance: '400 m away', rating: 4.6, address: 'Main Bazar, Munnar Town' },
    { name: 'Saravana Bhavan Veg', distance: '800 m away', rating: 4.4, address: 'Near Bus Stand, Munnar' },
  ],
  hotel: [
    { name: 'Windermere Estate Resort', distance: '1.2 km away', rating: 4.9, address: 'Pothamedu, Munnar' },
    { name: 'Blanket Hotel & Spa', distance: '3.4 km away', rating: 4.8, address: 'Attukad Waterfall Rd, Munnar' },
  ],
  cafe: [
    { name: 'Coffee Temple Munnar', distance: '150 m away', rating: 4.5, address: 'Colony Road, Munnar' },
    { name: 'Tea Valley Café', distance: '1.6 km away', rating: 4.2, address: 'Devikulam Road, Munnar' },
  ],
  attraction: [
    { name: 'Tea Museum & Factory', distance: '2.1 km away', rating: 4.3, address: 'Nullatanni Estate, Munnar' },
    { name: 'Eravikulam National Park', distance: '8.5 km away', rating: 4.7, address: 'Rajamalai, Munnar' },
  ],
  atm: [
    { name: 'State Bank of India ATM', distance: '300 m away', rating: 4.1, address: 'Main Road Cross, Munnar' },
    { name: 'HDFC Bank ATM Lobby', distance: '500 m away', rating: 4.2, address: 'Munnar Town Center' },
  ],
  hospital: [
    { name: 'Munnar General Hospital', distance: '1.2 km away', rating: 3.9, address: 'Hospital Road, Munnar' },
    { name: 'Tata Health Center', distance: '2.5 km away', rating: 4.5, address: 'Pothamedu Bypass Road' },
  ],
};

export default function NearbyExplorer({ destination }) {
  const [selectedCat, setSelectedCat] = useState('restaurant');
  const activeDest = destination || 'Munnar, Kerala';

  const places = PLACES_DATABASE[selectedCat] || [];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
            Nearby Explorer
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Search for local amenities, ATMs, cafes, and emergency centers near <span className="text-indigo-600 dark:text-indigo-400 font-bold">{activeDest}</span>.
          </p>
        </div>
      </div>

      {/* Categories Horizontal Scroller */}
      <div className="flex gap-3 overflow-x-auto pb-2 pr-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-4 py-3 rounded-2xl flex items-center gap-2.5 flex-shrink-0 border transition-all duration-200 cursor-pointer ${
              selectedCat === cat.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 dark:shadow-none'
                : 'bg-white dark:bg-slate-800 text-slate-650 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-650'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${selectedCat === cat.id ? 'bg-white/20 text-white' : cat.color}`}>
              <span className="material-symbols-outlined text-base">{cat.icon}</span>
            </div>
            <span className="text-xs font-bold font-display">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Places List column */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display uppercase tracking-wider">
            Nearby Locations
          </h3>

          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {places.map((place, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-3 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white leading-snug">
                    {place.name}
                  </h4>
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-lg flex-shrink-0">
                    <span className="material-symbols-outlined text-xs font-bold fill-current">star</span>
                    {place.rating}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                  {place.address}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 pt-3 text-[10px]">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">pin_drop</span>
                    {place.distance}
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ', ' + activeDest)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-indigo-600 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    Open in Maps
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Preview Column */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between h-[450px] relative">
          {/* Map canvas mock stub */}
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 map-canvas-stub flex flex-col items-center justify-center p-6 text-center">
            <span className="material-symbols-outlined text-5xl text-indigo-500 mb-2 animate-bounce">
              location_on
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-250">Interactive Map Preview</h4>
            <p className="text-xs text-slate-450 mt-1 max-w-sm">
              Plotting {places.length} nearby {selectedCat}s around {activeDest}.
            </p>
          </div>

          {/* Map settings footer overlays */}
          <div className="relative z-10 p-5 mt-auto bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent text-white flex justify-between items-center">
            <div className="text-xs">
              <span className="block font-bold">GPS Mode Active</span>
              <span className="text-[10px] text-slate-400">Location updates every 30s</span>
            </div>
            <button
              onClick={() => alert("Recalibrating GPS sensor.")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-md"
            >
              Recenter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
