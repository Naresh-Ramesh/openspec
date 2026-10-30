import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_USER = {
  id: 'usr_101',
  name: 'Alex Morgan',
  email: 'alex.morgan@policymanager.io',
  role: 'Senior Policy Underwriter',
  department: 'Commercial Property & Risk',
  phone: '+1 (555) 234-5678',
  activePoliciesCount: 14,
};

const AuthContext = createContext(null);

const STORAGE_KEY = 'pm_auth_state_v1';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed?.isAuthenticated);
      }
    } catch {
      // Ignore storage read errors
    }
    return false;
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.user) return parsed.user;
      }
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_USER;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ isAuthenticated, user }));
    } catch {
      // Ignore storage write errors
    }
  }, [isAuthenticated, user]);

  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { success: false, error: 'Please provide a valid email address.' };
    }
    if (password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    // Demo authentication: allow sign in with matching or custom email
    setIsAuthenticated(true);
    setUser(prev => ({
      ...prev,
      email: email.trim().toLowerCase(),
    }));

    return { success: true };
  };

  const updateProfile = (updatedFields) => {
    if (!updatedFields.name || !updatedFields.name.trim()) {
      return { success: false, error: 'Full name cannot be blank.' };
    }
    if (!updatedFields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedFields.email.trim())) {
      return { success: false, error: 'A valid email address is required.' };
    }

    setUser(prev => ({
      ...prev,
      ...updatedFields,
      name: updatedFields.name.trim(),
      email: updatedFields.email.trim().toLowerCase(),
      phone: updatedFields.phone ? updatedFields.phone.trim() : prev.phone,
      department: updatedFields.department ? updatedFields.department.trim() : prev.department,
      role: updatedFields.role ? updatedFields.role.trim() : prev.role,
    }));

    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const resetToDefaultProfile = () => {
    setUser(DEFAULT_USER);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        updateProfile,
        logout,
        resetToDefaultProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

