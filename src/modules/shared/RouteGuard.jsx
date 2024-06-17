import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/global/authContext'

import { useContext } from 'react'

const RouteGuard = () => {
  const { user } = useContext(AuthContext)
  const isAuthenticated = user.isAuthenticated
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  } else {
    return <Outlet />
  }
}

export default RouteGuard
