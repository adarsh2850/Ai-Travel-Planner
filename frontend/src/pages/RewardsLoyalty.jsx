import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BADGES = [
  { id: 1, name: 'Eco Explorer', icon: 'spa', desc: 'Saved 50+ kg CO2 via green transport options.', unlocked: true },
  { id: 2, name: 'Mountain Nomad', icon: 'landscape', desc: 'Booked 3+ trips in high altitudes.', unlocked: true },
  { id: 3, name: 'Heritage Hunter', icon: 'castle', desc: 'Visited 5+ historic sites.', unlocked: false },
  { id: 4, name: 'Sun & Sand', icon: 'beach_access', desc: 'Stayed on beachfront stays.', unlocked: true },
];

const INITIAL_COUPONS = [
  { id: 'FLIGHT-500', title: '₹500 Flight Discount', desc: 'Valid on domestic airfares above ₹5,000.', pointsCost: 500, redeemed: false },
  { id: 'HOTEL-10', title: '10% Resort Voucher', desc: 'Redeemable on selected luxury stays.', pointsCost: 800, redeemed: false },
  { id: 'CAFE-200', title: '₹200 Diner Coupon', desc: 'Discount code on featured airport lounge cafés.', pointsCost: 200, redeemed: true },
];

export default function RewardsLoyalty() {
  const [points, setPoints] = useState(1450);
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);

  const redeemCoupon = (id, cost) => {
    if (points < cost) {
      alert("Insufficient points to redeem this coupon!");
      return;
    }
    setPoints(points - cost);
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, redeemed: true } : c));
    alert(`Successfully redeemed coupon: ${id}! Code: LUMINA-${Math.floor(Math.random()*9000)+1000}`);
  };

  const inviteFriend = () => {
    navigator.clipboard.writeText("https://luminatravel.ai/invite?ref=adarsh48");
    alert("Referral link copied! Send it to your friend to earn 250 points upon signup.");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Rewards & Loyalty
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Accumulate points as you travel, unlock levels, and redeem coupons.
        </p>
      </div>

      {/* Point Level Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-850 to-indigo-800 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="w-16 h-16 rounded-full bg-indigo-600 border border-white/20 flex items-center justify-center flex-shrink-0 shadow-lg animate-bounce">
            <span className="material-symbols-outlined text-4xl text-yellow-400 font-bold">workspace_premium</span>
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300">Loyalty Class</span>
            <h2 className="text-2xl font-black font-display mt-0.5">Globetrotter Level 4</h2>
            <div className="w-full md:w-56 h-2 bg-indigo-950 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-yellow-400 rounded-full" style={{ width: '68%' }} />
            </div>
            <p className="text-[10px] text-indigo-200 mt-1.5 font-sans">
              340 points remaining to Level 5 Platinum member
            </p>
          </div>
        </div>

        <div className="text-center md:text-right bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
          <span className="text-[10px] uppercase tracking-wider text-indigo-200 block font-semibold">Available Points</span>
          <span className="text-4xl font-black text-yellow-400 font-display block mt-1">
            {points.toLocaleString()}
          </span>
          <span className="text-[10px] text-indigo-200 block mt-1">Lumina Gold Coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Badges section */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">military_tech</span>
            Unlocked Badges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BADGES.map(badge => (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border flex items-start gap-4 transition-all duration-200 shadow-sm ${
                  badge.unlocked
                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 hover:shadow-md'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-dashed border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
                  badge.unlocked
                    ? 'bg-indigo-50 border-indigo-100 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/40'
                    : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700'
                }`}>
                  <span className="material-symbols-outlined text-xl">{badge.icon}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display leading-snug">
                    {badge.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-sans">
                    {badge.desc}
                  </p>
                  {!badge.unlocked && (
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mt-2 block">
                      Locked
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite and Earn */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-indigo-600">group_add</span>
              Invite Friends
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Earn 250 points for every friend who signs up and builds their first AI trip itinerary on Lumina!
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/60 font-mono text-[10px] tracking-tight text-slate-400 text-center select-all mt-4">
              https://luminatravel.ai/invite?ref=adarsh48
            </div>
          </div>
          <button
            onClick={inviteFriend}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">content_copy</span>
            Copy Invite URL
          </button>
        </div>
      </div>

      {/* Coupons Redeem */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">confirmation_number</span>
          Redeem Coupons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map(cp => (
            <div
              key={cp.id}
              className={`p-5 rounded-3xl border flex flex-col justify-between shadow-sm relative overflow-hidden h-44 ${
                cp.redeemed
                  ? 'bg-slate-50 dark:bg-slate-900/30 border-slate-200/40 opacity-60'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-lg">
                    {cp.id}
                  </span>
                  <span className="text-xs font-bold text-yellow-500 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px] font-bold fill-current">workspace_premium</span>
                    {cp.pointsCost} pts
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white font-display">
                  {cp.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {cp.desc}
                </p>
              </div>

              {cp.redeemed ? (
                <span className="text-center text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 py-1.5 rounded-xl mt-3">
                  Redeemed
                </span>
              ) : (
                <button
                  onClick={() => redeemCoupon(cp.id, cp.pointsCost)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1 mt-3"
                >
                  <span className="material-symbols-outlined text-sm">redeem</span>
                  Redeem Coupon
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
