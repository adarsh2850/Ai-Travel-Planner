import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Flight Update: SG-102 Delayed',
    body: 'Your flight to Goa is delayed by 45 minutes. New boarding time is 14:15.',
    category: 'Flights',
    time: '10 mins ago',
    read: false,
    icon: 'flight_takeoff',
    iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30',
  },
  {
    id: 2,
    title: 'Weather Warning: High Rainfall in Munnar',
    body: 'Munnar is expecting heavy showers tomorrow. Packing an umbrella and waterproof gear is recommended.',
    category: 'Weather',
    time: '2 hours ago',
    read: false,
    icon: 'thunderstorm',
    iconColor: 'text-red-500 bg-red-50 dark:bg-red-950/30',
  },
  {
    id: 3,
    title: 'AI Travel Hack: Dinner in Munnar',
    body: 'Lumina AI suggests visiting Rapsy Restaurant for the best local Keralan parotta. It is just 5 mins from your hotel!',
    category: 'AI Tips',
    time: '5 hours ago',
    read: true,
    icon: 'auto_awesome',
    iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30',
  },
  {
    id: 4,
    title: 'Hotel Confirmed: Windermere Estate',
    body: 'Your check-in is secured for Dec 12, 12:00 PM. Tap to view your digital voucher.',
    category: 'Hotels',
    time: '1 day ago',
    read: true,
    icon: 'hotel',
    iconColor: 'text-teal-500 bg-teal-50 dark:bg-teal-950/30',
  },
  {
    id: 5,
    title: 'Exclusive Deal: 20% off Spa Services',
    body: 'Enjoy a relaxing Keralan Ayurvedic massage at a discount. Book before check-in.',
    category: 'Promotions',
    time: '2 days ago',
    read: true,
    icon: 'local_offer',
    iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/30',
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClear = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filtered = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return !n.read;
    return n.category === activeFilter;
  });

  const categories = ['All', 'Unread', 'Flights', 'Weather', 'Hotels', 'AI Tips'];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
            Notification Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Stay updated on flights, weather adjustments, and smart AI travel recommendations.
          </p>
        </div>
        {notifications.some(n => !n.read) && (
          <button
            onClick={handleMarkAllRead}
            className="self-start sm:self-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 dark:border-slate-700 mb-6 pb-2">
        {categories.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
              activeFilter === tab
                ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4">
                notifications_off
              </span>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">All caught up!</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                You have no notifications matching this category.
              </p>
            </motion.div>
          ) : (
            filtered.map(notif => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className={`p-5 rounded-2xl border transition-all duration-200 shadow-sm flex items-start gap-4 relative group ${
                  notif.read
                    ? 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/60 opacity-75'
                    : 'bg-white dark:bg-slate-800 border-indigo-100 dark:border-indigo-900/40 ring-1 ring-indigo-50 dark:ring-indigo-950/20'
                }`}
              >
                {/* Red dot for unread */}
                {!notif.read && (
                  <span className="absolute top-5 right-12 w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse" />
                )}

                {/* Category Icon */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${notif.iconColor}`}>
                  <span className="material-symbols-outlined text-lg">{notif.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      {notif.category}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600 text-xs">•</span>
                    <span className="text-xs text-slate-400">{notif.time}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white leading-snug">
                    {notif.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {notif.body}
                  </p>

                  {/* Actions */}
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkRead(notif.id)}
                      className="mt-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">done</span>
                      Mark as read
                    </button>
                  )}
                </div>

                {/* Clear button */}
                <button
                  onClick={() => handleClear(notif.id)}
                  className="text-slate-400 hover:text-red-500 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors opacity-0 group-hover:opacity-100 absolute top-4 right-4"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
