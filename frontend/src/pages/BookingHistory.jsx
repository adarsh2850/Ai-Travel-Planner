import React, { useState } from 'react';
import { motion } from 'framer-motion';

const INITIAL_BOOKINGS = [
  {
    id: 'BK-1082',
    type: 'Flight',
    provider: 'Indigo Airlines',
    title: 'Delhi (DEL) ➔ Goa (GOI)',
    details: 'Flight 6E-2015 · Economy Class',
    date: 'Dec 12, 2026',
    price: 6499,
    status: 'Confirmed',
    icon: 'flight',
    iconColor: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
  },
  {
    id: 'BK-9941',
    type: 'Hotel',
    provider: 'Windermere Estate Resort',
    title: 'Windermere Estate Munnar',
    details: 'Garden Cabin Suite · 3 Nights',
    date: 'Dec 15 - Dec 18, 2026',
    price: 24500,
    status: 'Confirmed',
    icon: 'hotel',
    iconColor: 'bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400',
  },
  {
    id: 'BK-4530',
    type: 'Activity',
    provider: 'Goa Watersports Club',
    title: 'Scuba Diving & Parasailing Combo',
    details: 'Full Day guided package · Calangute Beach',
    date: 'Dec 13, 2026',
    price: 3200,
    status: 'Pending',
    icon: 'sailing',
    iconColor: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400',
  },
  {
    id: 'BK-3312',
    type: 'Flight',
    provider: 'Air India',
    title: 'Goa (GOI) ➔ Delhi (DEL)',
    details: 'Flight AI-823 · Economy Class',
    date: 'Dec 19, 2026',
    price: 5800,
    status: 'Completed',
    icon: 'flight',
    iconColor: 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
  },
  {
    id: 'BK-1209',
    type: 'Hotel',
    provider: 'The Zuri White Sands',
    title: 'Premium Garden View Room',
    details: '1 Night stay (Cancelled)',
    date: 'Nov 02, 2026',
    price: 11000,
    status: 'Cancelled',
    icon: 'hotel',
    iconColor: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400',
  },
];

export default function BookingHistory() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [filterType, setFilterType] = useState('All');

  const filtered = filterType === 'All'
    ? bookings
    : bookings.filter(b => b.type === filterType);

  const downloadInvoice = (booking) => {
    alert(`Downloading invoice for Booking ${booking.id} (${booking.provider}) in PDF format.`);
  };

  const types = ['All', 'Flight', 'Hotel', 'Activity'];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
            Booking History
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Access, view status, and download invoices for all your reservations.
          </p>
        </div>
      </div>

      {/* Tab Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              filterType === t
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            {t}s
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filtered.map(booking => (
          <motion.div
            layout
            key={booking.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Header info */}
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${booking.iconColor}`}>
                <span className="material-symbols-outlined text-xl">{booking.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    {booking.type}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600 text-xs">•</span>
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                    {booking.id}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    booking.status === 'Confirmed' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' :
                    booking.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400' :
                    booking.status === 'Completed' ? 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400' :
                    'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  {booking.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {booking.provider} · <span className="font-semibold text-slate-600 dark:text-slate-300">{booking.details}</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">calendar_today</span>
                  {booking.date}
                </p>
              </div>
            </div>

            {/* Price & Invoice Action */}
            <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-slate-100 dark:border-slate-700/60 pt-4 md:pt-0">
              <div className="text-left md:text-right">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">
                  Paid Amount
                </span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-display">
                  ₹{booking.price.toLocaleString()}
                </span>
              </div>
              {booking.status !== 'Cancelled' && (
                <button
                  onClick={() => downloadInvoice(booking)}
                  className="mt-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-100/10"
                >
                  <span className="material-symbols-outlined text-sm font-bold">download</span>
                  Invoice PDF
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
