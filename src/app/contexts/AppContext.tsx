import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type UserRole = 'ADMIN' | 'ADVISOR' | 'USER';

export interface User {
  email: string;
  name: string;
  role: UserRole;
  id?: string;
  age?: number;
  phoneNumber?: string;
  avatar?: string;
}

interface SessionData {
  user: User;
  token: string;
  loginTime: number;
}

interface AppContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  requestOtp: (email: string, name: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, otp: string, name: string, password: string, role: string, age?: number, phoneNumber?: string) => Promise<{ success: boolean; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  userRole: UserRole;
  selectedFunds: string[];
  toggleFundSelection: (fundId: string) => void;
  clearSelectedFunds: () => void;
  setUserRole: (role: UserRole) => void;
}

const AUTH_STORAGE_KEY = 'fundinsight_session';
const AppContext = createContext<AppContextType | undefined>(undefined);

function getStoredSession(): SessionData | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const storedSession = getStoredSession();
  const [user, setUser] = useState<User | null>(storedSession?.user ?? null);
  const [token, setToken] = useState<string | null>(storedSession?.token ?? null);
  const [userRole, setUserRoleState] = useState<UserRole>(user?.role ?? 'USER');
  const [selectedFunds, setSelectedFunds] = useState<string[]>([]);
  const toggleFundSelection = (fundId: string) => {
    setSelectedFunds((prev) => prev.includes(fundId) ? prev.filter((id) => id !== fundId) : [...prev, fundId]);
  };
  const clearSelectedFunds = () => setSelectedFunds([]);

  useEffect(() => {
    if (user && token) {
      const session: SessionData = { user, token, loginTime: Date.now() };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      setUserRoleState(user.role);
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user, token]);

  const login = async (email: string, password: string) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Invalid email or password');
      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const requestOtp = async (email: string, name: string) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${baseUrl}/api/v1/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to request OTP');
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email: string, otp: string, name: string, password: string, role: string, age?: number, phoneNumber?: string) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${baseUrl}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, name, password, role, age, phoneNumber }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Registration failed');
      }
      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${baseUrl}/api/v1/users/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to change password');
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const deleteAccount = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${baseUrl}/api/v1/users/delete-account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete account');
      }
      logout();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearSelectedFunds();
  };

  return (
    <AppContext.Provider value={{
      user, token, isAuthenticated: !!user, login, requestOtp, register, logout, userRole,
      changePassword, deleteAccount,
      selectedFunds, toggleFundSelection, clearSelectedFunds,
      setUserRole: setUserRoleState
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

