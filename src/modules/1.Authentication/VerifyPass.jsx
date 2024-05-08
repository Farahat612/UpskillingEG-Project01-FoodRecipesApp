import { useVerify } from '../../hooks/Auth'

import { AuthLayout } from '../../layouts'
import AuthForm from './components/AuthForm'
import { LoadingSpinner } from '../shared'
import { Form, InputGroup } from 'react-bootstrap'
import { FaEnvelope, FaKey } from 'react-icons/fa'

const VerifyPass = () => {
  const { register, handleSubmit, errors, onSubmit, btnLoading } = useVerify()
  return (
    <AuthLayout>
      <div className='col-md-6'>
        <AuthForm>
          <Form
            onSubmit={handleSubmit((data) => {
              onSubmit(data)
            })}
          >
            <h3>Verify Your Email</h3>
            <p className='text-muted'>
              Enter your email address and the verification code sent.
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

            {/* Verification Code */}
            <InputGroup className='mb-2'>
              <InputGroup.Text id='basic-addon2'>
                <FaKey />
              </InputGroup.Text>
              <Form.Control
                type='text'
                placeholder='Verification Code'
                aria-label='Verification Code'
                aria-describedby='basic-addon2'
                {...register('code', {
                  required: 'Verification code is required',
                })}
              />
            </InputGroup>
            {errors.code && (
              <div className='alert alert-danger py-1'>
                {errors.code.message}
              </div>
            )}

            {/* Submit Button */}
            <button type='submit' className='btn btn-success w-100 mt-3'>
              {btnLoading ? (
                <LoadingSpinner loadingTxt='Verifying' />
              ) : (
                'Verify'
              )}
            </button>
          </Form>
        </AuthForm>
      </div>
    </AuthLayout>
  )
}

export default VerifyPass
