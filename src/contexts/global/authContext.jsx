/* eslint-disable react-refresh/only-export-components */
import { jwtDecode } from 'jwt-decode'
import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState('SuperAdmin')

  const saveUser = () => {
    setIsLoading(true)
    const token = localStorage.getItem('token')
    token && setUser(jwtDecode(token))
    setIsLoading(false)
  }

  const saveUserType = () => {
    setIsLoading(true)
    const token = localStorage.getItem('token')
    let userData
    token && (userData = jwtDecode(token))
    userData.userGroup === 'SuperAdmin'
      ? setUserType('SuperAdmin')
      : setUserType('SystemUser')
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
      value={{
        isLoading,
        setIsLoading,
        user,
        logout,
        saveUser,
        saveUserType,
        userType,
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
