/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import PropTypes from 'prop-types'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)

  const saveUser = () => {
    setIsLoading(true)
    const token = localStorage.getItem('token')
    token && setUser(jwtDecode(token))
    setIsLoading(false)
  }

  const logout = () => {
    setIsLoading(true)
    localStorage.removeItem('token')
    setUser(null)
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{ isLoading, setIsLoading, user, saveUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}
