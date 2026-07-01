import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // true while verifying stored token
  const [error, setError] = useState(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('sarthiai_token');
    const storedUser = localStorage.getItem('sarthiai_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('sarthiai_token');
        localStorage.removeItem('sarthiai_user');
      }
    }
    setLoading(false);
  }, []);

  const persistSession = (userData, tokenValue) => {
    localStorage.setItem('sarthiai_token', tokenValue);
    localStorage.setItem('sarthiai_user', JSON.stringify(userData));
    setToken(tokenValue);
    setUser(userData);
    setError(null);
  };

  const clearSession = () => {
    localStorage.removeItem('sarthiai_token');
    localStorage.removeItem('sarthiai_user');
    setToken(null);
    setUser(null);
  };

  const signup = useCallback(async ({ name, email, password }) => {
    setError(null);
    try {
      const res = await authAPI.signup({ name, email, password });
      persistSession(res.data.user, res.data.token);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(message);
      throw new Error(message);
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setError(null);
    try {
      const res = await authAPI.login({ email, password });
      persistSession(res.data.user, res.data.token);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
      throw new Error(message);
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    const res = await authAPI.updateProfile(profileData);
    const updatedUser = res.data.user;
    localStorage.setItem('sarthiai_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return updatedUser;
  }, []);

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated,
        signup,
        login,
        logout,
        updateProfile,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy consumption
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;
