import { useState, useEffect } from 'react';

// ── Design tokens ──────────────────────────────────────────────
const T = {
  brand:      '#6366F1',
  brandDark:  '#4F46E5',
  brandLight: '#EEF2FF',
  teal:       '#14B8A6',
  sans:       "'Inter', sans-serif",
  display:    "'Plus Jakarta Sans', sans-serif",
};

// Trending itinerary cards shown at the bottom of the page
const TRENDING = [
  {
    title: 'Royal Rajasthan Heritage',
    subtitle: 'Explore the majestic forts, historic palaces, and colorful bazaars of Jaipur.',
    tag: 'Most Popular',
    tagColor: '#F59E0B',
    dest: 'Jaipur',
    vibe: 'Vibrant Culture',
    img: 'https://images.unsplash.com/photo-1477584308802-e9c3788ee417?w=800&q=80',
    duration: 7,
    budget: 'Premium',
  },
  {
    title: 'Kerala Tea Gardens Zen',
    subtitle: 'Find inner peace in the misty green tea estates and peaceful backwaters of Munnar.',
    tag: 'Eco-Zen',
    tagColor: '#10B981',
    dest: 'Munnar',
    vibe: 'Eco-Zen',
    img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    duration: 5,
    budget: 'Balanced',
  },
];

const GENERATION_STEPS = [
  'Initializing Intelligent Curation Engine...',
  'Analyzing accommodation partners...',
  'Pathfinding low-carbon transit routes...',
  'Verifying local dining scores...',
  'Synthesizing personalized daily timeline...',
  'Securing exclusive experiences...',
];

// ── Hoisted helpers — defined outside component so React never remounts them ──

function Label({ children }) {
  return (
    <p style={{ fontFamily: T.sans, fontWeight: 700, fontSize: 13,
      color: '#334155', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {children}
    </p>
  );
}

function PlannerInput({ icon, ...props }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10,
      background: '#F1F5F9', border: '1.5px solid #E2E8F0', borderRadius: 14,
      padding: '11px 14px', transition: 'border-color 0.2s' }}>
      {icon && <span className="material-symbols-outlined leading-none" style={{ fontSize: 18, color: '#94A3B8' }}>{icon}</span>}
      <input {...props} style={{ flex: 1, background: 'none', border: 'none', outline: 'none',
        fontFamily: T.sans, fontSize: 14, color: '#0F172A', ...props.style }} />
    </div>
  );
}

function Chip({ label, icon, active, onClick, color }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '7px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
      fontFamily: T.sans, fontSize: 13, fontWeight: 600,
      background: active ? (color || T.brand) : '#F1F5F9',
      color: active ? '#fff' : '#475569',
      transition: 'all 0.15s',
    }}>
      {icon && <span className="material-symbols-outlined leading-none" style={{ fontSize: 15 }}>{icon}</span>}
      {label}
    </button>
  );
}

export default function TravelPlannerForm({ isOpen, onClose, initialDestination, onGenerate }) {
  const [destination, setDestination] = useState(initialDestination || '');
  const [startDate, setStartDate]     = useState('');
  const [endDate, setEndDate]         = useState('');
  const [budget, setBudget]           = useState(80000);
  const [travelers, setTravelers]     = useState(2);
  const [travelerType, setTravelerType] = useState('Couple');
  const [interests, setInterests]     = useState(['Beach']);
  const [weatherPref, setWeatherPref] = useState('Sunny');
  const [travelStyle, setTravelStyle] = useState('Balanced');
  const [vibe, setVibe]               = useState('Eco-Zen');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep]         = useState(0);

  // Sync destination when reopened
  useEffect(() => {
    if (isOpen && initialDestination) setDestination(initialDestination);
  }, [isOpen, initialDestination]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  // Derived duration from dates
  const getDuration = () => {
    if (startDate && endDate) {
      const diff = Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000);
      return diff > 0 ? diff : 1;
    }
    return 3;
  };

  const toggleInterest = (item) => {
    setInterests(p => p.includes(item) ? p.filter(i => i !== item) : [...p, item]);
  };

  const handleGenerate = () => {
    if (!destination.trim()) return;
    setIsGenerating(true);
    setGenStep(0);
    const interval = setInterval(() => {
      setGenStep(p => {
        if (p < GENERATION_STEPS.length - 1) return p + 1;
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          onGenerate({ destination, duration: getDuration(), vibe, budget: travelStyle });
          onClose();
        }, 500);
        return p;
      });
    }, 750);
  };

  const loadTrending = (t) => {
    setDestination(t.dest);
    setVibe(t.vibe);
    setTravelStyle(t.budget);
  };

  // ── Sub-components moved to module scope above ─────────────

  // ── Generating screen ──────────────────────────────────────
  if (isGenerating) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000,
        background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        {/* Animated rings */}
        <div style={{ position: 'relative', width: 100, height: 100 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%',
            border: `4px solid rgba(99,102,241,0.2)`, borderTopColor: T.brand,
            animation: 'spin 1s linear infinite' }} />
          <div style={{ position: 'absolute', inset: 10, borderRadius: '50%',
            border: `4px solid rgba(20,184,166,0.15)`, borderBottomColor: T.teal,
            animation: 'spin 1.5s linear infinite reverse' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 32, color: T.brand }}>auto_awesome</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', maxWidth: 360 }}>
          <h2 style={{ fontFamily: T.display, fontWeight: 800, fontSize: 24, color: '#fff', margin: '0 0 12px',
            background: `linear-gradient(135deg, ${T.brand}, ${T.teal})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Lumina is curating your trip
          </h2>
          <p style={{ color: '#94A3B8', fontFamily: T.sans, fontSize: 14, minHeight: 22, transition: 'all 0.3s' }}>
            {GENERATION_STEPS[genStep]}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ width: 280, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 999, transition: 'width 0.6s ease',
            background: `linear-gradient(90deg, ${T.brand}, ${T.teal})`,
            width: `${((genStep + 1) / GENERATION_STEPS.length) * 100}%`,
          }} />
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Main planner page ──────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .planner-scroll::-webkit-scrollbar { width: 4px; }
        .planner-scroll::-webkit-scrollbar-track { background: transparent; }
        .planner-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
        input[type='range'] { -webkit-appearance: none; appearance: none; }
        input[type='range']::-webkit-slider-runnable-track {
          height: 6px; border-radius: 99px; background: #E2E8F0;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 20px; height: 20px; border-radius: 50%;
          background: ${T.brand}; margin-top: -7px; cursor: pointer;
          box-shadow: 0 2px 8px rgba(99,102,241,0.4);
        }
      `}</style>

      {/* Full-screen overlay */}
      <div onClick={e => e.stopPropagation()}
        className="planner-scroll"
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          overflowY: 'auto',
          background: '#fff',
          animation: 'slideInUp 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}>

        <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 24px 120px' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            marginBottom: 28, paddingTop: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 16, color: T.brand }}>explore</span>
                <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: T.brand,
                  textTransform: 'uppercase', letterSpacing: '0.08em' }}>Lumina Travel</span>
              </div>
              <h1 style={{ fontFamily: T.display, fontWeight: 800, fontSize: 26, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
                Where to next?
              </h1>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: '#64748B', margin: '6px 0 0', lineHeight: 1.5 }}>
                Let Lumina's neural engine curate your perfect escape based on your distinct travel identity.
              </p>
            </div>
            <button onClick={onClose}
              style={{ background: '#F1F5F9', border: 'none', borderRadius: 999, width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <span className="material-symbols-outlined leading-none" style={{ fontSize: 18, color: '#475569' }}>close</span>
            </button>
          </div>

          {/* ── Destination ── */}
          <div style={{ marginBottom: 22 }}>
            <Label>Destination</Label>
            <PlannerInput icon="location_on" value={destination}
              onChange={e => setDestination(e.target.value)}
              placeholder="Anywhere in the world..." />
          </div>

          {/* ── Date Range ── */}
          <div style={{ marginBottom: 22 }}>
            <Label>Date Range</Label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <PlannerInput icon="calendar_today" type="date" value={startDate}
                onChange={e => setStartDate(e.target.value)} placeholder="Start Date" />
              <PlannerInput icon="event" type="date" value={endDate}
                onChange={e => setEndDate(e.target.value)} placeholder="End Date" />
            </div>
          </div>

          {/* ── Budget Slider ── */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Label>Budget Range</Label>
              <span style={{ fontFamily: T.display, fontWeight: 800, fontSize: 16, color: T.brand }}>
                ₹{budget.toLocaleString()}
              </span>
            </div>
            <input type="range" min={500} max={500000} step={500} value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              style={{ width: '100%', accentColor: T.brand }} />
            <div style={{ display: 'flex', justifyContent: 'space-between',
              fontFamily: T.sans, fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
              <span>₹500</span><span>₹5,00,000</span>
            </div>
          </div>

          {/* ── Travelers ── */}
          <div style={{ marginBottom: 22 }}>
            <Label>Travelers</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <button onClick={() => setTravelers(p => Math.max(1, p - 1))}
                style={{ width: 36, height: 36, borderRadius: 999, border: '1.5px solid #E2E8F0',
                  background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 18, color: '#475569' }}>remove</span>
              </button>
              <span style={{ fontFamily: T.display, fontWeight: 800, fontSize: 20, color: '#0F172A', minWidth: 24, textAlign: 'center' }}>
                {travelers}
              </span>
              <button onClick={() => setTravelers(p => p + 1)}
                style={{ width: 36, height: 36, borderRadius: 999, border: 'none',
                  background: T.brand, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 18, color: '#fff' }}>add</span>
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { label: 'Solo', icon: 'person' },
                { label: 'Couple', icon: 'favorite' },
                { label: 'Family', icon: 'family_restroom' },
                { label: 'Friends', icon: 'group' },
                { label: 'Business', icon: 'work' },
              ].map(({ label, icon }) => (
                <Chip key={label} label={label} icon={icon}
                  active={travelerType === label}
                  onClick={() => setTravelerType(label)} />
              ))}
            </div>
          </div>

          {/* ── Interests ── */}
          <div style={{ marginBottom: 22 }}>
            <Label>Interests</Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { label: 'Beach', icon: 'beach_access' },
                { label: 'Mountains', icon: 'landscape' },
                { label: 'Food', icon: 'restaurant' },
                { label: 'Adventure', icon: 'directions_run' },
                { label: 'Wellness', icon: 'spa' },
                { label: 'History', icon: 'museum' },
                { label: 'Nightlife', icon: 'nightlife' },
                { label: 'Shopping', icon: 'shopping_bag' },
              ].map(({ label, icon }) => (
                <Chip key={label} label={label} icon={icon}
                  active={interests.includes(label)}
                  onClick={() => toggleInterest(label)} />
              ))}
            </div>
          </div>

          {/* ── Weather ── */}
          <div style={{ marginBottom: 22 }}>
            <Label>Weather Preference</Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { label: 'Sunny', icon: 'wb_sunny' },
                { label: 'Mild', icon: 'partly_cloudy_day' },
                { label: 'Cold', icon: 'ac_unit' },
              ].map(({ label, icon }) => (
                <Chip key={label} label={label} icon={icon}
                  active={weatherPref === label}
                  onClick={() => setWeatherPref(label)}
                  color="#0EA5E9" />
              ))}
            </div>
          </div>

          {/* ── Travel Style ── */}
          <div style={{ marginBottom: 22 }}>
            <Label>Travel Style</Label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Fast', 'Balanced', 'Relaxed'].map(s => (
                <button key={s} onClick={() => setTravelStyle(s)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 14, border: 'none', cursor: 'pointer',
                    fontFamily: T.sans, fontSize: 14, fontWeight: 600, transition: 'all 0.15s',
                    background: travelStyle === s ? T.brand : '#F1F5F9',
                    color: travelStyle === s ? '#fff' : '#475569',
                    boxShadow: travelStyle === s ? '0 2px 12px rgba(99,102,241,0.3)' : 'none',
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ── Vibe ── */}
          <div style={{ marginBottom: 32 }}>
            <Label>Travel Vibe</Label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { name: 'Eco-Zen', icon: 'spa', color: '#10B981' },
                { name: 'Modern Luxury', icon: 'diamond', color: '#8B5CF6' },
                { name: 'Vibrant Culture', icon: 'theater_comedy', color: '#F59E0B' },
                { name: 'Adventure & Sport', icon: 'landscape', color: '#EF4444' },
              ].map(v => (
                <button key={v.name} onClick={() => setVibe(v.name)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                    borderRadius: 16, border: `1.5px solid ${vibe === v.name ? v.color : '#E2E8F0'}`,
                    background: vibe === v.name ? `${v.color}12` : '#fff',
                    cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}>
                  <span className="material-symbols-outlined leading-none"
                    style={{ fontSize: 20, color: vibe === v.name ? v.color : '#94A3B8',
                      background: vibe === v.name ? `${v.color}18` : '#F1F5F9',
                      padding: 6, borderRadius: 10 }}>
                    {v.icon}
                  </span>
                  <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700,
                    color: vibe === v.name ? v.color : '#334155' }}>
                    {v.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Generate button ── */}
          <button onClick={handleGenerate} disabled={!destination.trim()}
            style={{ width: '100%', padding: '16px 0', borderRadius: 999, border: 'none', cursor: destination.trim() ? 'pointer' : 'not-allowed',
              background: destination.trim() ? `linear-gradient(135deg, ${T.brand}, ${T.teal})` : '#E2E8F0',
              color: destination.trim() ? '#fff' : '#94A3B8',
              fontFamily: T.display, fontSize: 16, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: destination.trim() ? '0 4px 24px rgba(99,102,241,0.4)' : 'none',
              transition: 'all 0.2s', marginBottom: 40 }}>
            <span className="material-symbols-outlined leading-none" style={{ fontSize: 20 }}>auto_awesome</span>
            Generate AI Trip
          </button>

          {/* ── Trending Itineraries ── */}
          <div>
            <h3 style={{ fontFamily: T.display, fontWeight: 800, fontSize: 18, color: '#0F172A', margin: '0 0 16px' }}>
              Trending Itineraries
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {TRENDING.map(t => (
                <div key={t.title} onClick={() => loadTrending(t)}
                  style={{ borderRadius: 20, overflow: 'hidden', position: 'relative',
                    height: 160, cursor: 'pointer', boxShadow: '0 2px 16px rgba(0,0,0,0.1)' }}
                  onMouseEnter={e => e.currentTarget.querySelector('.inner').style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.querySelector('.inner').style.transform = 'scale(1)'}>
                  <div className="inner" style={{ width: '100%', height: '100%',
                    backgroundImage: `url('${t.img}')`, backgroundSize: 'cover', backgroundPosition: 'center',
                    transition: 'transform 0.5s ease' }} />
                  <div style={{ position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 16px 16px' }}>
                    <span style={{ display: 'inline-block', background: t.tagColor, color: '#fff',
                      borderRadius: 999, padding: '2px 10px', fontSize: 10, fontWeight: 800,
                      letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>
                      {t.tag}
                    </span>
                    <h4 style={{ fontFamily: T.display, fontWeight: 800, fontSize: 17, color: '#fff', margin: '0 0 3px' }}>
                      {t.title}
                    </h4>
                    <p style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                      {t.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
