import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import PropTypes from 'prop-types'

import { LoadingScreen } from './'

const RouteGuard = ({ mode }) => {
  const { isLoading } = useAuth()
  const token = localStorage.getItem('token')

  if (isLoading)
    return (
      <>
        <div className='vw-100 vh-100 d-flex justify-content-center align-items-center gap-4 flex-column'>
          <LoadingScreen />
        </div>
      </>
    )

  if (mode === 'public') {
    return token ? <Navigate to='/' /> : <Outlet />
  } else {
    return token ? <Outlet /> : <Navigate to='/login' />
  }
}

export default RouteGuard

RouteGuard.propTypes = {
  mode: PropTypes.string.isRequired,
}
