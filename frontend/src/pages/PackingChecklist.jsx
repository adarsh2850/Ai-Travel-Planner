import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESETS = {
  Beach: [
    { item: 'Swimwear & Shorts', category: 'Clothes', checked: false },
    { item: 'Sunscreen SPF 50', category: 'Accessories', checked: false },
    { item: 'Sunglasses', category: 'Accessories', checked: false },
    { item: 'Waterproof Phone Pouch', category: 'Electronics', checked: false },
    { item: 'Flip Flops', text: 'Clothes', category: 'Clothes', checked: false },
  ],
  Mountain: [
    { item: 'Thermal Innerwear', category: 'Clothes', checked: false },
    { item: 'Heavy Jacket / Parka', category: 'Clothes', checked: false },
    { item: 'Trekking Boots', category: 'Clothes', checked: false },
    { item: 'Moisturizer & Lip Balm', category: 'Accessories', checked: false },
    { item: 'Powerbank 20000mAh', category: 'Electronics', checked: false },
    { item: 'First-Aid & Altitude Meds', category: 'Medicines', checked: false },
  ],
  Standard: [
    { item: 'Passport & Photocopies', category: 'Documents', checked: false },
    { item: 'Toothbrush & Grooming Kit', category: 'Accessories', checked: false },
    { item: 'Phone Charger', category: 'Electronics', checked: false },
    { item: 'Basic Painkillers & Bandages', category: 'Medicines', checked: false },
    { item: 'Credit Cards & Cash', category: 'Documents', checked: false },
  ]
};

export default function PackingChecklist() {
  const [checklist, setChecklist] = useState([...PRESETS.Standard]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState('Clothes');

  const toggleCheck = (idx) => {
    setChecklist(prev => prev.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemName) return;
    setChecklist([...checklist, { item: newItemName, category: newItemCat, checked: false }]);
    setNewItemName('');
  };

  const applyPreset = (type) => {
    setChecklist([...PRESETS.Standard, ...PRESETS[type]]);
  };

  const deleteItem = (idx) => {
    setChecklist(prev => prev.filter((_, i) => i !== idx));
  };

  const clearCompleted = () => {
    setChecklist(prev => prev.filter(item => !item.checked));
  };

  // Progress metrics
  const total = checklist.length;
  const completed = checklist.filter(i => i.checked).length;
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Packing Checklist
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Interactive lists grouped by type. Generate presets based on your trip vibe.
        </p>
      </div>

      {/* Preset and Progress Header */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Load Preset List
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyPreset('Beach')}
                className="bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-900/40 text-sky-600 dark:text-sky-400 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">beach_access</span>
                Beach Vibe
              </button>
              <button
                onClick={() => applyPreset('Mountain')}
                className="bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">landscape</span>
                Mountain Vibe
              </button>
            </div>
          </div>
          {total > 0 && (
            <button
              onClick={clearCompleted}
              className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              Clear Checked Items
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 border-t border-slate-100 dark:border-slate-700/60 pt-4">
          <div className="flex justify-between text-xs font-bold text-slate-500">
            <span>Packing Progress</span>
            <span>{completed} / {total} Items Checked ({progressPercent.toFixed(0)}%)</span>
          </div>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Packing List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">check_box</span>
            Checklist Items
          </h3>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-3">
            {total === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">shopping_bag</span>
                <p className="text-xs">Your packing list is empty. Add custom items or load a preset above.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-700/40 max-h-96 overflow-y-auto pr-1">
                {checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 group">
                    <button
                      onClick={() => toggleCheck(idx)}
                      className="flex items-center gap-3 cursor-pointer text-left focus:outline-none"
                    >
                      <span className={`material-symbols-outlined text-lg font-bold ${item.checked ? 'text-indigo-600' : 'text-slate-350 dark:text-slate-650'}`}>
                        {item.checked ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                      <div>
                        <span className={`text-xs font-semibold ${item.checked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                          {item.item}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold block mt-0.5">
                          {item.category}
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => deleteItem(idx)}
                      className="text-slate-400 hover:text-red-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add custom item form */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-4">
            Add Custom Item
          </h3>
          <form onSubmit={addItem} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Item Name
              </label>
              <input
                type="text"
                placeholder="e.g. Swim Fins, Sunglasses"
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Category Group
              </label>
              <select
                value={newItemCat}
                onChange={e => setNewItemCat(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
              >
                {['Clothes', 'Electronics', 'Medicines', 'Documents', 'Accessories'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Add to Checklist
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
