import { useReset } from '../../hooks/Auth'

import { AuthLayout } from '../../layouts'
import { AuthForm } from '../../components/auth'
import { LoadingSpinner } from '../../components/shared'
import { Form, InputGroup } from 'react-bootstrap'
import { FaEnvelope, FaEye, FaEyeSlash, FaKey, FaLock } from 'react-icons/fa'

const ResetPass = () => {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    onSubmit,
    btnLoading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useReset()
  return (
    <AuthLayout>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>Reset Password</h3>
          <p className='text-muted'>
            Please Enter OTP sent to your email and new password.
          </p>

          {/* Email */}
          <InputGroup className='mt-4 mb-2'>
            <InputGroup.Text id='basic-addon1'>
              <FaEnvelope />
            </InputGroup.Text>
            <Form.Control
              type='text'
              placeholder='Email'
              aria-label='Email'
              aria-describedby='basic-addon1'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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

          {/* OTP */}
          <InputGroup className='mb-2'>
            <InputGroup.Text id='basic-addon2'>
              <FaKey />
            </InputGroup.Text>
            <Form.Control
              type='text'
              placeholder='OTP'
              aria-label='OTP'
              aria-describedby='basic-addon2'
              {...register('seed', {
                required: 'OTP is required',
              })}
            />
          </InputGroup>
          {errors.seed && (
            <div className='alert alert-danger py-1'>{errors.seed.message}</div>
          )}

          {/* password */}

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
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                },
              })}
            />
            <InputGroup.Text
              id='basic-addon2'
              onClick={() => setShowPassword(!showPassword)}
              className='cursor-pointer'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
          {errors.password && (
            <div className='alert alert-danger py-1'>
              {errors.password.message}
            </div>
          )}

          {/* confirm password */}

          <InputGroup className='mb-2'>
            <InputGroup.Text id='basic-addon2'>
              <FaLock />
            </InputGroup.Text>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              aria-label='Confirm Password'
              aria-describedby='basic-addon2'
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === watch('password') || 'The passwords do not match',
              })}
            />
            <InputGroup.Text
              id='basic-addon2'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='cursor-pointer'
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
          {errors.confirmPassword && (
            <div className='alert alert-danger py-1'>
              {errors.confirmPassword.message}
            </div>
          )}

          {/* Submit Button */}
          <button type='submit' className='btn btn-success w-100 mt-3'>
            {btnLoading ? (
              <LoadingSpinner loadingTxt='Resetting password' />
            ) : (
              'Reset Password'
            )}
          </button>
        </Form>
      </AuthForm>
    </AuthLayout>
  )
}

export default ResetPass
