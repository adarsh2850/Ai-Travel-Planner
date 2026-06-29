import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Hidden Gems', 'Trending', 'Luxury', 'Adventure', 'Solo', 'Couple', 'Family'];

const RECOMMENDATIONS = [
  {
    id: 1,
    title: 'Hampi, Karnataka',
    category: 'Hidden Gems',
    image: 'https://images.unsplash.com/photo-1600100397608-f010e42ec9cb?w=800&q=80',
    rating: 4.8,
    aiScore: 98,
    duration: '4 Days',
    budget: 12000,
    weather: '29°C · Dry',
    description: 'Ancient ruins of Vijayanagara empire set amidst boulders and palm trees. Perfect for culture fans.',
  },
  {
    id: 2,
    title: 'Alleppey Backwaters, Kerala',
    category: 'Couple',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    rating: 4.9,
    aiScore: 96,
    duration: '3 Days',
    budget: 16000,
    weather: '28°C · Humid',
    description: 'Rent a luxury houseboat to float along beautiful palm-fringed canals. Extremely romantic and tranquil.',
  },
  {
    id: 3,
    title: 'Ladakh Highlands, J&K',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80',
    rating: 4.7,
    aiScore: 95,
    duration: '7 Days',
    budget: 35000,
    weather: '12°C · Cold',
    description: 'High-altitude desert biking, breathtaking Pangong lake, and majestic Buddhist monasteries.',
  },
  {
    id: 4,
    title: 'Udaipur Palace Experience',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=800&q=80',
    rating: 4.9,
    aiScore: 97,
    duration: '3 Days',
    budget: 45000,
    weather: '26°C · Sunny',
    description: 'Live like royalty in magnificent heritage lake palace hotels. Intricate Mewar art and royal hospitality.',
  },
  {
    id: 5,
    title: 'Coorg Coffee Estates',
    category: 'Family',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    rating: 4.6,
    aiScore: 92,
    duration: '5 Days',
    budget: 18000,
    weather: '21°C · Pleasant',
    description: 'Breathe in aromatic coffee fields, explore waterfalls, and enjoy homestays. Ideal for family bonding.',
  },
  {
    id: 6,
    title: 'Gokarna Beach Trek',
    category: 'Solo',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    rating: 4.7,
    aiScore: 94,
    duration: '4 Days',
    budget: 9000,
    weather: '30°C · Sunny',
    description: 'A laid-back alternative to Goa. Trek across cliffside beaches and experience peaceful beach shacks.',
  },
];

export default function AIRecommendations({ onStartPlan }) {
  const [selectedCat, setSelectedCat] = useState('All');

  const filtered = selectedCat === 'All'
    ? RECOMMENDATIONS
    : RECOMMENDATIONS.filter(r => r.category === selectedCat);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
            AI Recommendations
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Personalized destinations selected by Lumina Engine matching your past travels and profile interests.
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
              selectedCat === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <motion.div
            layout
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* Image & Badges */}
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Category tag */}
              <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {item.category}
              </span>

              {/* AI Match Score */}
              <div className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <span className="material-symbols-outlined text-[12px] font-bold">auto_awesome</span>
                <span className="text-[11px] font-extrabold">{item.aiScore}% Match</span>
              </div>

              {/* Rating overlay */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white bg-slate-950/40 backdrop-blur-sm px-2 py-0.5 rounded-lg text-xs font-bold">
                <span className="material-symbols-outlined text-amber-400 text-xs font-bold fill-current">star</span>
                {item.rating}
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Badges Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 border-t border-slate-100 dark:border-slate-700/60 pt-4">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-indigo-500 text-lg">calendar_month</span>
                    <span className="text-xs font-semibold">{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-indigo-500 text-lg">payments</span>
                    <span className="text-xs font-semibold">₹{item.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 col-span-2">
                    <span className="material-symbols-outlined text-indigo-500 text-lg">wb_sunny</span>
                    <span className="text-xs font-semibold">{item.weather}</span>
                  </div>
                </div>
              </div>

              {/* Plan button */}
              <button
                onClick={() => onStartPlan && onStartPlan(item.title)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md shadow-indigo-100 dark:shadow-none hover:shadow-indigo-200 dark:hover:shadow-none flex items-center justify-center gap-1.5 cursor-pointer mt-4"
              >
                <span className="material-symbols-outlined text-sm font-bold">auto_awesome</span>
                Plan My Journey
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
