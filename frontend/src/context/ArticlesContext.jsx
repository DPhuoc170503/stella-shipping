import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const API = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/articles` : 'https://stella-shipping.onrender.com/api/articles'

const ArticlesContext = createContext(null)

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /* ── Load tất cả bài từ API ── */
  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(API)
      if (!res.ok) throw new Error('Không thể tải bài viết')
      const data = await res.json()
      setArticles(data)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  /* ── Thêm bài mới ── */
  const addArticle = useCallback(async (article) => {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(article),
      })
      if (!res.ok) throw new Error('Không thể thêm bài viết')
      const newArticle = await res.json()
      setArticles(prev => [newArticle, ...prev])
      return newArticle
    } catch (err) {
      console.error(err)
      alert('Lỗi: ' + err.message)
    }
  }, [])

  /* ── Cập nhật bài ── */
  const updateArticle = useCallback(async (id, updates) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error('Không thể cập nhật bài viết')
      const updated = await res.json()
      setArticles(prev => prev.map(a => a.id === id ? updated : a))
      return updated
    } catch (err) {
      console.error(err)
      alert('Lỗi: ' + err.message)
    }
  }, [])

  /* ── Xóa bài ── */
  const deleteArticle = useCallback(async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      })
      if (!res.ok) throw new Error('Không thể xóa bài viết')
      setArticles(prev => prev.filter(a => a.id !== id))
    } catch (err) {
      console.error(err)
      alert('Lỗi: ' + err.message)
    }
  }, [])

  /* ── Reload từ DB ── */
  const resetToSeed = useCallback(() => {
    fetchArticles()
  }, [fetchArticles])

  return (
    <ArticlesContext.Provider value={{ articles, loading, error, addArticle, updateArticle, deleteArticle, resetToSeed }}>
      {children}
    </ArticlesContext.Provider>
  )
}

export function useArticles() {
  const ctx = useContext(ArticlesContext)
  if (!ctx) throw new Error('useArticles must be used within ArticlesProvider')
  return ctx
}
