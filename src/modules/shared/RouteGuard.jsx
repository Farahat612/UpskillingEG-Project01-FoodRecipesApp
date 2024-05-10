import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/global/authContext'
import { useEffect } from 'react'

import PropTypes from 'prop-types'

import { LoadingScreen } from '.'
import { useContext } from 'react'

const RouteGuard = ({ mode }) => {
  const { isLoading } = useContext(AuthContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (mode === 'private' && !token) {
      navigate('/login')
    }
    if (mode === 'public' && token) {
      navigate('/')
    }
  }, [token, navigate, mode])

  if (isLoading)
    return (
      <>
        <div className='vw-100 vh-100 d-flex justify-content-center align-items-center gap-4 flex-column'>
          <LoadingScreen />
        </div>
      </>
    )

  if (mode === 'public') {
    return token ? null : <Outlet />
  } else {
    return token ? <Outlet /> : null
  }
}

export default RouteGuard

RouteGuard.propTypes = {
  mode: PropTypes.string.isRequired,
}
