import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

import { LoadingScreen } from './'

const RouteGuard = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <LoadingScreen />

  return user ? <Outlet /> : <Navigate to='/login' />
}

export default RouteGuard
