import React, { useState } from 'react';
import { motion } from 'framer-motion';

const INITIAL_CARDS = [
  {
    id: 1,
    type: 'Visa',
    number: '•••• •••• •••• 4820',
    name: 'Adarsh Sharma',
    expiry: '09/29',
    bg: 'bg-gradient-to-tr from-slate-900 via-indigo-950 to-indigo-900',
  },
  {
    id: 2,
    type: 'Mastercard',
    number: '•••• •••• •••• 9921',
    name: 'Adarsh Sharma',
    expiry: '04/28',
    bg: 'bg-gradient-to-tr from-teal-900 via-emerald-950 to-emerald-900',
  },
];

const BILLING_HISTORY = [
  { id: 'TXN-9402', item: 'Flight Booking SG-102', date: 'Jun 22, 2026', amount: 6499, method: 'Visa ending 4820', status: 'Success' },
  { id: 'TXN-8820', item: 'Hotel Windermere Deposit', date: 'Jun 19, 2026', amount: 24500, method: 'UPI Wallet', status: 'Success' },
  { id: 'TXN-4112', item: 'Zuri White Sands Refund', date: 'Nov 04, 2025', amount: 11000, method: 'Mastercard ending 9921', status: 'Refunded' },
];

export default function PaymentCenter() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({ name: '', number: '', expiry: '' });

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.name || !newCard.number || !newCard.expiry) return;
    const item = {
      id: Date.now(),
      type: newCard.number.startsWith('5') ? 'Mastercard' : 'Visa',
      number: '•••• •••• •••• ' + newCard.number.slice(-4),
      name: newCard.name,
      expiry: newCard.expiry,
      bg: 'bg-gradient-to-tr from-indigo-900 via-violet-950 to-purple-900',
    };
    setCards([...cards, item]);
    setNewCard({ name: '', number: '', expiry: '' });
    setShowAddCard(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Payment Center
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage saved credit cards, UPI codes, wallets, and track refunds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Saved Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">credit_card</span>
              Saved Cards
            </h2>
            <button
              onClick={() => setShowAddCard(!showAddCard)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80 px-3 py-1.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all cursor-pointer"
            >
              {showAddCard ? 'Cancel' : '+ Add Card'}
            </button>
          </div>

          {showAddCard && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              onSubmit={handleAddCard}
              className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 p-5 rounded-3xl space-y-4"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">New Card Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  value={newCard.name}
                  onChange={e => setNewCard({ ...newCard, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Card Number (16 Digits)"
                  maxLength="16"
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  value={newCard.number}
                  onChange={e => setNewCard({ ...newCard, number: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  value={newCard.expiry}
                  onChange={e => setNewCard({ ...newCard, expiry: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100 dark:shadow-none cursor-pointer"
                >
                  Save Card
                </button>
              </div>
            </motion.form>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map(card => (
              <div
                key={card.id}
                className={`p-6 rounded-3xl text-white shadow-md relative overflow-hidden h-44 flex flex-col justify-between ${card.bg}`}
              >
                {/* Chip & Type */}
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-4xl text-yellow-500 font-light opacity-80">
                    credit_card_heart
                  </span>
                  <span className="text-sm font-black tracking-wider italic font-display opacity-80">
                    {card.type}
                  </span>
                </div>

                {/* Card Number */}
                <div className="text-xl font-mono tracking-widest text-center my-3 opacity-95">
                  {card.number}
                </div>

                {/* Footer details */}
                <div className="flex justify-between items-end border-t border-white/10 pt-3">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                      Card Holder
                    </span>
                    <span className="text-xs font-semibold tracking-wide font-display">
                      {card.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                      Expires
                    </span>
                    <span className="text-xs font-semibold font-display">
                      {card.expiry}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UPI & Digital Wallet info */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">account_balance_wallet</span>
            Wallets & UPI
          </h2>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 space-y-4 shadow-sm">
            {/* UPI */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-indigo-600 text-2xl">qr_code_2</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Google Pay / PhonePe</h4>
                  <p className="text-xs text-slate-400">adarsh@okaxis</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-emerald-500 font-bold">check_circle</span>
            </div>

            {/* Wallet */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-indigo-600 text-2xl">payments</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">sarthiAi Wallet</h4>
                  <p className="text-xs text-slate-400">Balance: ₹4,850</p>
                </div>
              </div>
              <button className="text-[10px] bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer">
                Top Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing history & Refund status */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">history</span>
          Transaction & Refund History
        </h2>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-400 uppercase text-[10px] tracking-wider font-extrabold border-b border-slate-100 dark:border-slate-700/60">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-sm text-slate-600 dark:text-slate-300">
                {BILLING_HISTORY.map(txn => (
                  <tr key={txn.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-xs">{txn.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-950 dark:text-white">{txn.item}</td>
                    <td className="px-6 py-4 text-xs">{txn.date}</td>
                    <td className="px-6 py-4 font-bold">₹{txn.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">{txn.method}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        txn.status === 'Success' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' :
                        'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
