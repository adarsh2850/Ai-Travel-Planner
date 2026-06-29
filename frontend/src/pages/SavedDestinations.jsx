import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Beaches', 'Mountains', 'Culture', 'Nature', 'Adventure'];

const INITIAL_DESTINATIONS = [
  {
    id: 1,
    name: 'Munnar, Kerala',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    weather: '22°C · Rainy',
    weatherIcon: 'water_drop',
    budget: 15000,
    coords: '10.0889° N, 77.0595° E',
    description: 'Breathtaking green tea plantations and misty hills.',
  },
  {
    id: 2,
    name: 'Goa Beaches',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    weather: '31°C · Sunny',
    weatherIcon: 'wb_sunny',
    budget: 20000,
    coords: '15.2993° N, 74.1240° E',
    description: 'Golden sands, vibrant nightlife, and historic churches.',
  },
  {
    id: 3,
    name: 'Jaipur, Rajasthan',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1477584308802-e9c3788ee417?w=800&q=80',
    weather: '34°C · Sunny',
    weatherIcon: 'sunny',
    budget: 18000,
    coords: '26.9124° N, 75.7873° E',
    description: 'The Pink City filled with magnificent forts and palaces.',
  },
  {
    id: 4,
    name: 'Manali, Himachal',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?w=800&q=80',
    weather: '14°C · Cloudy',
    weatherIcon: 'cloud',
    budget: 22000,
    coords: '32.2396° N, 77.1887° E',
    description: 'Snowy peaks, adventure sports, and scenic valleys.',
  },
];

export default function SavedDestinations({ onStartPlan }) {
  const [destinations, setDestinations] = useState(INITIAL_DESTINATIONS);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleRemove = (id) => {
    setDestinations(prev => prev.filter(d => d.id !== id));
  };

  const filtered = activeCategory === 'All'
    ? destinations
    : destinations.filter(d => d.category === activeCategory);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
            Saved Destinations
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Keep track of places you want to explore and plan them instantly.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4">
            bookmark_border
          </span>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No destinations found</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Try exploring other categories or add new places.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(dest => (
            <motion.div
              layout
              key={dest.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row hover:shadow-lg transition-all duration-300 group"
            >
              {/* Image Banner */}
              <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden flex-shrink-0">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {dest.category}
                </span>
                <button
                  onClick={() => handleRemove(dest.id)}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-all"
                  title="Remove from Wishlist"
                >
                  <span className="material-symbols-outlined text-sm font-bold">close</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white font-display mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                    {dest.description}
                  </p>

                  {/* Metadata widgets */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <span className="material-symbols-outlined text-indigo-500 dark:text-indigo-400 text-lg">
                        {dest.weatherIcon}
                      </span>
                      <span className="text-xs font-medium">{dest.weather}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <span className="material-symbols-outlined text-teal-500 text-lg">
                        payments
                      </span>
                      <span className="text-xs font-medium">Est. ₹{dest.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Map coordinates and plan button */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 pt-4 mt-auto">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="material-symbols-outlined text-sm">pin_drop</span>
                    <span className="text-[10px] font-mono tracking-tight">{dest.coords}</span>
                  </div>
                  <button
                    onClick={() => onStartPlan && onStartPlan(dest.name)}
                    className="bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">auto_awesome</span>
                    Plan Trip
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
