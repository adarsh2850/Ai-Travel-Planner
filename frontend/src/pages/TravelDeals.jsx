import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = ['All Deals', 'Flights', 'Hotels', 'Packages', 'Flash Sales'];

const DEALS = [
  {
    id: 1,
    title: 'Monsoon Magic: 25% off Kerala Resorts',
    desc: 'Book selected Ayurvedic wellness spa resorts in Wayanad and Munnar. Includes free organic breakfasts.',
    category: 'Hotels',
    code: 'KERALA25',
    discount: '25% OFF',
    expiry: 'Expires in 3 days',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    title: 'Indigo Airline Special Fare: Goa Flights',
    desc: 'Discounted direct round trips from Delhi, Mumbai, and Bangalore. Book early, travel anytime this winter.',
    category: 'Flights',
    code: 'INDIGO15',
    discount: '15% OFF',
    expiry: 'Expires tomorrow',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 3,
    title: 'Himalayan Adventure Combo: Manali & Leh',
    desc: 'Complete 6-night guided camping and trekking package with adventure guides, equipment, and stays.',
    category: 'Packages',
    code: 'HIMALAYA4K',
    discount: '₹4,000 OFF',
    expiry: 'Expires in 1 week',
    image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?w=800&q=80',
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: 4,
    title: 'Flash Deal: Taj Mahal Sunrise Tour Coupon',
    desc: 'Get half-price guided historic entry tickets and skip-the-line VIP passes to the iconic Taj Mahal monument.',
    category: 'Flash Sales',
    code: 'AGRA50',
    discount: '50% OFF',
    expiry: 'Ends in 4 hours!',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    color: 'from-rose-500 to-red-600',
  },
];

export default function TravelDeals() {
  const [selectedCat, setSelectedCat] = useState('All Deals');

  const filtered = selectedCat === 'All Deals'
    ? DEALS
    : DEALS.filter(d => d.category === selectedCat);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Promo code "${code}" copied to clipboard! Paste it during booking checkout.`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Exclusive Travel Deals
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Handpicked premium flight vouchers, hotel discounts, and flash packages curated for you.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
              selectedCat === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(deal => (
          <motion.div
            layout
            key={deal.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row hover:shadow-md transition-all duration-200 group"
          >
            {/* Image & Discount Badge */}
            <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden flex-shrink-0">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className={`absolute inset-0 bg-gradient-to-tr ${deal.color} opacity-40`} />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-200">
                  {deal.category}
                </span>
                <span className="text-2xl font-black tracking-tight font-display mt-1">
                  {deal.discount}
                </span>
                <span className="text-[9px] bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider mt-2.5">
                  {deal.expiry}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display leading-snug">
                  {deal.title}
                </h3>
                <p className="text-xs text-slate-550 dark:text-slate-400 mt-2 leading-relaxed">
                  {deal.desc}
                </p>
              </div>

              {/* Promo Code copy area */}
              <div className="flex items-center gap-3 border-t border-slate-100 dark:border-slate-700/60 pt-4 mt-4">
                <div className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 rounded-xl px-3.5 py-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Code</span>
                  <span className="text-xs font-mono font-black text-slate-900 dark:text-white tracking-widest">
                    {deal.code}
                  </span>
                </div>
                <button
                  onClick={() => copyCode(deal.code)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-850 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm font-bold">content_copy</span>
                  Copy
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
