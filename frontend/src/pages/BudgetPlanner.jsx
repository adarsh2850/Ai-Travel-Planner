import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { name: 'Flights', amount: 12299, color: '#3B82F6', icon: 'flight' },
  { name: 'Stays', amount: 24500, color: '#10B981', icon: 'hotel' },
  { name: 'Dining', amount: 6200, color: '#F59E0B', icon: 'restaurant' },
  { name: 'Activities', amount: 3200, color: '#EC4899', icon: 'sailing' },
  { name: 'Shopping & Misc', amount: 4800, color: '#8B5CF6', icon: 'shopping_bag' },
];

const INITIAL_EXPENSES = [
  { id: 1, title: 'Indigo Flight Ticket', category: 'Flights', amount: 6499, date: 'Dec 12' },
  { id: 2, title: 'Windermere Resort Stay', category: 'Stays', amount: 15000, date: 'Dec 15' },
  { id: 3, title: 'Dinner at Rapsy', category: 'Dining', amount: 1800, date: 'Dec 16' },
  { id: 4, title: 'Scuba Combo Goa', category: 'Activities', amount: 3200, date: 'Dec 13' },
];

export default function BudgetPlanner() {
  const [totalBudget, setTotalBudget] = useState(60000);
  const [categories, setCategories] = useState(CATEGORIES);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [newExpense, setNewExpense] = useState({ title: '', category: 'Dining', amount: '' });
  const [currency, setCurrency] = useState({ from: 'INR', to: 'USD', value: '1', result: '0.012' });

  // Calculate totals
  const totalSpent = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage = Math.min((totalSpent / totalBudget) * 100, 100);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const amountVal = parseFloat(newExpense.amount);
    if (!newExpense.title || isNaN(amountVal)) return;

    // Add to expense list
    const newItem = {
      id: Date.now(),
      title: newExpense.title,
      category: newExpense.category,
      amount: amountVal,
      date: 'Today',
    };
    setExpenses([newItem, ...expenses]);

    // Update category sum
    setCategories(prev => prev.map(cat =>
      cat.name === newExpense.category
        ? { ...cat, amount: cat.amount + amountVal }
        : cat
    ));

    setNewExpense({ title: '', category: 'Dining', amount: '' });
  };

  const handleConvert = (e) => {
    e.preventDefault();
    const fromVal = parseFloat(currency.value);
    if (isNaN(fromVal)) return;
    let rate = 1;
    if (currency.from === 'INR' && currency.to === 'USD') rate = 0.012;
    if (currency.from === 'INR' && currency.to === 'EUR') rate = 0.011;
    if (currency.from === 'USD' && currency.to === 'INR') rate = 83.45;
    if (currency.from === 'EUR' && currency.to === 'INR') rate = 89.80;
    setCurrency({ ...currency, result: (fromVal * rate).toFixed(2) });
  };

  // SVG Donut calculation
  let accumulatedPercent = 0;
  const donutSegments = categories.map(cat => {
    const percent = totalSpent > 0 ? (cat.amount / totalSpent) * 100 : 0;
    const start = accumulatedPercent;
    accumulatedPercent += percent;
    return { ...cat, percent, start };
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Budget Planner
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Monitor your expenses, allocate spending caps, and convert currencies effortlessly.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Total Trip Budget</span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-display">₹{totalBudget.toLocaleString()}</span>
            <button
              onClick={() => {
                const val = prompt('Edit total budget (INR):', totalBudget);
                if (val && !isNaN(val)) setTotalBudget(parseInt(val));
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Total Spent So Far</span>
          <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-display">₹{totalSpent.toLocaleString()}</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Remaining Balance</span>
          <span className={`text-3xl font-black font-display ${remainingBudget >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            ₹{remainingBudget.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Budget Progress Bar */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div className="flex justify-between text-xs font-bold text-slate-500">
          <span>Budget Burn Rate</span>
          <span>{spentPercentage.toFixed(0)}% Spent</span>
        </div>
        <div className="w-full h-4 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${spentPercentage > 90 ? 'bg-red-500' : spentPercentage > 75 ? 'bg-amber-500' : 'bg-indigo-600'}`}
            style={{ width: `${spentPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SVG Chart & Categories Breakdown */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-6 self-start">
            Category Breakdown
          </h3>

          {/* SVG Donut Chart */}
          <div className="relative w-44 h-44 mb-6">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="rgba(226,232,240,0.2)" strokeWidth="3" />
              {donutSegments.map((seg, idx) => {
                const dashArray = `${seg.percent} ${100 - seg.percent}`;
                const dashOffset = 100 - seg.start;
                return (
                  <circle
                    key={idx}
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth="3.2"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    className="transition-all duration-300 hover:stroke-[3.8] cursor-pointer"
                    title={`${seg.name}: ${seg.percent.toFixed(1)}%`}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-extrabold">Burn</span>
              <span className="text-xl font-black text-slate-900 dark:text-white font-display">
                {spentPercentage.toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Category List */}
          <div className="w-full space-y-3">
            {categories.map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="material-symbols-outlined text-sm text-slate-400">{cat.icon}</span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{cat.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  ₹{cat.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses List & Form */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
            Record Expense
          </h3>

          <form onSubmit={handleAddExpense} className="space-y-4">
            <input
              type="text"
              placeholder="e.g. Starbucks at Airport"
              value={newExpense.title}
              onChange={e => setNewExpense({ ...newExpense, title: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                value={newExpense.category}
                onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                className="bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
              >
                {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
              <input
                type="number"
                placeholder="Amount (₹)"
                value={newExpense.amount}
                onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Add Expense
            </button>
          </form>

          {/* Timeline List */}
          <div className="border-t border-slate-100 dark:border-slate-700/60 pt-4 space-y-3 max-h-48 overflow-y-auto pr-1">
            {expenses.map(exp => (
              <div key={exp.id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl text-xs">
                <div>
                  <h4 className="font-bold text-slate-950 dark:text-white">{exp.title}</h4>
                  <p className="text-[10px] text-slate-400">{exp.category} · {exp.date}</p>
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  ₹{exp.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Currency Converter */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
            Currency Converter
          </h3>
          <form onSubmit={handleConvert} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Convert From
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Amount"
                  value={currency.value}
                  onChange={e => setCurrency({ ...currency, value: e.target.value })}
                  className="bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                  required
                />
                <select
                  value={currency.from}
                  onChange={e => setCurrency({ ...currency, from: e.target.value })}
                  className="bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Convert To
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold flex items-center justify-between">
                  {currency.result}
                </div>
                <select
                  value={currency.to}
                  onChange={e => setCurrency({ ...currency, to: e.target.value })}
                  className="bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Convert Now
            </button>
          </form>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl text-[11px] text-slate-400 leading-relaxed">
            Rates are updated hourly. Conversion is estimated based on international interbank rates.
          </div>
        </div>
      </div>
    </div>
  );
}
