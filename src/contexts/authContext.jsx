/* eslint-disable react-refresh/only-export-components */
import { jwtDecode } from 'jwt-decode'
import { useContext, createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { apiProtected } from '../utils/api'

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

  // User Types functionality
  const [userType, setUserType] = useState('SuperAdmin')
  const getCurrentUser = async () => {
    setIsLoading(true)
    try {
      const response = await apiProtected.get('/users/currentUser')
      setUser(response.data)
      response.data.group.name === 'SuperAdmin'
        ? setUserType('SuperAdmin')
        : setUserType('SystemUser')
      return response.data
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        user,
        logout,
        saveUser,
        userType,
      }}
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
