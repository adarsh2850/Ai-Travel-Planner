import { useState, useEffect } from 'react';
import { weatherAPI, configAPI } from '../utils/api';

// ── Design tokens ──────────────────────────────────────────
const T = {
  brand:      '#6366F1',
  brandDark:  '#4F46E5',
  brandLight: '#EEF2FF',
  teal:       '#14B8A6',
  green:      '#10B981',
  greenBg:    '#F0FDF4',
  amber:      '#F59E0B',
  red:        '#EF4444',
  sans:       "'Inter', sans-serif",
  display:    "'Plus Jakarta Sans', sans-serif",
};

const VIBE_META = {
  'Eco-Zen':          { color: '#10B981', bg: '#F0FDF4', icon: 'spa' },
  'Modern Luxury':    { color: '#8B5CF6', bg: '#F5F3FF', icon: 'diamond' },
  'Vibrant Culture':  { color: '#F59E0B', bg: '#FFFBEB', icon: 'theater_comedy' },
  'Adventure & Sport':{ color: '#EF4444', bg: '#FEF2F2', icon: 'landscape' },
};

const ACT_IMAGES = {
  hotel:      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80',
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
  transit:    'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80',
  activity:   'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
};

function actIcon(type) {
  return { hotel: 'hotel', restaurant: 'restaurant', transit: 'train', activity: 'explore' }[type] || 'explore';
}
function actImg(type) { return ACT_IMAGES[type] || ACT_IMAGES.activity; }

export default function ItineraryView({ itinerary, onEdit, onSave, onUpdateNotes }) {
  const [activeDay, setActiveDay] = useState(1);
  const [expandedAct, setExpandedAct] = useState(null);
  const [notes, setNotes] = useState(itinerary.notes || '');
  const [savingNotes, setSavingNotes] = useState(false);
  const [weather, setWeather] = useState({
    temperature: 18,
    description: 'Loading weather...',
    icon: 'sync',
    loading: true,
  });
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [mapMode, setMapMode] = useState('directions');

  useEffect(() => {
    setNotes(itinerary.notes || '');
  }, [itinerary._id, itinerary.notes]);

  useEffect(() => {
    let active = true;

    async function fetchDetails() {
      // 1. Fetch config (Google Maps Key) if not already fetched
      if (!googleMapsApiKey) {
        try {
          const configRes = await configAPI.getPublicConfig();
          if (configRes.data && configRes.data.success && active) {
            setGoogleMapsApiKey(configRes.data.googleMapsApiKey);
          }
        } catch (err) {
          console.error('Error fetching config:', err);
        }
      }

      // 2. Fetch live weather
      if (itinerary.destination) {
        setWeather(prev => ({ ...prev, loading: true, description: 'Loading weather...' }));
        try {
          const weatherRes = await weatherAPI.getWeather(itinerary.destination);
          if (weatherRes.data && weatherRes.data.success && active) {
            setWeather({
              temperature: weatherRes.data.temperature,
              description: weatherRes.data.description,
              icon: weatherRes.data.icon,
              loading: false
            });
          }
        } catch (err) {
          console.error('Error fetching weather:', err);
          if (active) {
            setWeather({
              temperature: 18,
              description: 'Sunny',
              icon: 'wb_sunny',
              loading: false
            });
          }
        }
      }
    }

    fetchDetails();

    return () => {
      active = false;
    };
  }, [itinerary.destination, googleMapsApiKey]);

  const handleSaveNotes = async () => {
    if (!onUpdateNotes) return;
    setSavingNotes(true);
    try {
      await onUpdateNotes(notes);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingNotes(false);
    }
  };

  if (!itinerary) return null;

  const vibe   = VIBE_META[itinerary.vibe] || VIBE_META['Eco-Zen'];
  const dayData = itinerary.days.find(d => d.dayNumber === activeDay) || itinerary.days[0];
  const pct     = Math.min(100, Math.round((itinerary.spentBudget / itinerary.totalBudget) * 100));
  const overBudget = itinerary.spentBudget > itinerary.totalBudget;

  return (
    <div style={{ fontFamily: T.sans, color: '#334155', maxWidth: 1100, margin: '0 auto' }}>

      {/* ══ HERO HEADER ══════════════════════════════════════ */}
      <div style={{ background: `linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)`,
        borderRadius: 24, padding: '32px 32px 28px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300,
          background: `radial-gradient(circle, ${T.brand}30, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          flexWrap: 'wrap', gap: 16, position: 'relative' }}>
          <div>
            {/* Vibe + budget badges */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ background: vibe.color, color: '#fff', borderRadius: 999,
                padding: '4px 14px', fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 13 }}>{vibe.icon}</span>
                {itinerary.vibe}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', color: '#CBD5E1', borderRadius: 999,
                padding: '4px 14px', fontSize: 12, fontWeight: 600 }}>
                {itinerary.budget} Budget
              </span>
              <span style={{ background: 'rgba(99,102,241,0.25)', color: '#A5B4FC', borderRadius: 999,
                padding: '4px 14px', fontSize: 12, fontWeight: 600 }}>
                {itinerary.duration} Days
              </span>
            </div>

            {/* Destination title */}
            <h1 style={{ fontFamily: T.display, fontWeight: 800, fontSize: 'clamp(28px,4vw,40px)',
              color: '#fff', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="material-symbols-outlined leading-none"
                style={{ fontSize: 36, color: T.brand }}>flight_takeoff</span>
              {itinerary.destination}
            </h1>
            <p style={{ color: '#94A3B8', fontSize: 14, margin: 0, maxWidth: 520, lineHeight: 1.6 }}>
              Your {itinerary.duration}-day {itinerary.vibe.toLowerCase()} journey, crafted by sarthiAi's neural engine.
              {itinerary.duration} unique days of organic cultural exploration await.
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={onEdit}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', borderRadius: 999, padding: '10px 20px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: T.sans, backdropFilter: 'blur(8px)' }}>
              <span className="material-symbols-outlined leading-none" style={{ fontSize: 16 }}>edit</span>
              Modify Plan
            </button>
            <button onClick={onSave}
              style={{ background: itinerary._id ? 'rgba(16,185,129,0.2)' : T.brand, border: itinerary._id ? '1px solid rgba(16,185,129,0.3)' : 'none',
                color: itinerary._id ? '#10B981' : '#fff', borderRadius: 999,
                padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, fontFamily: T.sans,
                boxShadow: itinerary._id ? 'none' : '0 4px 20px rgba(99,102,241,0.4)' }}>
              <span className="material-symbols-outlined leading-none" style={{ fontSize: 16 }}>{itinerary._id ? 'cloud_done' : 'bookmark'}</span>
              {itinerary._id ? 'Saved' : 'Save Trip'}
            </button>
          </div>
        </div>
      </div>

      {/* ══ MAIN LAYOUT: timeline left + sidebar right ═══════ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}
        className="itinerary-grid">
        <style>{`
          @media (max-width: 900px) {
            .itinerary-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* ── LEFT: Day tabs + timeline ── */}
        <div>
          {/* Day selector tabs */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 20 }}>
            {itinerary.days.map(d => {
              const active = activeDay === d.dayNumber;
              return (
                <button key={d.dayNumber}
                  onClick={() => { setActiveDay(d.dayNumber); setExpandedAct(null); }}
                  style={{ background: active ? T.brand : '#F1F5F9',
                    color: active ? '#fff' : '#64748B', border: 'none', cursor: 'pointer',
                    borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 700,
                    fontFamily: T.sans, whiteSpace: 'nowrap', flexShrink: 0,
                    boxShadow: active ? '0 4px 16px rgba(99,102,241,0.35)' : 'none',
                    transform: active ? 'scale(1.04)' : 'scale(1)', transition: 'all 0.2s' }}>
                  Day {d.dayNumber}
                </button>
              );
            })}
          </div>

          {/* Day theme banner */}
          <div style={{ background: `linear-gradient(135deg, ${T.brand}14, ${T.teal}0a)`,
            border: `1.5px solid ${T.brand}25`, borderRadius: 16,
            padding: '14px 18px', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="material-symbols-outlined leading-none" style={{ fontSize: 20, color: T.brand }}>calendar_today</span>
            <div>
              <p style={{ color: T.brand, fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.08em', margin: '0 0 2px' }}>Day {activeDay} Theme</p>
              <p style={{ color: '#0F172A', fontSize: 16, fontWeight: 700, margin: 0,
                fontFamily: T.display }}>{dayData?.theme || 'Exploration Day'}</p>
            </div>
          </div>

          {/* Activity timeline */}
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 10, top: 8, bottom: 8,
              width: 2, background: 'linear-gradient(to bottom, #6366F1, #14B8A6)', borderRadius: 99, opacity: 0.3 }} />

            {dayData?.activities.map((act, i) => {
              const expanded = expandedAct === i;
              return (
                <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
                  {/* Timeline dot */}
                  <div style={{ position: 'absolute', left: -22, top: 20,
                    width: 24, height: 24, borderRadius: '50%',
                    background: '#fff', border: `2.5px solid ${T.brand}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(99,102,241,0.25)', zIndex: 1 }}>
                    <span className="material-symbols-outlined leading-none"
                      style={{ fontSize: 12, color: T.brand }}>{actIcon(act.type)}</span>
                  </div>

                  {/* Activity card */}
                  <div onClick={() => setExpandedAct(expanded ? null : i)}
                    style={{ background: '#fff', border: `1.5px solid ${expanded ? T.brand+'40' : '#E2E8F0'}`,
                      borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                      boxShadow: expanded ? '0 4px 24px rgba(99,102,241,0.1)' : '0 1px 6px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s' }}>

                    {/* Card content row */}
                    <div style={{ display: 'flex', gap: 0 }}>
                      {/* Activity image */}
                      <div style={{ width: 100, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ width: '100%', height: '100%', minHeight: 90,
                          backgroundImage: `url('${act.image || actImg(act.type)}')`,
                          backgroundSize: 'cover', backgroundPosition: 'center',
                          transition: 'transform 0.4s' }}
                          className="act-img" />
                        <style>{`.act-img:hover { transform: scale(1.05); }`}</style>
                      </div>

                      {/* Text content */}
                      <div style={{ flex: 1, padding: '14px 16px 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                              <span className="material-symbols-outlined leading-none"
                                style={{ fontSize: 13, color: '#94A3B8' }}>schedule</span>
                              <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{act.time}</span>
                              {act.ecoFriendly && (
                                <span style={{ background: '#F0FDF4', border: '1px solid #BBF7D0',
                                  color: '#059669', borderRadius: 999, padding: '2px 8px', fontSize: 10,
                                  fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                                  <span className="material-symbols-outlined leading-none" style={{ fontSize: 11 }}>eco</span>
                                  Eco
                                </span>
                              )}
                            </div>
                            <h4 style={{ fontFamily: T.display, fontWeight: 700, fontSize: 15,
                              color: '#0F172A', margin: '0 0 4px', lineHeight: 1.3 }}>{act.title}</h4>
                            <p style={{ fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.5,
                              display: expanded ? 'block' : '-webkit-box',
                              WebkitLineClamp: expanded ? 'unset' : 2,
                              WebkitBoxOrient: 'vertical', overflow: expanded ? 'visible' : 'hidden' }}>
                              {act.description}
                            </p>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                            <span style={{ background: act.cost === 0 ? '#F0FDF4' : '#EEF2FF',
                              color: act.cost === 0 ? '#059669' : T.brand,
                              borderRadius: 8, padding: '4px 10px', fontSize: 13, fontWeight: 800,
                              fontFamily: T.display }}>
                              {act.cost === 0 ? 'Free' : `₹${act.cost.toLocaleString()}`}
                            </span>
                            <span className="material-symbols-outlined leading-none"
                              style={{ fontSize: 16, color: '#CBD5E1', transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                                transition: 'transform 0.2s' }}>expand_more</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded eco note */}
                    {expanded && act.ecoFriendly && act.ecoReason && (
                      <div style={{ borderTop: '1px solid #F0FDF4', background: '#F0FDF4',
                        padding: '10px 16px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span className="material-symbols-outlined leading-none"
                          style={{ fontSize: 16, color: '#059669', flexShrink: 0 }}>verified</span>
                        <p style={{ fontSize: 12, color: '#065F46', margin: 0, lineHeight: 1.5 }}>
                          <strong>Eco Impact:</strong> {act.ecoReason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Map card */}
          <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 20,
            overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 18, color: T.brand }}>map</span>
                <span style={{ fontFamily: T.display, fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                  Interactive Map
                </span>
              </div>
              {googleMapsApiKey && (
                <div style={{ display: 'flex', gap: 4, background: '#F1F5F9', padding: 2, borderRadius: 8 }}>
                  <button
                    onClick={() => setMapMode('directions')}
                    style={{
                      border: 'none',
                      background: mapMode === 'directions' ? '#fff' : 'transparent',
                      color: mapMode === 'directions' ? T.brand : '#64748B',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    Route
                  </button>
                  <button
                    onClick={() => setMapMode('place')}
                    style={{
                      border: 'none',
                      background: mapMode === 'place' ? '#fff' : 'transparent',
                      color: mapMode === 'place' ? T.brand : '#64748B',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    Explore
                  </button>
                </div>
              )}
            </div>
            <div style={{ height: 240, position: 'relative', overflow: 'hidden' }}>
              {(() => {
                let mapUrl = '';
                if (googleMapsApiKey) {
                  if (mapMode === 'directions') {
                    const hotelActivity = dayData?.activities[0];
                    const hotelName = hotelActivity?.title.replace(/^(Check-in at|Breakfast at)\s+/, '') || itinerary.destination;
                    const origin = `${hotelName}, ${itinerary.destination}`;
                    const destination = `${hotelName}, ${itinerary.destination}`;
                    const waypoints = (dayData?.activities || [])
                      .slice(1)
                      .map(act => `${act.title}, ${itinerary.destination}`)
                      .join('|');
                    mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${googleMapsApiKey}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&waypoints=${encodeURIComponent(waypoints)}`;
                  } else {
                    mapUrl = `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(itinerary.destination)}`;
                  }
                } else {
                  // Keyless Fallback
                  mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(itinerary.destination)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
                }
                return (
                  <iframe
                    title="Google Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={mapUrl}
                  />
                );
              })()}
            </div>
          </div>

          {/* Trip Notes card (Only shown for saved trips) */}
          {itinerary._id && (
            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 20,
              overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 18, color: T.brand }}>edit_note</span>
                <span style={{ fontFamily: T.display, fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                  Trip Notes
                </span>
              </div>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add packing lists, bookings, or notes for this trip..."
                style={{ width: '100%', height: 100, border: '1px solid #E2E8F0', borderRadius: 12,
                  padding: '10px', fontSize: 13, fontFamily: T.sans, resize: 'none', outline: 'none', boxSizing: 'border-box' }}
              />
              <button onClick={handleSaveNotes} disabled={savingNotes}
                style={{ width: '100%', marginTop: 10, padding: '8px 0', borderRadius: 12,
                  background: T.brand, border: 'none', color: '#fff', fontFamily: T.sans, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  boxShadow: '0 2px 8px rgba(99,102,241,0.2)', opacity: savingNotes ? 0.7 : 1 }}>
                {savingNotes ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          )}

          {/* Stays & Transit card */}
          <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 20,
            overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid #F1F5F9',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: T.display, fontWeight: 700, fontSize: 15, color: '#0F172A',
                display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 18, color: T.brand }}>hotel</span>
                Stays &amp; Transit
              </span>
              <span style={{ background: '#EEF2FF', color: T.brand, borderRadius: 999,
                padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>
                {itinerary.duration}N
              </span>
            </div>

            {/* Hotel card */}
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={itinerary.hotel?.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&q=80"}
                    alt="hotel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: '0 0 3px',
                    fontFamily: T.display }}>
                    {itinerary.hotel?.name || `${itinerary.destination} Hotel`}
                  </p>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    {[1, 2, 3, 4, 5].slice(0, itinerary.budget === 'Economy' ? 3 : itinerary.budget === 'Balanced' ? 4 : 5).map(s => (
                      <span key={s} className="material-symbols-outlined leading-none"
                        style={{ fontSize: 12, color: '#FBBF24' }}>star</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 11, color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
                    {itinerary.hotel?.desc || `${itinerary.vibe} · ${itinerary.budget} tier`}
                  </p>
                  {itinerary.hotel?.eco && (
                    <span style={{ background: '#F0FDF4', border: '1px solid #BBF7D0',
                      color: '#059669', borderRadius: 999, padding: '1px 6px', fontSize: 9,
                      fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 2, marginTop: 4 }}>
                      <span className="material-symbols-outlined leading-none" style={{ fontSize: 10 }}>eco</span>
                      {itinerary.hotel.reason || 'Eco-certified'}
                    </span>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: T.display, fontWeight: 800, fontSize: 15,
                    color: T.brand, margin: '0 0 2px' }}>
                    ₹{(itinerary.hotel?.cost || Math.round(itinerary.spentBudget / itinerary.duration)).toLocaleString()}<span style={{ fontSize: 11, fontWeight: 500 }}>/nt</span>
                  </p>
                  <p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>avg/night</p>
                </div>
              </div>

              {/* Transit badges */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['✈ Flight', '🚄 Train', '🚌 Bus'].map(t => (
                  <span key={t} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0',
                    borderRadius: 8, padding: '5px 10px', fontSize: 12, fontWeight: 600, color: '#475569' }}>
                    {t}
                  </span>
                ))}
              </div>

              <button onClick={() => alert('Booking entire itinerary...')}
                style={{ width: '100%', marginTop: 14, padding: '12px 0', borderRadius: 12,
                  background: `linear-gradient(135deg, ${T.brand}, ${T.teal})`,
                  border: 'none', color: '#fff', fontFamily: T.display, fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 16 }}>verified_user</span>
                Book the Entire Plan
              </button>
            </div>
          </div>

          {/* All Insights card */}
          <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 20,
            overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #F1F5F9',
              display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined leading-none" style={{ fontSize: 18, color: T.brand }}>insights</span>
              <span style={{ fontFamily: T.display, fontWeight: 700, fontSize: 15, color: '#0F172A' }}>
                All Insights
              </span>
            </div>
            <div style={{ padding: '16px' }}>
              {/* Total budget */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Estimated Total</span>
                  <span style={{ fontFamily: T.display, fontWeight: 800, fontSize: 22, color: '#0F172A' }}>
                    ₹{itinerary.spentBudget.toLocaleString()}
                  </span>
                </div>
                <div style={{ height: 6, background: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`,
                    background: overBudget
                      ? `linear-gradient(90deg, ${T.red}, #F97316)`
                      : `linear-gradient(90deg, ${T.brand}, ${T.teal})`,
                    borderRadius: 99, transition: 'width 0.8s ease' }} />
                </div>
                <p style={{ fontSize: 11, color: overBudget ? T.red : '#059669', marginTop: 4, fontWeight: 600 }}>
                  {overBudget ? `⚠ Over budget by ₹${(itinerary.spentBudget - itinerary.totalBudget).toLocaleString()}`
                              : `✓ ${100 - pct}% within budget`}
                </p>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                {/* Weather */}
                <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD',
                  borderRadius: 14, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                    <span className="material-symbols-outlined leading-none" style={{ fontSize: 16, color: '#0EA5E9' }}>
                      {weather.loading ? 'sync' : weather.icon}
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0369A1',
                      textTransform: 'uppercase', letterSpacing: '0.06em' }}>Weather</span>
                  </div>
                  <p style={{ fontFamily: T.display, fontWeight: 800, fontSize: 20, color: '#0369A1', margin: '0 0 2px' }}>
                    {weather.loading ? '--' : `${weather.temperature}°C`}
                  </p>
                  <p style={{ fontSize: 10, color: '#0EA5E9', margin: 0, textTransform: 'capitalize' }}>
                    {weather.description}
                  </p>
                </div>
                {/* Eco score */}
                <div style={{ background: T.greenBg, border: '1px solid #BBF7D0',
                  borderRadius: 14, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                    <span className="material-symbols-outlined leading-none" style={{ fontSize: 16, color: T.green }}>eco</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#065F46',
                      textTransform: 'uppercase', letterSpacing: '0.06em' }}>Eco Score</span>
                  </div>
                  <p style={{ fontFamily: T.display, fontWeight: 800, fontSize: 20, color: T.green, margin: '0 0 2px' }}>
                    {itinerary.ecoScore}
                  </p>
                  <p style={{ fontSize: 10, color: T.green, margin: 0 }}>Sustainable</p>
                </div>
                {/* CO2 */}
                <div style={{ background: '#EEF2FF', border: '1px solid #C7D2FE',
                  borderRadius: 14, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                    <span className="material-symbols-outlined leading-none" style={{ fontSize: 16, color: T.brand }}>co2</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.brandDark,
                      textTransform: 'uppercase', letterSpacing: '0.06em' }}>Carbon</span>
                  </div>
                  <p style={{ fontFamily: T.display, fontWeight: 800, fontSize: 20, color: T.brand, margin: '0 0 2px' }}>
                    -{itinerary.co2Saved}kg
                  </p>
                  <p style={{ fontSize: 10, color: T.brand, margin: 0 }}>vs avg transit</p>
                </div>
                {/* Days */}
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A',
                  borderRadius: 14, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                    <span className="material-symbols-outlined leading-none" style={{ fontSize: 16, color: T.amber }}>calendar_month</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#92400E',
                      textTransform: 'uppercase', letterSpacing: '0.06em' }}>Duration</span>
                  </div>
                  <p style={{ fontFamily: T.display, fontWeight: 800, fontSize: 20, color: T.amber, margin: '0 0 2px' }}>
                    {itinerary.duration}
                  </p>
                  <p style={{ fontSize: 10, color: T.amber, margin: 0 }}>Nights</p>
                </div>
              </div>

              {/* Export button */}
              <button onClick={() => alert('Exporting PDF...')}
                style={{ width: '100%', padding: '11px 0', borderRadius: 12,
                  background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#334155',
                  fontFamily: T.sans, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 16 }}>download</span>
                Export PDF Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
