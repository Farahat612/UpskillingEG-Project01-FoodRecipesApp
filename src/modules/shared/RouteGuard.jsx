import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/global/authContext'
import PropTypes from 'prop-types'

import { LoadingScreen } from '.'
import { useContext } from 'react'

const RouteGuard = ({ mode }) => {
  const { isLoading } = useContext(AuthContext)
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
