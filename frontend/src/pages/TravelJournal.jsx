import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_ENTRIES = [
  {
    id: 1,
    title: 'Morning mist at Lock-heart Gap',
    location: 'Munnar, Kerala',
    date: 'Dec 16, 2026',
    entry: 'Woke up at 5:30 AM to catch the sunrise. The mist was thick, and as the sun broke through, the entire tea valley glowed gold. Truly a magical sight.',
    photo: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    tags: ['Sunrise', 'Misty Hills', 'Tea Garden'],
  },
  {
    id: 2,
    title: 'Anjuna Beach Sunset Drums',
    location: 'Goa, India',
    date: 'Dec 13, 2026',
    entry: 'Sat with a group of drum players at Anjuna. The sunset was fiery orange and pink. Drank fresh coconut water and danced along. Pure freedom.',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    tags: ['Beaches', 'Sunset', 'Drums'],
  },
];

export default function TravelJournal() {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [entry, setEntry] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !entry) return;

    const newEntry = {
      id: Date.now(),
      title,
      location: location || 'Unknown Location',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      entry,
      photo: uploadedPhoto || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
      tags: tagsInput ? tagsInput.split(',').map(t => t.trim()) : ['Memory'],
    };

    setEntries([newEntry, ...entries]);
    setTitle('');
    setLocation('');
    setEntry('');
    setTagsInput('');
    setUploadedPhoto(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Travel Journal
          <span className="material-symbols-outlined text-indigo-600 ml-2 align-middle text-2xl">menu_book</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Record your thoughts, upload scenic photos and videos, tag locations, and share links to your travel blog.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Entry Creator Form */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-4">
            New Journal Entry
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="e.g. Breathtaking Sunrise Trek"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Munnar, Kerala"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Write Diary Note
              </label>
              <textarea
                placeholder="Write your day’s story, food details, local feelings..."
                rows="5"
                value={entry}
                onChange={e => setEntry(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Trekking, Sunrise, Tea"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Memory Photo / Video
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all hover:bg-indigo-100">
                  <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
                  Attach File
                  <input type="file" accept="image/*,video/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                {uploadedPhoto && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200">
                    <img src={uploadedPhoto} alt="Upload Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Post to Journal
            </button>
          </form>
        </div>

        {/* Journal Entries List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">history_edu</span>
            My Memories
          </h2>

          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {entries.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition-all duration-200"
                >
                  {/* Photo Column */}
                  {item.photo && (
                    <div className="w-full md:w-56 h-48 md:h-auto flex-shrink-0 relative">
                      <img src={item.photo} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
                    </div>
                  )}

                  {/* Text Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                          <span className="material-symbols-outlined text-sm">pin_drop</span>
                          <span>{item.location}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">{item.date}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                        {item.entry}
                      </p>
                    </div>

                    {/* Tags & share */}
                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 pt-3 flex-wrap gap-2">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(t => (
                          <span key={t} className="bg-slate-50 dark:bg-slate-900 text-[10px] px-2.5 py-0.5 rounded-full text-slate-500 dark:text-slate-400 font-semibold">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Journal Link copied to clipboard!');
                        }}
                        className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-xs font-bold cursor-pointer"
                        title="Share post"
                      >
                        <span className="material-symbols-outlined text-sm">share</span>
                        Share
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
