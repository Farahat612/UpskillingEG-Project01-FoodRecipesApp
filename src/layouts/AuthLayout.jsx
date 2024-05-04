import PropTypes from 'prop-types'

const AuthLayout = ({ children }) => {
  return (
    <div className='auth-container'>
      <div className='container-fluid vh-100 bg-overlay'>
        <div className='row vh-100 justify-content-center align-items-center '>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

AuthLayout.propTypes = {
  children: PropTypes.node,
}
