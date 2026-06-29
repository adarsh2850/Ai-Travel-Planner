import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || '/';

  // If already logged in, go home
  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Please enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setIsSubmitting(true);
    setServerError('');
    try {
      await login({ email: form.email, password: form.password });
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-4 py-12 relative">
      {/* Blurred background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-[#004ac6] text-3xl leading-none">explore</span>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Lumina Travel
            </span>
          </Link>
          <h1 className="text-[28px] font-bold text-[#191c1e] mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Welcome back
          </h1>
          <p className="text-[#434655] mt-1.5 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            Sign in to continue planning your adventures
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[28px] shadow-xl p-8">
          {/* Server error */}
          {serverError && (
            <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
              <span className="material-symbols-outlined text-red-600 text-[20px] shrink-0 leading-none">error</span>
              <p className="text-sm text-red-700 font-medium leading-snug">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-semibold text-[#191c1e]"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Email address
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
                errors.email
                  ? 'border-red-400 bg-red-50 ring-1 ring-red-300'
                  : 'border-[#c3c6d7]/60 bg-[#f2f4f6] focus-within:border-[#004ac6]/50 focus-within:ring-2 focus-within:ring-[#004ac6]/15'
              }`}>
                <span className="material-symbols-outlined text-[#737686] text-[20px] leading-none shrink-0">email</span>
                <input
                  id="email" name="email" type="email" autoComplete="email"
                  value={form.email} onChange={handleChange} placeholder="you@example.com"
                  className="w-full bg-transparent border-none outline-none text-[#191c1e] text-sm placeholder:text-[#737686]"
                  aria-invalid={Boolean(errors.email)}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] leading-none">warning</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-semibold text-[#191c1e]"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
                  Password
                </label>
                <button type="button" className="text-xs text-[#004ac6] hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
                errors.password
                  ? 'border-red-400 bg-red-50 ring-1 ring-red-300'
                  : 'border-[#c3c6d7]/60 bg-[#f2f4f6] focus-within:border-[#004ac6]/50 focus-within:ring-2 focus-within:ring-[#004ac6]/15'
              }`}>
                <span className="material-symbols-outlined text-[#737686] text-[20px] leading-none shrink-0">lock</span>
                <input
                  id="password" name="password" type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password" value={form.password} onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-transparent border-none outline-none text-[#191c1e] text-sm placeholder:text-[#737686]"
                  aria-invalid={Boolean(errors.password)}
                />
                <button type="button" onClick={() => setShowPassword((p) => !p)}
                  className="text-[#737686] hover:text-[#191c1e] transition-colors shrink-0"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
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
            </div>

            {/* Submit button */}
            <button type="submit" disabled={isSubmitting}
              className="w-full py-3.5 bg-[#004ac6] hover:bg-[#003da8] text-white font-semibold rounded-2xl
                shadow-md shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-60
                disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm mt-1">
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined text-[18px] leading-none">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#c3c6d7]/40" />
            <span className="text-xs text-[#737686]">or</span>
            <div className="flex-1 h-px bg-[#c3c6d7]/40" />
          </div>

          <p className="text-center text-sm text-[#434655]">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-[#004ac6] font-semibold hover:underline">
              Create one now
            </Link>
          </p>
        </div>

        {/* Back to home */}
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
