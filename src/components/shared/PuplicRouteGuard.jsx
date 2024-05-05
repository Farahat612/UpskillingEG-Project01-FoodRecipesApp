import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

import { LoadingScreen } from './'

const PublicRouteGuard = () => {
  const { user, isLoading } = useAuth()

  if (isLoading)
    return (
      <>
        <div className='vw-100 vh-100 d-flex justify-content-center align-items-center gap-4 flex-column'>
          <LoadingScreen />
        </div>
      </>
    )

  return !user ? <Outlet /> : <Navigate to='/login' />
}

export default PublicRouteGuard
