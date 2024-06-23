/* eslint-disable react-refresh/only-export-components */
import { jwtDecode } from 'jwt-decode'
import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    return {
      isAuthenticated: token ? true : false,
      userData: token ? jwtDecode(token) : null,
      userType: token ? jwtDecode(token).userGroup : null,
    }
  })

  const login = (token) => {
    setIsLoading(true)
    localStorage.setItem('token', token)
    setUser({
      isAuthenticated: token ? true : false,
      userData: token ? jwtDecode(token) : null,
      userType: token ? jwtDecode(token).userGroup : null,
    })
    setIsLoading(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser({
      isAuthenticated: false,
      userData: null,
      userType: null,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

AuthProvider.propTypes = {
  children: PropTypes.node,
}
