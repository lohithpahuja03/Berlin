'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/index';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: () => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('berlin_auth_token');
      const savedUser = localStorage.getItem('berlin_auth_user');
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // Ignored
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        // Fallback demo check if backend is not running
        if (email.toLowerCase() === 'demo@berlin.food' && password === 'Berlin123!') {
          return handleLocalDemoLogin();
        }
        return { success: false, error: data.error || 'Invalid credentials' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('berlin_auth_token', data.token);
      localStorage.setItem('berlin_auth_user', JSON.stringify(data.user));
      setIsAuthModalOpen(false);
      showToast(`Welcome back, ${data.user.name}!`, 'Logged in successfully', 'success');
      return { success: true };
    } catch {
      // Offline fallback for demo user
      if (email.toLowerCase() === 'demo@berlin.food' && password === 'Berlin123!') {
        return handleLocalDemoLogin();
      }
      return { success: false, error: 'Could not connect to authentication server.' };
    }
  };

  const handleLocalDemoLogin = () => {
    const demoUser: User = {
      id: 'usr-demo-01',
      name: 'Max Keller',
      email: 'demo@berlin.food',
      phone: '+91 98765 01234',
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    const mockToken = 'mock-jwt-token-berlin-demo';
    setUser(demoUser);
    setToken(mockToken);
    localStorage.setItem('berlin_auth_token', mockToken);
    localStorage.setItem('berlin_auth_user', JSON.stringify(demoUser));
    setIsAuthModalOpen(false);
    showToast('Logged in as Demo User', 'Welcome back, Max!', 'success');
    return { success: true };
  };

  const loginAsDemo = () => {
    handleLocalDemoLogin();
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('berlin_auth_token', data.token);
      localStorage.setItem('berlin_auth_user', JSON.stringify(data.user));
      setIsAuthModalOpen(false);
      showToast(`Welcome to Berlin, ${data.user.name}!`, 'Account created successfully', 'success');
      return { success: true };
    } catch {
      // Local fallback creation
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
        phone,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
      const mockToken = `mock-token-${Date.now()}`;
      setUser(newUser);
      setToken(mockToken);
      localStorage.setItem('berlin_auth_token', mockToken);
      localStorage.setItem('berlin_auth_user', JSON.stringify(newUser));
      setIsAuthModalOpen(false);
      showToast(`Welcome to Berlin, ${name}!`, 'Account created successfully', 'success');
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('berlin_auth_token');
    localStorage.removeItem('berlin_auth_user');
    showToast('Logged Out', 'You have been safely signed out.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        loginAsDemo,
        logout,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
