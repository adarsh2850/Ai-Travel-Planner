import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ── Hoisted outside Signup so React never remounts it on re-render ──
function Field({ id, name, label, type = 'text', placeholder, autoComplete,
  icon, error, value, onChange, showToggle, visible, onToggle }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-[#191c1e]"
        style={{ fontFamily: "'Inter', sans-serif" }}>
        {label}
      </label>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
        error
          ? 'border-red-400 bg-red-50 ring-1 ring-red-300'
          : 'border-[#c3c6d7]/60 bg-[#f2f4f6] focus-within:border-[#004ac6]/50 focus-within:ring-2 focus-within:ring-[#004ac6]/15'
      }`}>
        <span className="material-symbols-outlined text-[#737686] text-[20px] leading-none shrink-0">{icon}</span>
        <input
          id={id} name={name}
          type={showToggle ? (visible ? 'text' : 'password') : type}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none text-[#191c1e] text-sm placeholder:text-[#737686]"
          aria-invalid={Boolean(error)}
        />
        {showToggle && (
          <button type="button" onClick={onToggle}
            className="text-[#737686] hover:text-[#191c1e] transition-colors shrink-0"
            aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}>
            <span className="material-symbols-outlined text-[20px] leading-none">
              {visible ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <span className="material-symbols-outlined text-[13px] leading-none">warning</span>
          {error}
        </p>
      )}
    </div>
  );
}

function getStrength(pwd) {
  if (!pwd || pwd.length < 6) return null;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { label: 'Weak',   color: 'bg-red-500',    w: '25%' };
  if (score === 2) return { label: 'Fair',   color: 'bg-amber-400',  w: '50%' };
  if (score === 3) return { label: 'Good',   color: 'bg-blue-500',   w: '75%' };
  return              { label: 'Strong', color: 'bg-emerald-500', w: '100%' };
}

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  const [form, setForm]               = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors]           = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim())                          errs.name = 'Full name is required';
    else if (form.name.trim().length < 2)           errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim())                         errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))   errs.email = 'Please enter a valid email';
    if (!form.password)                             errs.password = 'Password is required';
    else if (form.password.length < 6)             errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword)                      errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length > 0) { setErrors(ve); return; }
    setIsSubmitting(true);
    setServerError('');
    try {
      await signup({ name: form.name.trim(), email: form.email, password: form.password });
      navigate('/', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const strength = getStrength(form.password);

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-[#004ac6] text-3xl leading-none">explore</span>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              sarthiAi
            </span>
          </Link>
          <h1 className="text-[28px] font-bold text-[#191c1e] mt-1"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Start your journey
          </h1>
          <p className="text-[#434655] mt-1.5 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            Create your account and let AI plan your perfect trip
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[28px] shadow-xl p-8">
          {serverError && (
            <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
              <span className="material-symbols-outlined text-red-600 text-[20px] shrink-0 leading-none">error</span>
              <p className="text-sm text-red-700 font-medium leading-snug">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Field id="name" name="name" label="Full name" type="text"
              autoComplete="name" placeholder="Your full name" icon="person"
              value={form.name} onChange={handleChange} error={errors.name} />

            <Field id="email" name="email" label="Email address" type="email"
              autoComplete="email" placeholder="you@example.com" icon="email"
              value={form.email} onChange={handleChange} error={errors.email} />

            {/* Password with strength meter — kept inline since it has extra UI */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-semibold text-[#191c1e]"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Password
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
                errors.password
                  ? 'border-red-400 bg-red-50 ring-1 ring-red-300'
                  : 'border-[#c3c6d7]/60 bg-[#f2f4f6] focus-within:border-[#004ac6]/50 focus-within:ring-2 focus-within:ring-[#004ac6]/15'
              }`}>
                <span className="material-symbols-outlined text-[#737686] text-[20px] leading-none shrink-0">lock</span>
                <input id="password" name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="w-full bg-transparent border-none outline-none text-[#191c1e] text-sm placeholder:text-[#737686]" />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  className="text-[#737686] hover:text-[#191c1e] transition-colors shrink-0">
                  <span className="material-symbols-outlined text-[20px] leading-none">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] leading-none">warning</span>
                  {errors.password}
                </p>
              )}
              {strength && !errors.password && (
                <div className="space-y-1 pt-0.5">
                  <div className="w-full bg-[#e6e8ea] h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: strength.w }} />
                  </div>
                  <p className="text-[11px] text-[#434655]">
                    Strength: <span className="font-semibold">{strength.label}</span>
                  </p>
                </div>
              )}
            </div>

            <Field id="confirmPassword" name="confirmPassword" label="Confirm password"
              autoComplete="new-password" placeholder="Re-enter your password" icon="lock_open"
              value={form.confirmPassword} onChange={handleChange}
              error={errors.confirmPassword}
              showToggle visible={showConfirm} onToggle={() => setShowConfirm(p => !p)} />

            <p className="text-xs text-[#434655] leading-relaxed pt-1">
              By creating an account you agree to our{' '}
              <span className="text-[#004ac6] font-medium cursor-pointer hover:underline">Terms of Service</span>
              {' '}and{' '}
              <span className="text-[#004ac6] font-medium cursor-pointer hover:underline">Privacy Policy</span>.
            </p>

            <button type="submit" disabled={isSubmitting}
              className="w-full py-3.5 bg-[#004ac6] hover:bg-[#003da8] text-white font-semibold rounded-2xl
                shadow-md shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-60
                disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <span className="material-symbols-outlined text-[18px] leading-none">auto_awesome</span>
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#c3c6d7]/40" />
            <span className="text-xs text-[#737686]">or</span>
            <div className="flex-1 h-px bg-[#c3c6d7]/40" />
          </div>

          <p className="text-center text-sm text-[#434655]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#004ac6] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-[#434655] hover:text-[#004ac6] transition-colors">
            <span className="material-symbols-outlined text-[16px] leading-none">arrow_back</span>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
