import { useForgot } from '../../hooks/Auth'

import { AuthLayout } from '../../layouts'
import { AuthForm } from '../../components/auth'
import { LoadingSpinner } from '../../components/shared'
import { Form, InputGroup } from 'react-bootstrap'
import { FaEnvelope } from 'react-icons/fa'

const ForgotPass = () => {
  const { register, handleSubmit, errors, onSubmit, btnLoading } = useForgot()
  return (
    <AuthLayout>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>Forgot Your Password?</h3>
          <p className='text-muted'>
            No Worries! Enter your email address and we will send you password
            reset link.
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

          {/* Submit Button */}
          <button type='submit' className='btn btn-success w-100 mt-3'>
            {btnLoading ? (
              <LoadingSpinner loadingTxt='Resetting' />
            ) : (
              'Request Reset'
            )}
          </button>
        </Form>
      </AuthForm>
    </AuthLayout>
  )
}

export default ForgotPass
