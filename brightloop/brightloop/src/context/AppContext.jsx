import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { initialData } from '../data/mockData'

const AppContext = createContext(null)
const STORAGE_KEY = 'brightloop-data-v1'

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('brightloop-theme') || 'light')
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialData } catch { return initialData }
  })
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('brightloop-user')) } catch { return null }
  })
  const [toast, setToast] = useState(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('brightloop-theme', theme)
  }, [theme])
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(data)), [data])
  useEffect(() => {
    if (user) localStorage.setItem('brightloop-user', JSON.stringify(user))
    else localStorage.removeItem('brightloop-user')
  }, [user])
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(timer)
  }, [toast])

  const actions = useMemo(() => ({
    add: (resource, item) => setData((current) => ({ ...current, [resource]: [item, ...current[resource]] })),
    update: (resource, item) => setData((current) => ({ ...current, [resource]: current[resource].map((entry) => entry.id === item.id ? item : entry) })),
    remove: (resource, id) => setData((current) => ({ ...current, [resource]: current[resource].filter((entry) => entry.id !== id) })),
    notify: (message, type = 'success') => setToast({ message, type }),
  }), [])

  return <AppContext.Provider value={{ theme, setTheme, data, user, setUser, toast, ...actions }}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
