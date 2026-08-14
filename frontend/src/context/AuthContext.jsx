import React, { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'stella_admin_auth'

// Demo credentials — replace with real auth in production
const ADMIN_USERS = [
  { username: 'admin', password: 'admin123', name: 'Admin', role: 'Quản trị viên' },
  { username: 'editor', password: 'editor123', name: 'Editor', role: 'Biên tập viên' },
]

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

  const login = (username, password) => {
    const found = ADMIN_USERS.find(u => u.username === username && u.password === password)
    if (found) {
      setUser({ username: found.username, name: found.name, role: found.role })
      return { success: true }
    }
    return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng.' }
  }

  const logout = () => setUser(null)

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
