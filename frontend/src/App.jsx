import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports
import ShaderBackground from './components/ShaderBackground';
import TravelPlannerForm from './components/TravelPlannerForm';
import ItineraryView from './components/ItineraryView';
import AIAssistant from './components/AIAssistant';
import { generateItinerary } from './utils/itineraryGenerator';
import { useAuth } from './context/AuthContext';
import { tripsAPI, imagesAPI } from './utils/api';

// Page imports
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import SavedDestinations from './pages/SavedDestinations';
import Notifications from './pages/Notifications';
import AIRecommendations from './pages/AIRecommendations';
import BookingHistory from './pages/BookingHistory';
import PaymentCenter from './pages/PaymentCenter';
import ReviewsRatings from './pages/ReviewsRatings';
import BudgetPlanner from './pages/BudgetPlanner';
import TravelCalendar from './pages/TravelCalendar';
import TravelJournal from './pages/TravelJournal';
import RewardsLoyalty from './pages/RewardsLoyalty';
import EmergencyAssistance from './pages/EmergencyAssistance';
import SettingsPage from './pages/SettingsPage';
import HelpCenter from './pages/HelpCenter';
import Community from './pages/Community';
import TravelDeals from './pages/TravelDeals';
import CompareDestinations from './pages/CompareDestinations';
import PackingChecklist from './pages/PackingChecklist';
import TravelDocuments from './pages/TravelDocuments';
import NearbyExplorer from './pages/NearbyExplorer';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

// ─── Design tokens (single source of truth) ──────────────────
const T = {
  brand:        '#6366F1',   // indigo-500  — primary accent
  brandDark:    '#4F46E5',   // indigo-600  — hover
  brandLight:   '#EEF2FF',   // indigo-50   — tinted bg
  brandText:    '#ffffff',   // text on brand bg
  teal:         '#14B8A6',
  tealLight:    '#F0FDFA',
  pageBg:       '#F8FAFC',   // slate-50
  cardBg:       '#FFFFFF',
  cardBorder:   '#E2E8F0',   // slate-200
  inputBg:      '#F1F5F9',   // slate-100
  heading:      '#0F172A',   // slate-900
  body:         '#334155',   // slate-700
  muted:        '#94A3B8',   // slate-400
  divider:      '#E2E8F0',
  darkPage:     '#0F172A',   // slate-900
  darkCard:     '#1E293B',   // slate-800
  darkCardBorder:'#334155',  // slate-700
  darkInput:    '#0F172A',
  darkHeading:  '#F1F5F9',
  darkBody:     '#CBD5E1',   // slate-300
  darkMuted:    '#64748B',   // slate-500
  green:        '#10B981',
  greenBg:      '#F0FDF4',
  red:          '#EF4444',
  redBg:        '#FEF2F2',
  amber:        '#F59E0B',
  sans:         "'Inter', sans-serif",
  display:      "'Plus Jakarta Sans', sans-serif",
};

function HomePage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const [isDark, setIsDark]                 = useState(() => localStorage.getItem('sarthiai_dark') === 'true');
  const [searchQuery, setSearchQuery]       = useState('');
  const [isPlannerOpen, setIsPlannerOpen]   = useState(false);
  const [plannerDest, setPlannerDest]       = useState('');
  const [activeItinerary, setActiveItinerary] = useState(null);
  
  // Navigation active tab
  const [activeTab, setActiveTab]           = useState('Discover');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [savedTrips, setSavedTrips]         = useState([]);
  const [tripsLoading, setTripsLoading]     = useState(false);
  const [saveStatus, setSaveStatus]         = useState(null);
  const [userMenuOpen, setUserMenuOpen]     = useState(false);
  const [tripsFilter, setTripsFilter]       = useState('all');
  const [lang, setLang]                     = useState('EN');

  // Derived tokens based on dark/light
  const C = isDark ? {
    page:    T.darkPage,
    card:    T.darkCard,
    border:  T.darkCardBorder,
    input:   T.darkInput,
    h:       T.darkHeading,
    body:    T.darkBody,
    muted:   T.darkMuted,
    navBg:   'rgba(15,23,42,0.92)',
    navBorder:'rgba(255,255,255,0.07)',
    divider: T.darkCardBorder,
    sectionAlt: '#16213E',
  } : {
    page:    T.pageBg,
    card:    T.cardBg,
    border:  T.cardBorder,
    input:   T.inputBg,
    h:       T.heading,
    body:    T.body,
    muted:   T.muted,
    navBg:   'rgba(255,255,255,0.92)',
    navBorder:'rgba(0,0,0,0.07)',
    divider: T.divider,
    sectionAlt: '#F1F5F9',
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
    localStorage.setItem('sarthiai_dark', isDark ? 'true' : 'false');
  }, [isDark]);

  const [openDropdown, setOpenDropdown]     = useState(null);

  useEffect(() => {
    const close = () => {
      setUserMenuOpen(false);
      setOpenDropdown(null);
    };
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const fetchTrips = useCallback(async () => {
    if (!isAuthenticated) return;
    setTripsLoading(true);
    try { setSavedTrips((await tripsAPI.getAll()).data.trips || []); }
    catch (e) { console.error(e); }
    finally { setTripsLoading(false); }
  }, [isAuthenticated]);

  useEffect(() => { if (activeTab === 'My Trips') fetchTrips(); }, [activeTab, fetchTrips]);

  const handleGenerateItinerary = async (params) => {
    const itin = generateItinerary(params);
    
    // Fetch real image from Unsplash via backend
    try {
      const imgRes = await imagesAPI.search(params.destination);
      if (imgRes.data && imgRes.data.url) {
        itin.image = imgRes.data.url;
      }
    } catch (e) {
      console.error('Failed to fetch destination image from Unsplash:', e);
    }

    // Fetch real hotel image from Unsplash via backend
    if (itin.hotel && itin.hotel.name) {
      try {
        const hotelImgRes = await imagesAPI.search(`${itin.hotel.name}, ${params.destination}`);
        if (hotelImgRes.data && hotelImgRes.data.url) {
          itin.hotel.image = hotelImgRes.data.url;
          if (itin.days && itin.days[0] && itin.days[0].activities && itin.days[0].activities[0]) {
            itin.days[0].activities[0].image = hotelImgRes.data.url;
          }
        }
      } catch (e) {
        console.error('Failed to fetch hotel image:', e);
      }
    }

    setActiveItinerary(itin);
    setActiveTab('AI Planner');
    if (isAuthenticated) {
      setSaveStatus('saving');
      try {
        const res = await tripsAPI.save({
          destination: itin.destination, duration: itin.duration, vibe: itin.vibe,
          budget: itin.budget, totalBudget: itin.totalBudget, spentBudget: itin.spentBudget,
          ecoScore: itin.ecoScore, co2Saved: itin.co2Saved, mapUrl: itin.mapUrl,
          image: itin.image, hotel: itin.hotel, days: itin.days
        });
        if (res.data && res.data.trip) {
          setActiveItinerary(res.data.trip);
          setSavedTrips(prev => [res.data.trip, ...prev]);
        }
        setSaveStatus('saved');
      } catch { setSaveStatus('error'); }
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleModifyItinerary = async (mods) => {
    const base = activeItinerary || { destination: 'Agra', duration: 3, vibe: 'Eco-Zen', budget: 'Balanced' };
    const updatedParams = {
      destination: mods.destination || base.destination,
      duration: mods.duration || base.duration,
      vibe: mods.vibe || base.vibe,
      budget: mods.budget || base.budget,
    };
    const itin = generateItinerary(updatedParams);

    try {
      const imgRes = await imagesAPI.search(updatedParams.destination);
      if (imgRes.data && imgRes.data.url) {
        itin.image = imgRes.data.url;
      }
    } catch (e) {
      console.error('Failed to fetch destination image:', e);
    }

    if (itin.hotel && itin.hotel.name) {
      try {
        const hotelImgRes = await imagesAPI.search(`${itin.hotel.name}, ${updatedParams.destination}`);
        if (hotelImgRes.data && hotelImgRes.data.url) {
          itin.hotel.image = hotelImgRes.data.url;
          if (itin.days && itin.days[0] && itin.days[0].activities && itin.days[0].activities[0]) {
            itin.days[0].activities[0].image = hotelImgRes.data.url;
          }
        }
      } catch (e) {
        console.error('Failed to fetch hotel image:', e);
      }
    }
    
    if (isAuthenticated) {
      setSaveStatus('saving');
      try {
        if (base._id) {
          const res = await tripsAPI.update(base._id, {
            destination: itin.destination, duration: itin.duration, vibe: itin.vibe,
            budget: itin.budget, totalBudget: itin.totalBudget, spentBudget: itin.spentBudget,
            ecoScore: itin.ecoScore, co2Saved: itin.co2Saved, mapUrl: itin.mapUrl,
            image: itin.image, hotel: itin.hotel, days: itin.days
          });
          if (res.data && res.data.trip) {
            setActiveItinerary(res.data.trip);
            setSavedTrips(prev => prev.map(t => t._id === base._id ? res.data.trip : t));
          }
        } else {
          const res = await tripsAPI.save({
            destination: itin.destination, duration: itin.duration, vibe: itin.vibe,
            budget: itin.budget, totalBudget: itin.totalBudget, spentBudget: itin.spentBudget,
            ecoScore: itin.ecoScore, co2Saved: itin.co2Saved, mapUrl: itin.mapUrl,
            image: itin.image, hotel: itin.hotel, days: itin.days
          });
          if (res.data && res.data.trip) {
            setActiveItinerary(res.data.trip);
            setSavedTrips(prev => [res.data.trip, ...prev]);
          }
        }
        setSaveStatus('saved');
      } catch {
        setSaveStatus('error');
        setActiveItinerary(itin);
      }
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setActiveItinerary(itin);
    }
    setActiveTab('AI Planner');
  };

  const openPlanner = (dest = '') => { setPlannerDest(dest || searchQuery || 'Agra'); setIsPlannerOpen(true); };

  const loadTrip = (trip) => {
    setActiveItinerary(trip);
    setActiveTab('AI Planner');
  };

  const deleteTrip = async (id, e) => {
    e.stopPropagation();
    try { await tripsAPI.delete(id); setSavedTrips(p => p.filter(t => t._id !== id)); }
    catch (e) { console.error(e); }
  };

  const clearHistory = async () => {
    if (!window.confirm("Are you sure you want to delete your entire trip history? This cannot be undone.")) return;
    try {
      await tripsAPI.clearAll();
      setSavedTrips([]);
      setActiveItinerary(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleBookmark = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await tripsAPI.toggleBookmark(id);
      setSavedTrips(prev => prev.map(t => t._id === id ? { ...t, isBookmarked: res.data.isBookmarked } : t));
      if (activeItinerary && activeItinerary._id === id) {
        setActiveItinerary(prev => ({ ...prev, isBookmarked: res.data.isBookmarked }));
      }
    } catch (err) {
      console.error('Toggle bookmark error:', err);
    }
  };

  const handleUpdateNotes = async (notes) => {
    if (!activeItinerary?._id) return;
    try {
      const res = await tripsAPI.update(activeItinerary._id, { notes });
      if (res.data && res.data.trip) {
        setActiveItinerary(res.data.trip);
        setSavedTrips(prev => prev.map(t => t._id === activeItinerary._id ? res.data.trip : t));
      }
    } catch (err) {
      console.error('Update notes error:', err);
    }
  };

  const handleSaveActiveItinerary = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!activeItinerary) return;
    setSaveStatus('saving');
    try {
      if (activeItinerary._id) {
        const res = await tripsAPI.update(activeItinerary._id, activeItinerary);
        if (res.data && res.data.trip) {
          setActiveItinerary(res.data.trip);
          setSavedTrips(prev => prev.map(t => t._id === activeItinerary._id ? res.data.trip : t));
        }
      } else {
        const res = await tripsAPI.save(activeItinerary);
        if (res.data && res.data.trip) {
          setActiveItinerary(res.data.trip);
          setSavedTrips(prev => [res.data.trip, ...prev]);
        }
      }
      setSaveStatus('saved');
    } catch (err) {
      console.error('Save active itinerary error:', err);
      setSaveStatus('error');
    }
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const displayedTrips = tripsFilter === 'bookmarked'
    ? savedTrips.filter(t => t.isBookmarked)
    : savedTrips;

  // Navigation Dropdown Groups
  const navDropdowns = [
    {
      id: 'explore',
      label: 'Explore',
      icon: 'explore',
      items: [
        { id: 'Dashboard', label: 'Dashboard', desc: 'Active bookings & stats', icon: 'grid_view' },
        { id: 'AI Planner', label: 'AI Planner', desc: 'Curate custom itineraries', icon: 'auto_awesome' },
        { id: 'Nearby Explorer', label: 'Nearby Places', desc: 'Local cafes, ATMs & sights', icon: 'pin_drop' }
      ]
    },
    {
      id: 'trips',
      label: 'Trips',
      icon: 'map',
      items: [
        { id: 'My Trips', label: 'My Trips', desc: 'Planned and past itineraries', icon: 'map' },
        { id: 'Saved', label: 'Saved Wishlist', desc: 'Favorite places & budgets', icon: 'bookmark' },
        { id: 'AI Recommendations', label: 'AI Match Recs', desc: 'Curation score fits', icon: 'recommend' },
        { id: 'Booking History', label: 'Bookings History', desc: 'PDF invoices & vouchers', icon: 'history' }
      ]
    },
    {
      id: 'tools',
      label: 'Planning Tools',
      icon: 'payments',
      items: [
        { id: 'Budget Planner', label: 'Budget Planner', desc: 'Expense burner & daily log', icon: 'payments' },
        { id: 'Calendar', label: 'Travel Calendar', desc: 'Monthly activity timeline', icon: 'calendar_month' },
        { id: 'Documents', label: 'Documents Vault', desc: 'Passport PDFs & visas', icon: 'description' },
        { id: 'Journal', label: 'Travel Journal', desc: 'Diary & photo coordinates', icon: 'menu_book' }
      ]
    },
    {
      id: 'more',
      label: 'Community & Support',
      icon: 'more_horiz',
      items: [
        { id: 'Community', label: 'Social Feed', desc: 'Stories & community reviews', icon: 'group' },
        { id: 'Travel Deals', label: 'Travel Deals', desc: 'Flash sales & coupon codes', icon: 'local_offer' },
        { id: 'Settings', label: 'Settings', desc: 'Preferences & theme toggles', icon: 'settings' },
        { id: 'Help Center', label: 'Help Center', desc: 'AI agent customer support', icon: 'help' },
        { id: 'Emergency SOS', label: 'EMERGENCY SOS', desc: 'Embassy contact & hospitals', icon: 'emergency', highlight: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col transition-colors duration-300">

      {/* ════════════════ TOP NAVBAR ════════════════ */}
      <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between px-6 shadow-sm">
        
        {/* Left section: Hamburger / Logo / Dropdowns */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-550 dark:text-slate-350 cursor-pointer flex items-center"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setActiveTab('Discover')}>
            <span className="material-symbols-outlined leading-none text-indigo-500 font-extrabold" style={{ fontSize: 24 }}>explore</span>
            <span className="font-display font-extrabold text-md bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent mr-2">
              sarthiAi
            </span>
          </div>

          {/* Desktop Navigation Dropdowns */}
          <nav className="hidden md:flex items-center gap-2">
            {/* Standalone Home button */}
            <button
              onClick={() => setActiveTab('Discover')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer select-none ${
                activeTab === 'Discover'
                  ? 'bg-indigo-55 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60'
              }`}
            >
              <span className="material-symbols-outlined text-base leading-none">explore</span>
              <span>Home</span>
            </button>

            {navDropdowns.map(dropdown => {
              const isOpen = openDropdown === dropdown.id;
              const hasActive = dropdown.items.some(item => activeTab === item.id);
              return (
                <div key={dropdown.id} className="relative">
                  <button
                    onClick={e => { e.stopPropagation(); setOpenDropdown(isOpen ? null : dropdown.id); }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer select-none ${
                      hasActive 
                        ? 'bg-indigo-55 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base leading-none">{dropdown.icon}</span>
                    <span>{dropdown.label}</span>
                    <span className="material-symbols-outlined text-xs leading-none text-slate-400">expand_more</span>
                  </button>

                  {/* Dropdown panel */}
                  {isOpen && (
                    <div 
                      onClick={e => e.stopPropagation()}
                      className="absolute left-0 mt-2.5 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl z-50 p-2 space-y-0.5 animate-fadeIn"
                    >
                      {dropdown.items.map(item => {
                        const active = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setOpenDropdown(null); }}
                            className={`w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer ${
                              active
                                ? 'bg-indigo-50 dark:bg-indigo-950/40'
                                : item.highlight
                                  ? 'hover:bg-red-50 dark:hover:bg-red-950/20'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-900/40'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              active
                                ? 'bg-indigo-600 text-white'
                                : item.highlight
                                  ? 'bg-red-100 text-red-650 dark:bg-red-950/40 dark:text-red-400'
                                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400'
                            }`}>
                              <span className="material-symbols-outlined text-base leading-none">{item.icon}</span>
                            </div>
                            <div className="min-w-0">
                              <p className={`text-xs font-bold leading-none ${
                                item.highlight ? 'text-red-650 dark:text-red-400' : 'text-slate-900 dark:text-white'
                              }`}>
                                {item.label}
                              </p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate">
                                {item.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right widgets */}
        <div className="flex items-center gap-3">
          {/* Search bar inside header right */}
          <div className="hidden sm:flex bg-slate-100 dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-full py-1.5 px-3 items-center gap-2 w-full max-w-[180px] shadow-inner">
            <span className="material-symbols-outlined text-slate-400 text-base">search</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && openPlanner()}
              className="bg-transparent border-none outline-none text-xs text-slate-800 dark:text-white w-full placeholder-slate-400"
            />
          </div>

          {/* Save toast */}
            {saveStatus && (
              <div className={`hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                saveStatus === 'saving' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20' :
                saveStatus === 'saved' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' : 'bg-red-50 text-red-600'
              }`}>
                {saveStatus === 'saving' && <span className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />}
                {saveStatus === 'saved' && <span className="material-symbols-outlined text-xs leading-none">check_circle</span>}
                <span>{saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Error'}</span>
              </div>
            )}

            {/* Language Switcher */}
            <select
              value={lang}
              onChange={e => setLang(e.target.value)}
              className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white px-2 py-1 rounded-lg text-[10px] font-bold border-none outline-none cursor-pointer"
            >
              <option value="EN">EN</option>
              <option value="HI">HI</option>
              <option value="ES">ES</option>
            </select>

            {/* Notification triggers */}
            <button 
              onClick={() => setActiveTab('Notifications')}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-base">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            </button>

            {/* Dark mode switcher */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
              title="Toggle Dark Mode"
            >
              <span className="material-symbols-outlined text-base">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Auth Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={e => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
                  className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 px-2 py-1.5 rounded-full cursor-pointer border border-transparent dark:border-slate-800"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-extrabold text-[10px] font-display">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                  <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-10 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg overflow-hidden py-1 z-[70]">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                    </div>
                    <button 
                      onClick={() => { setActiveTab('Profile'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-250 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base text-indigo-500">person</span>
                      My Profile
                    </button>
                    <button 
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </header>

        {/* ════════════════ PAGE CONTAINER ════════════════ */}
        <main className="flex-1 overflow-y-auto relative min-h-[500px]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="w-full h-full"
            >
              
              {/* Discover/Explore Page */}
              {activeTab === 'Discover' && (
                <>
                  <section className="relative overflow-hidden min-h-[420px] flex items-center">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <ShaderBackground isDark={isDark} />
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto text-center px-6 py-12">
                      <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 px-3.5 py-1.5 rounded-full mb-6 shadow-sm">
                        <span className="material-symbols-outlined text-indigo-500 text-xs font-bold">auto_awesome</span>
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-extrabold uppercase tracking-wider">
                          sarthiAi Curation Active
                        </span>
                      </div>
                      <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-slate-950 dark:text-white leading-tight">
                        Map Your Next <span className="bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent">Adventure</span>
                      </h1>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed max-w-md mx-auto">
                        Experience intelligent, bespoke travel planner itineraries optimized with weather radars and budget caps.
                      </p>
                      
                      {/* Search Bar */}
                      <div className="mt-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-2 rounded-full shadow-md max-w-md mx-auto flex items-center">
                        <span className="material-symbols-outlined text-slate-400 px-2.5">pin_drop</span>
                        <input
                          type="text"
                          placeholder="Where do you want to travel?"
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && openPlanner()}
                          className="w-full bg-transparent border-none outline-none text-xs text-slate-800 dark:text-white"
                        />
                        <button
                          onClick={() => openPlanner()}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-full cursor-pointer shadow-md flex items-center gap-1 flex-shrink-0"
                        >
                          Plan
                          <span className="material-symbols-outlined text-sm font-bold">auto_awesome</span>
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Trending segment */}
                  <section className="px-6 pb-16 max-w-6xl mx-auto">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                          Trending Hotspots
                        </h2>
                        <p className="text-xs text-slate-400">Handpicked popular weekend destinations.</p>
                      </div>
                      <button 
                        onClick={() => openPlanner('Munnar')}
                        className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        Explore all
                        <span className="material-symbols-outlined text-xs leading-none">arrow_forward</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                      {[
                        { name: 'Agra Fort', tag: 'Culture', dest: 'Agra', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80', cls: 'md:col-span-2' },
                        { name: 'Goa Beaches', tag: 'Nightlife', dest: 'Goa', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', cls: 'md:col-span-2' },
                        { name: 'Jaipur Forts', tag: 'Heritage', dest: 'Jaipur', img: 'https://images.unsplash.com/photo-1477584308802-e9c3788ee417?w=800&q=80', cls: 'md:col-span-2' },
                        { name: 'Munnar Hills', tag: 'Tea Fields', dest: 'Munnar', img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80', cls: 'md:col-span-2' }
                      ].map(hot => (
                        <div
                          key={hot.name}
                          onClick={() => openPlanner(hot.dest)}
                          className={`h-48 rounded-[28px] overflow-hidden relative group cursor-pointer shadow-sm ${hot.cls}`}
                        >
                          <img
                            src={hot.img}
                            alt={hot.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full block w-fit mb-1.5">
                              {hot.tag}
                            </span>
                            <h4 className="text-white text-md font-black font-display leading-none">
                              {hot.name}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {/* Other Active Tabs */}
              {activeTab === 'Dashboard' && (
                <div className="space-y-6">
                  <Dashboard user={user} activeItinerary={activeItinerary} onTabChange={setActiveTab} />
                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6">
                    <AnalyticsDashboard />
                  </div>
                </div>
              )}

              {activeTab === 'AI Planner' && (
                <div className="p-6 max-w-6xl mx-auto">
                  {activeItinerary ? (
                    <ItineraryView
                      itinerary={activeItinerary}
                      onEdit={() => openPlanner(activeItinerary.destination)}
                      onSave={handleSaveActiveItinerary}
                      onUpdateNotes={handleUpdateNotes}
                    />
                  ) : (
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center shadow-sm max-w-md mx-auto my-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-3xl font-bold">auto_awesome</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                        No Active Itinerary
                      </h3>
                      <p className="text-xs text-slate-450 leading-relaxed">
                        Input a destination search above or trigger the planner form to create a custom AI journey.
                      </p>
                      <button
                        onClick={() => openPlanner('')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md inline-flex items-center gap-1"
                      >
                        Create Plan
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Nearby Explorer' && <NearbyExplorer destination={activeItinerary?.destination} />}
              {activeTab === 'My Trips' && (
                <section className="p-6 max-w-5xl mx-auto">
                  <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
                    <div>
                      <h2 className="text-2xl font-black font-display text-slate-950 dark:text-white">
                        My Saved Journeys
                      </h2>
                      <p className="text-xs text-slate-400">All your active and completed AI itineraries.</p>
                    </div>
                    {isAuthenticated && savedTrips.length > 0 && (
                      <button
                        onClick={clearHistory}
                        className="text-xs text-red-500 border border-red-200 dark:border-red-950 px-3.5 py-2 rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                      >
                        Wipe History
                      </button>
                    )}
                  </div>

                  {!isAuthenticated ? (
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-10 text-center shadow-sm max-w-sm mx-auto my-12">
                      <span className="material-symbols-outlined text-4xl text-slate-350 mb-3 block">lock</span>
                      <h3 className="text-md font-bold text-slate-900 dark:text-white font-display">Sign in required</h3>
                      <p className="text-xs text-slate-400 mt-1 mb-6">Login to save and sync your travel calendars.</p>
                      <button onClick={() => navigate('/login')} className="bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer">
                        Login Now
                      </button>
                    </div>
                  ) : tripsLoading ? (
                    <div className="flex flex-col items-center gap-3 py-16">
                      <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin" />
                      <span className="text-xs text-slate-400 font-bold">Syncing data...</span>
                    </div>
                  ) : savedTrips.length === 0 ? (
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center shadow-sm max-w-md mx-auto my-12 space-y-4">
                      <span className="material-symbols-outlined text-4xl text-slate-300 block">luggage</span>
                      <h3 className="text-md font-bold text-slate-900 dark:text-white font-display">No trips planned yet</h3>
                      <p className="text-xs text-slate-400">Launch a search above to generate your first adventure.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {displayedTrips.map(trip => (
                        <div
                          key={trip._id}
                          onClick={() => loadTrip(trip)}
                          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="h-44 relative bg-slate-100">
                            <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <button
                              onClick={e => deleteTrip(trip._id, e)}
                              className="absolute top-3 right-3 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md"
                            >
                              <span className="material-symbols-outlined text-sm font-bold">delete</span>
                            </button>
                            <button
                              onClick={e => handleToggleBookmark(trip._id, e)}
                              className={`absolute top-3 right-12 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md ${
                                trip.isBookmarked ? 'bg-amber-500 text-white' : 'bg-white text-slate-500'
                              }`}
                            >
                              <span className="material-symbols-outlined text-sm font-bold">bookmark</span>
                            </button>
                          </div>
                          <div className="p-5 flex justify-between items-center">
                            <div>
                              <h3 className="font-bold text-slate-900 dark:text-white font-display text-base leading-none">
                                {trip.destination}
                              </h3>
                              <span className="text-[10px] text-slate-400 mt-1 block">
                                {trip.duration} Days · {trip.vibe} Vibe
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[8px] uppercase tracking-wider text-slate-450 block font-semibold">Total Cost</span>
                              <span className="font-black text-indigo-600 dark:text-indigo-400 font-display text-md">
                                ₹{trip.spentBudget?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Custom tabs mapping to newly created premium subpages */}
              {activeTab === 'Saved' && <SavedDestinations onStartPlan={openPlanner} />}
              {activeTab === 'AI Recommendations' && <AIRecommendations onStartPlan={openPlanner} />}
              {activeTab === 'Budget Planner' && (
                <div className="space-y-6">
                  <BudgetPlanner />
                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6">
                    <PaymentCenter />
                  </div>
                </div>
              )}
              {activeTab === 'Booking History' && <BookingHistory />}
              {activeTab === 'Calendar' && <TravelCalendar />}
              {activeTab === 'Community' && (
                <div className="space-y-6">
                  <Community />
                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6">
                    <ReviewsRatings />
                  </div>
                </div>
              )}
              {activeTab === 'Travel Deals' && <TravelDeals />}
              {activeTab === 'Documents' && (
                <div className="space-y-6">
                  <TravelDocuments />
                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6">
                    <PackingChecklist />
                  </div>
                </div>
              )}
              {activeTab === 'Journal' && <TravelJournal />}
              {activeTab === 'Notifications' && <Notifications />}
              {activeTab === 'Profile' && isAuthenticated && <Profile onTabChange={setActiveTab} />}
              {activeTab === 'Settings' && (
                <SettingsPage
                  isDark={isDark}
                  onToggleDark={() => setIsDark(!isDark)}
                />
              )}
              {activeTab === 'Help Center' && <HelpCenter />}
              
              {/* EmergencySOS tab mapping */}
              {activeTab === 'Emergency SOS' && <EmergencyAssistance />}

            </motion.div>
          </AnimatePresence>

        </main>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer className="bg-slate-950 text-slate-500 py-10 px-6 border-t border-slate-900 text-center text-xs">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setActiveTab('Discover')}>
              <span className="material-symbols-outlined text-slate-450 leading-none" style={{ fontSize: 20 }}>explore</span>
              <span className="font-display font-extrabold text-sm text-white">sarthiAi</span>
            </div>
            <p className="font-sans">
              © 2026 sarthiAi. Custom luxury and eco-friendly smart curation.
            </p>
            <div className="flex gap-4 font-bold text-slate-400">
              <button onClick={() => setActiveTab('Help Center')} className="hover:text-white cursor-pointer">Support</button>
              <button onClick={() => setActiveTab('Settings')} className="hover:text-white cursor-pointer">Privacy</button>
            </div>
          </div>
        </footer>

      {/* ════════════════ MOBILE NAVIGATION DRAWER ════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-slate-800 shadow-xl flex flex-col justify-between md:hidden"
            >
              <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-slate-700/60">
                  <div className="flex items-center gap-2" onClick={() => { setActiveTab('Discover'); setMobileMenuOpen(false); }}>
                    <span className="material-symbols-outlined text-indigo-500" style={{ fontSize: 22 }}>explore</span>
                    <span className="font-display font-extrabold text-sm bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent">
                      sarthiAi
                    </span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 cursor-pointer">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
                  {/* Standalone Mobile Home Button */}
                  <div className="space-y-1">
                    <button
                      onClick={() => { setActiveTab('Discover'); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'Discover'
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg leading-none">explore</span>
                      <span>Home</span>
                    </button>
                  </div>

                  {navDropdowns.map(group => (
                    <div key={group.id} className="space-y-1">
                      <p className="px-3 text-[9px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1.5 select-none">
                        {group.label}
                      </p>
                      {group.items.map(item => {
                        const active = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              active
                                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                            }`}
                          >
                            <span className="material-symbols-outlined text-lg leading-none">{item.icon}</span>
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </nav>
              </div>

              <div className="p-3 border-t border-slate-100 dark:border-slate-700/60">
                <button 
                  onClick={() => { setActiveTab('Emergency SOS'); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  <span className="material-symbols-outlined text-lg leading-none">emergency</span>
                  <span>EMERGENCY SOS</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating AI Chat Assistant widget */}
      <AIAssistant currentItinerary={activeItinerary} onModifyItinerary={handleModifyItinerary} />
      
      {/* Travel planner form dialog modal */}
      <TravelPlannerForm 
        isOpen={isPlannerOpen} 
        onClose={() => setIsPlannerOpen(false)}
        initialDestination={plannerDest} 
        onGenerate={handleGenerateItinerary} 
      />

    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login"  element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/"       element={<HomePage />} />
      <Route path="*"       element={<Navigate to="/" replace />} />
    </Routes>
  );
}
