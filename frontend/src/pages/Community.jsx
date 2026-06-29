import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORIES = [
  { id: 1, name: 'Ananya', avatar: 'A', border: 'border-pink-500' },
  { id: 2, name: 'Vikram', avatar: 'V', border: 'border-indigo-500' },
  { id: 3, name: 'Rohan', avatar: 'R', border: 'border-teal-500' },
  { id: 4, name: 'Priya', avatar: 'P', border: 'border-amber-500' },
];

const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Vikram Singh',
    avatar: 'V',
    handle: '@vik_nomad',
    location: 'Leh Ladakh',
    time: '2 hours ago',
    text: 'Conquered Khardung La pass today! It was freezing, but the view of the snow-clad peaks makes every single turn worth it. Biking here is a bucket list goal achieved.',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80',
    likes: 142,
    comments: 28,
    isLiked: false,
    isFollowing: false,
  },
  {
    id: 2,
    author: 'Ananya Rao',
    avatar: 'A',
    handle: '@ananya_travels',
    location: 'Alleppey, Kerala',
    time: '5 hours ago',
    text: 'Cruising through the silent backwaters of Kumarakom. This is our second day in the houseboat and we just had freshly caught pearl spot fish cooked in Keralan spices. Highly recommend local dining.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    likes: 98,
    comments: 14,
    isLiked: true,
    isFollowing: true,
  },
];

export default function Community() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const [uploadedImg, setUploadedImg] = useState(null);

  const handleLike = (id) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked,
        };
      }
      return p;
    }));
  };

  const handleFollow = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, isFollowing: !p.isFollowing } : p));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedImg(URL.createObjectURL(file));
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newPostText) return;

    const post = {
      id: Date.now(),
      author: 'Adarsh Sharma',
      avatar: 'A',
      handle: '@adarsh_s',
      location: postLocation || 'Everywhere',
      time: 'Just now',
      text: newPostText,
      image: uploadedImg || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
      likes: 0,
      comments: 0,
      isLiked: false,
      isFollowing: false,
    };

    setPosts([post, ...posts]);
    setNewPostText('');
    setPostLocation('');
    setUploadedImg(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Traveler Community
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Share your journey updates, post destination snapshots, and follow global explorers.
        </p>
      </div>

      {/* Stories Bubbles */}
      <div className="flex gap-4 overflow-x-auto pb-2 pr-1">
        <div className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0">
          <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-350 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
            <span className="material-symbols-outlined text-slate-400">add</span>
          </div>
          <span className="text-[10px] font-bold text-slate-450">My Story</span>
        </div>
        {STORIES.map(st => (
          <div key={st.id} className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0">
            <div className={`w-14 h-14 rounded-full border-2 ${st.border} bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm font-display`}>
              {st.avatar}
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{st.name}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Creator Box */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
            <form onSubmit={handleSubmitPost} className="space-y-3">
              <textarea
                placeholder="Where are you traveling today? Share details, dining discoveries..."
                rows="3"
                value={newPostText}
                onChange={e => setNewPostText(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                required
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3.5 py-2 rounded-xl text-[10px] font-bold cursor-pointer transition-all hover:bg-indigo-100">
                    <span className="material-symbols-outlined text-sm">image</span>
                    Add Photo
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <input
                    type="text"
                    placeholder="Location (optional)"
                    value={postLocation}
                    onChange={e => setPostLocation(e.target.value)}
                    className="bg-slate-55 dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] focus:outline-none w-36"
                  />
                </div>
                {uploadedImg && (
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200">
                    <img src={uploadedImg} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Post
                </button>
              </div>
            </form>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {posts.map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm"
                >
                  {/* Card Header */}
                  <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold font-display shadow-sm">
                        {post.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-bold text-slate-900 dark:text-white leading-none text-sm">
                            {post.author}
                          </h4>
                          <span className="text-slate-400 text-xs">{post.handle}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                          <span className="material-symbols-outlined text-[12px]">pin_drop</span>
                          <span>{post.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-400">{post.time}</span>
                      {post.author !== 'Adarsh Sharma' && (
                        <button
                          onClick={() => handleFollow(post.id)}
                          className={`text-[10px] font-bold px-3 py-1 rounded-xl transition-all cursor-pointer ${
                            post.isFollowing
                              ? 'bg-slate-100 dark:bg-slate-900 text-slate-500 border border-transparent'
                              : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/60'
                          }`}
                        >
                          {post.isFollowing ? 'Following' : 'Follow'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                      {post.text}
                    </p>

                    {/* Image */}
                    {post.image && (
                      <div className="rounded-2xl overflow-hidden max-h-96 bg-slate-100">
                        <img src={post.image} alt={post.location} className="w-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-slate-450">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                        post.isLiked ? 'text-pink-600 dark:text-pink-400' : 'hover:text-slate-800'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-base ${post.isLiked ? 'fill-current' : ''}`}>
                        favorite
                      </span>
                      <span>{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-1.5 hover:text-slate-800 cursor-pointer">
                      <span className="material-symbols-outlined text-base">forum</span>
                      <span>{post.comments} Comments</span>
                    </button>

                    <button className="flex items-center gap-1.5 hover:text-slate-800 cursor-pointer">
                      <span className="material-symbols-outlined text-base">share</span>
                      <span>Share</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar suggestions */}
        <div className="space-y-6">
          {/* Top Travelers */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-slate-900 dark:text-white font-display">
              Trending Travelers
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Sameer Sen', handle: '@sam_skies', trips: 18, av: 'S' },
                { name: 'Kavita Roy', handle: '@kavita_r', trips: 24, av: 'K' },
              ].map((trav, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold font-display">
                      {trav.av}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-950 dark:text-white">{trav.name}</h4>
                      <p className="text-[10px] text-slate-400">{trav.handle} · {trav.trips} trips</p>
                    </div>
                  </div>
                  <button className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg cursor-pointer">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
