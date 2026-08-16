import React, { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'stella_admin_auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = async (username, password) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://stella-shipping.onrender.com';
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setUser(data.user);
        localStorage.setItem('adminToken', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Tên đăng nhập hoặc mật khẩu không đúng.' };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Không thể kết nối đến máy chủ.' };
    }
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminToken');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
