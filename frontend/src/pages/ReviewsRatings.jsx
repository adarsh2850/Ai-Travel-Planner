import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_REVIEWS = [
  {
    id: 1,
    author: 'Karan Malhotra',
    avatar: 'K',
    rating: 5,
    destination: 'Munnar, Kerala',
    text: 'Absolutely magical trip! The AI suggested checking in early to see the mist rise over the tea garden, and it was the highlight of our tour. Highly recommend the windermere hotel!',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80',
    date: '2 days ago',
    likes: 24,
  },
  {
    id: 2,
    author: 'Sneha Patel',
    avatar: 'S',
    rating: 4,
    destination: 'Calangute, Goa',
    text: 'The watersports activity booking was super smooth. Scuba diving instructions were clear. Only down-side was the long queue at the beach, but overall an amazing experience.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    date: '1 week ago',
    likes: 12,
  },
];

export default function ReviewsRatings() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [rating, setRating] = useState(5);
  const [destination, setDestination] = useState('');
  const [text, setText] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination || !text) return;
    const newReview = {
      id: Date.now(),
      author: 'Adarsh Sharma',
      avatar: 'A',
      rating,
      destination,
      text,
      image: uploadedImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
      date: 'Just now',
      likes: 0,
    };
    setReviews([newReview, ...reviews]);
    setDestination('');
    setText('');
    setRating(5);
    setUploadedImage(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Reviews & Ratings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Share your travel experiences, upload memories, and see what the community has to say.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Review Form */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-4">
            Write a Review
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Destination */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Destination / Hotel
              </label>
              <input
                type="text"
                placeholder="e.g. Munnar Tea Estate"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Stars */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Rating
              </label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="text-2xl cursor-pointer focus:outline-none transition-transform active:scale-95"
                  >
                    <span
                      className={`material-symbols-outlined text-3xl font-bold ${
                        star <= (hoveredStar || rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                      style={{ fontVariationSettings: star <= (hoveredStar || rating) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text review */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Your Review
              </label>
              <textarea
                placeholder="Describe your itinerary, hotel room, service quality, etc."
                rows="4"
                value={text}
                onChange={e => setText(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                required
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Add Trip Photo
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all hover:bg-indigo-100">
                  <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
                  Choose File
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {uploadedImage && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200">
                    <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-indigo-100 dark:shadow-none hover:shadow-indigo-200 dark:hover:shadow-none flex items-center justify-center gap-1.5 cursor-pointer text-sm"
            >
              <span className="material-symbols-outlined text-sm font-bold">rate_review</span>
              Submit Review
            </button>
          </form>
        </div>

        {/* Community Reviews */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">group</span>
            Community Reviews
          </h2>

          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {reviews.map(rev => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm font-display">
                        {rev.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white leading-snug">{rev.author}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{rev.date}</p>
                      </div>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <span
                          key={s}
                          className={`material-symbols-outlined text-sm ${
                            s <= rev.rating ? 'text-amber-400 fill-current' : 'text-slate-300 dark:text-slate-600'
                          }`}
                          style={{ fontVariationSettings: s <= rev.rating ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Text */}
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-1">
                      {rev.destination}
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {rev.text}
                    </p>
                  </div>

                  {/* Attached photo */}
                  {rev.image && (
                    <div className="rounded-2xl overflow-hidden max-h-56">
                      <img src={rev.image} alt={rev.destination} className="w-full object-cover" />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 pt-3">
                    <button
                      onClick={() => {
                        setReviews(prev => prev.map(r => r.id === rev.id ? { ...r, likes: r.likes + 1 } : r));
                      }}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">thumb_up</span>
                      <span>{rev.likes} Helpful</span>
                    </button>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-xl">
                      Verified Traveler
                    </span>
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
