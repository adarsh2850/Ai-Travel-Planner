import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { tripsAPI } from '../utils/api';

const T = {
  brand:     '#6366F1',
  brandDark: '#4F46E5',
  brandLight:'#EEF2FF',
  teal:      '#14B8A6',
  green:     '#10B981',
  greenBg:   '#F0FDF4',
  red:       '#EF4444',
  redBg:     '#FEF2F2',
  amber:     '#F59E0B',
  sans:      "'Inter', sans-serif",
  display:   "'Plus Jakarta Sans', sans-serif",
};

// ── Stat card ─────────────────────────────────────────────────
function StatCard({ icon, label, value, color, bg }) {
  return (
    <div style={{ background: bg, border: `1.5px solid ${color}25`, borderRadius: 18,
      padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span className="material-symbols-outlined leading-none" style={{ fontSize: 22, color }}>{icon}</span>
      </div>
      <div>
        <p style={{ fontFamily: T.display, fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 2px' }}>{value}</p>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: '#64748B', margin: 0, fontWeight: 600 }}>{label}</p>
      </div>
    </div>
  );
}

// ── Info row ──────────────────────────────────────────────────
function InfoRow({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 0', borderBottom: '1px solid #F1F5F9' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: T.brandLight,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span className="material-symbols-outlined leading-none" style={{ fontSize: 18, color: T.brand }}>{icon}</span>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: '#94A3B8',
          textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 2px' }}>{label}</p>
        <p style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: '#0F172A', margin: 0 }}>{value || '—'}</p>
      </div>
    </div>
  );
}

export default function Profile({ onTabChange }) {
  const { user, updateProfile, logout } = useAuth();

  const [editing, setEditing]         = useState(false);
  const [name, setName]               = useState(user?.name || '');
  const [saving, setSaving]           = useState(false);
  const [saveMsg, setSaveMsg]         = useState('');
  const [trips, setTrips]             = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);

  const handleClearHistory = async () => {
    try {
      await tripsAPI.clearAll();
      setTrips([]);
      setConfirmClearHistory(false);
    } catch (err) {
      console.error(err);
      alert("Failed to clear trip history.");
    }
  };

  // Fetch user's trips for stats
  useEffect(() => {
    tripsAPI.getAll()
      .then(r => setTrips(r.data.trips || []))
      .catch(() => {})
      .finally(() => setTripsLoading(false));
  }, []);

  const handleSave = async () => {
    if (!name.trim() || name.trim() === user?.name) { setEditing(false); return; }
    setSaving(true);
    setSaveMsg('');
    try {
      await updateProfile({ name: name.trim() });
      setSaveMsg('Profile updated!');
      setEditing(false);
      setTimeout(() => setSaveMsg(''), 3000);
    } catch {
      setSaveMsg('Update failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Computed stats
  const totalSpent   = trips.reduce((s, t) => s + (t.spentBudget || 0), 0);
  const destinations = [...new Set(trips.map(t => t.destination?.split(',')[0]))].length;
  const joinDate     = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—';
  const initials     = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 20px 100px', fontFamily: T.sans }}>

      {/* ── Page title ── */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: T.display, fontWeight: 800, fontSize: 28, color: '#0F172A', margin: '0 0 6px' }}>
          My Profile
        </h1>
        <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>
          Manage your account details and view your travel summary.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
        className="profile-grid">
        <style>{`@media(max-width:700px){.profile-grid{grid-template-columns:1fr!important;}}`}</style>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Avatar + name card */}
          <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 24,
            padding: '32px 28px', textAlign: 'center',
            boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
            {/* Avatar */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
              <div style={{ width: 88, height: 88, borderRadius: '50%',
                background: `linear-gradient(135deg, ${T.brand}, ${T.teal})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 6px 24px ${T.brand}40` }}>
                <span style={{ fontFamily: T.display, fontWeight: 800, fontSize: 32, color: '#fff' }}>
                  {initials}
                </span>
              </div>
              {/* Online badge */}
              <div style={{ position: 'absolute', bottom: 4, right: 4,
                width: 18, height: 18, borderRadius: '50%', background: T.green,
                border: '3px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
            </div>

            {/* Name (editable) */}
            {editing ? (
              <div style={{ marginBottom: 8 }}>
                <input value={name} onChange={e => setName(e.target.value)}
                  autoFocus
                  style={{ width: '100%', textAlign: 'center', fontFamily: T.display, fontWeight: 700,
                    fontSize: 20, color: '#0F172A', background: '#F8FAFC',
                    border: `2px solid ${T.brand}`, borderRadius: 12,
                    padding: '8px 14px', outline: 'none', boxSizing: 'border-box' }}
                  onKeyDown={e => e.key === 'Enter' && handleSave()}
                />
              </div>
            ) : (
              <h2 style={{ fontFamily: T.display, fontWeight: 800, fontSize: 22,
                color: '#0F172A', margin: '0 0 4px' }}>{user?.name}</h2>
            )}

            <p style={{ color: '#64748B', fontSize: 14, margin: '0 0 20px' }}>{user?.email}</p>

            {/* Edit / Save buttons */}
            {editing ? (
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button onClick={() => { setEditing(false); setName(user?.name || ''); }}
                  style={{ padding: '9px 20px', borderRadius: 999, border: '1.5px solid #E2E8F0',
                    background: '#fff', color: '#475569', fontFamily: T.sans, fontSize: 13,
                    fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  style={{ padding: '9px 20px', borderRadius: 999, border: 'none',
                    background: T.brand, color: '#fff', fontFamily: T.sans, fontSize: 13,
                    fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                    boxShadow: `0 2px 12px ${T.brand}40`, opacity: saving ? 0.7 : 1 }}>
                  {saving
                    ? <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
                    : <><span className="material-symbols-outlined leading-none" style={{ fontSize: 15 }}>check</span>Save</>}
                </button>
              </div>
            ) : (
              <button onClick={() => setEditing(true)}
                style={{ padding: '9px 24px', borderRadius: 999,
                  background: T.brandLight, border: `1.5px solid ${T.brand}30`,
                  color: T.brand, fontFamily: T.sans, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 15 }}>edit</span>
                Edit Name
              </button>
            )}

            {saveMsg && (
              <p style={{ marginTop: 12, fontSize: 13, fontWeight: 600,
                color: saveMsg.includes('failed') ? T.red : T.green }}>
                {saveMsg}
              </p>
            )}
          </div>

          {/* Account details card */}
          <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 24,
            padding: '24px 24px 8px', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontFamily: T.display, fontWeight: 700, fontSize: 16,
              color: '#0F172A', margin: '0 0 4px' }}>Account Details</h3>
            <p style={{ color: '#94A3B8', fontSize: 12, margin: '0 0 16px' }}>
              Your personal information
            </p>
            <InfoRow icon="person" label="Full Name" value={user?.name} />
            <InfoRow icon="email" label="Email Address" value={user?.email} />
            <InfoRow icon="calendar_today" label="Member Since" value={joinDate} />
            <InfoRow icon="verified_user" label="Account Status" value="Active & Verified" />
            <div style={{ height: 16 }} />
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Stats */}
          <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 24,
            padding: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontFamily: T.display, fontWeight: 700, fontSize: 16,
              color: '#0F172A', margin: '0 0 16px' }}>Travel Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <StatCard icon="luggage" label="Trips Planned" value={tripsLoading ? '...' : trips.length}
                color={T.brand} bg={T.brandLight} />
              <StatCard icon="location_on" label="Destinations Visited" value={tripsLoading ? '...' : destinations}
                color={T.teal} bg="#F0FDFA" />
              <StatCard icon="payments" label="Total Spend Tracked"
                value={tripsLoading ? '...' : `₹${totalSpent.toLocaleString()}`}
                color={T.amber} bg="#FFFBEB" />
              <StatCard icon="eco" label="Eco Trips" value={tripsLoading ? '...' :
                trips.filter(t => t.vibe === 'Eco-Zen').length}
                color={T.green} bg={T.greenBg} />
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 24,
            padding: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontFamily: T.display, fontWeight: 700, fontSize: 16,
              color: '#0F172A', margin: '0 0 16px' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: 'map',          label: 'View My Trips',      tab: 'My Trips',   color: T.brand   },
                { icon: 'auto_awesome', label: 'Plan New Itinerary',  tab: 'AI Planner', color: T.teal    },
                { icon: 'explore',      label: 'Discover Destinations',tab:'Discover',   color: T.amber   },
              ].map(({ icon, label, tab, color }) => (
                <button key={tab} onClick={() => onTabChange(tab)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12,
                    padding: '13px 16px', borderRadius: 14, border: '1.5px solid #F1F5F9',
                    background: '#FAFBFC', cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s', fontFamily: T.sans }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.background = `${color}08`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#F1F5F9'; e.currentTarget.style.background = '#FAFBFC'; }}>
                  <span style={{ width: 36, height: 36, borderRadius: 10, background: `${color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined leading-none" style={{ fontSize: 18, color }}>{icon}</span>
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#334155' }}>{label}</span>
                  <span className="material-symbols-outlined leading-none" style={{ fontSize: 16, color: '#CBD5E1', marginLeft: 'auto' }}>
                    chevron_right
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div style={{ background: '#fff', border: '1.5px solid #FEE2E2', borderRadius: 24,
            padding: '20px 24px', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontFamily: T.display, fontWeight: 700, fontSize: 15,
              color: '#991B1B', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined leading-none" style={{ fontSize: 18 }}>warning</span>
              Account Actions
            </h3>
            {!confirmLogout ? (
              <button onClick={() => setConfirmLogout(true)}
                style={{ width: '100%', padding: '11px 0', borderRadius: 12,
                  background: T.redBg, border: `1.5px solid #FECACA`,
                  color: T.red, fontFamily: T.sans, fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 17 }}>logout</span>
                Sign Out
              </button>
            ) : (
              <div>
                <p style={{ fontSize: 13, color: '#7F1D1D', margin: '0 0 12px', fontWeight: 500 }}>
                  Are you sure you want to sign out?
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setConfirmLogout(false)}
                    style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: '1.5px solid #E2E8F0',
                      background: '#fff', color: '#475569', fontFamily: T.sans,
                      fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button onClick={logout}
                    style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
                      background: T.red, color: '#fff', fontFamily: T.sans,
                      fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                    Yes, Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* Clear History section */}
            <div style={{ borderTop: '1px solid #FEE2E2', marginTop: 16, paddingTop: 16 }}>
              {!confirmClearHistory ? (
                <button onClick={() => setConfirmClearHistory(true)}
                  style={{ width: '100%', padding: '11px 0', borderRadius: 12,
                    background: '#FFF5F5', border: `1.5px solid #FEE2E2`,
                    color: T.red, fontFamily: T.sans, fontSize: 14, fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined leading-none" style={{ fontSize: 18 }}>delete_sweep</span>
                  Delete Trips History
                </button>
              ) : (
                <div>
                  <p style={{ fontSize: 13, color: '#7F1D1D', margin: '0 0 12px', fontWeight: 500 }}>
                    Are you sure you want to delete all your saved trips? This cannot be undone.
                  </p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => setConfirmClearHistory(false)}
                      style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: '1.5px solid #E2E8F0',
                        background: '#fff', color: '#475569', fontFamily: T.sans,
                        fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                      Cancel
                    </button>
                    <button onClick={handleClearHistory}
                      style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
                        background: T.red, color: '#fff', fontFamily: T.sans,
                        fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                      Yes, Delete All
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
