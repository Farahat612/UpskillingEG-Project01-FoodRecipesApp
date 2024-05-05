import Logo from '../../assets/logo.png'
import PropTypes from 'prop-types'

const AuthForm = ({ children }) => {
  return (
    <div className=' bg-white p-4 rounded rounded-3'>
      {/* Logo */}
      <div className='text-center mb-4'>
        <img src={Logo} alt='logo' className='img-fluid logo w-50' />
      </div>

      {children}
    </div>
  )
}

export default AuthForm

AuthForm.propTypes = {
  children: PropTypes.node,
}
