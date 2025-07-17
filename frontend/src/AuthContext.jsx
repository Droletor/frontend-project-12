/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { setLogoutHandler, setNavigateHandler } from './services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => localStorage.getItem('user'))
  const navigate = useNavigate()

  const login = (newToken, username) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', username)
    setToken(newToken)
    setUser(username)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    setLogoutHandler(logout)
    setNavigateHandler(navigate)
  }, [])

  const isAuth = Boolean(token)

  const value = useMemo(() => ({
    token,
    user,
    login,
    logout,
    isAuth,
  }), [token, user, isAuth])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)