import { useLogin } from '../../hooks/Auth'
import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '../../layouts'
import { AuthForm } from '../../components/auth'
import { LoadingSpinner } from '../../components/shared'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'
import { Form, InputGroup } from 'react-bootstrap'

const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    btnLoading,
    showPassword,
    setShowPassword,
  } = useLogin()

  return (
    <AuthLayout>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>Log In</h3>
          <p className='text-muted'>
            Welcome back, please login to your account.
          </p>

          {/* Email */}
          <InputGroup className='mt-4 mb-2'>
            <InputGroup.Text id='basic-addon1'>
              <FaEnvelope />
            </InputGroup.Text>
            <Form.Control
              type='text'
              placeholder='Email'
              aria-label='Username'
              aria-describedby='basic-addon1'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: 'Invalid email address',
                },
              })}
            />
          </InputGroup>
          {errors.email && (
            <div className='alert alert-danger py-1'>
              {errors.email.message}
            </div>
          )}

          {/* Password */}
          <InputGroup className='mb-2'>
            <InputGroup.Text id='basic-addon2'>
              <FaLock />
            </InputGroup.Text>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              aria-label='Password'
              aria-describedby='basic-addon2'
              {...register('password', {
                required: 'Password is required',
              })}
            />
            <InputGroup.Text
              id='basic-addon2'
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
          {errors.password && (
            <div className='alert alert-danger py-1'>
              {errors.password.message}
            </div>
          )}

          {/* Regiter Now? & Forgot Password? */}
          <div className='d-flex justify-content-between mb-3 '>
            <div>
              <span
                className=' text-reset cursor-pointer '
                onClick={() => navigate('/register')}
              >
                Register Now?
              </span>
            </div>
            <div>
              <span
                className='text-success cursor-pointer '
                onClick={() => navigate('/forgotpass')}
              >
                Forgot Password?
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button type='submit' className='btn btn-success w-100 mt-3'>
            {btnLoading ? <LoadingSpinner loadingTxt='Logging in' /> : 'Log In'}
          </button>
        </Form>
      </AuthForm>
    </AuthLayout>
  )
}

export default Login
