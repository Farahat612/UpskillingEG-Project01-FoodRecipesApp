import { useRegister } from '../../hooks/Auth'
import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '../../layouts'
import { AuthForm } from '../../components/auth'
import { LoadingSpinner } from '../../components/shared'
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaFlag,
  FaPhoneAlt,
  FaUser,
  FaImage,
} from 'react-icons/fa'
import { Form, InputGroup } from 'react-bootstrap'

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    btnLoading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    previewImage,
    handleImageChange,
  } = useRegister()

  return (
    <AuthLayout>
      <div className='col-md-7'>
        <AuthForm>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h3>Register</h3>
            <p className='text-muted'>
              Welcome! Please fill in your information to create an account.
            </p>

            {/* usename and email */}
            <div className='row my-3'>
              {/* username */}
              <div className='col-md-6'>
                <InputGroup className=''>
                  <InputGroup.Text id='basic-addon1'>
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Username'
                    aria-label='Username'
                    aria-describedby='basic-addon1'
                    {...register('userName', {
                      required: 'username is required',
                    })}
                  />
                </InputGroup>
                {errors.userName && (
                  <div className='alert alert-danger py-1 mt-2'>
                    {errors.userName.message}
                  </div>
                )}
              </div>
              {/* email */}
              <div className='col-md-6'>
                <InputGroup className=''>
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
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                </InputGroup>
                {errors.email && (
                  <div className='alert alert-danger py-1 mt-2'>
                    {errors.email.message}
                  </div>
                )}
              </div>
            </div>

            {/* country and Phone Number */}
            <div className='row my-3'>
              {/* country */}
              <div className='col-md-6'>
                <InputGroup className=''>
                  <InputGroup.Text id='basic-addon1'>
                    <FaFlag />
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Country'
                    aria-label='Country'
                    aria-describedby='basic-addon1'
                    {...register('country', {
                      required: 'Country is required',
                    })}
                  />
                </InputGroup>
                {errors.country && (
                  <div className='alert alert-danger py-1 mt-2'>
                    {errors.country.message}
                  </div>
                )}
              </div>
              {/* phone number */}
              <div className='col-md-6'>
                <InputGroup className=''>
                  <InputGroup.Text id='basic-addon1'>
                    <FaPhoneAlt />
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Phone Number'
                    aria-label='Phone Number'
                    aria-describedby='basic-addon1'
                    {...register('phoneNumber', {
                      required: 'Phone Number is required',
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: 'Invalid Phone Number',
                      },
                    })}
                  />
                </InputGroup>
                {errors.phoneNumber && (
                  <div className='alert alert-danger py-1 mt-2'>
                    {errors.phoneNumber.message}
                  </div>
                )}
              </div>
            </div>

            {/* Password and confirm Password*/}
            <div className='row my-3'>
              {/* password */}
              <div className='col-md-6'>
                <InputGroup className=''>
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
                  <div className='alert alert-danger py-1 mt-2'>
                    {errors.password.message}
                  </div>
                )}
              </div>
              {/* confirm password */}
              <div className='col-md-6'>
                <InputGroup className=''>
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
                        value === watch('password') ||
                        'The passwords do not match',
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
                  <div className='alert alert-danger py-1 mt-2'>
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Image */}
            <div className='row my-3'>
              <InputGroup className=''>
                <InputGroup.Text id='basic-addon1'>
                  <FaImage />
                </InputGroup.Text>
                <Form.Control
                  className={previewImage ? 'me-2' : ''}
                  type='file'
                  placeholder='Profile Image'
                  aria-label='Profile Image'
                  aria-describedby='basic-addon1'
                  {...register('profileImage')}
                  onChange={handleImageChange}
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt='profile'
                    className='img-fluid rounded-2'
                    style={{
                      objectFit: 'cover',
                      height: '38px',
                      width: '60px',
                    }}
                  />
                )}
              </InputGroup>
            </div>

            {/* Regiter Now? & Forgot Password? */}
            <div className='d-flex justify-content-center mt-5'>
              <span
                className='text-success cursor-pointer '
                onClick={() => navigate('/login')}
              >
                Already have an account? Login
              </span>
            </div>

            {/* Login Button */}
            <button type='submit' className='btn btn-success w-100 mt-3'>
              {btnLoading ? (
                <LoadingSpinner loadingTxt='Registering' />
              ) : (
                'Register'
              )}
            </button>
          </Form>
        </AuthForm>
      </div>
    </AuthLayout>
  )
}

export default Register
