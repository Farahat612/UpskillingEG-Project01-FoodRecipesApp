import { useChange } from '../../hooks/Auth'

import AuthForm from './components/AuthForm'
import { LoadingSpinner } from '../shared'
import { Form, InputGroup } from 'react-bootstrap'
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'

const ChangePass = () => {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    onSubmit,
    btnLoading,
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmNewPassword,
    setShowConfirmNewPassword,
  } = useChange()
  return (
    <AuthForm>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3>Change Your Password</h3>
        <p className='text-muted'>Please, enter the following details.</p>

        {/* Old Password */}
        <InputGroup className='mt-4 mb-2'>
          <InputGroup.Text id='basic-addon1'>
            <FaLock />
          </InputGroup.Text>
          <Form.Control
            type={showOldPassword ? 'text' : 'password'}
            placeholder='Old Password'
            aria-label='Old Password'
            aria-describedby='basic-addon1'
            {...register('oldPassword', {
              required: 'Password is required',
            })}
          />
          <InputGroup.Text
            onClick={() => setShowOldPassword(!showOldPassword)}
            className='cursor-pointer'
          >
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
        {errors.oldPassword && (
          <div className='alert alert-danger py-1'>
            {errors.oldPassword.message}
          </div>
        )}

        {/* New Password */}
        <InputGroup className='mb-2'>
          <InputGroup.Text id='basic-addon2'>
            <FaLock />
          </InputGroup.Text>
          <Form.Control
            type={showNewPassword ? 'text' : 'password'}
            placeholder='New Password'
            aria-label='New Password'
            aria-describedby='basic-addon2'
            {...register('newPassword', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message:
                  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
              },
            })}
          />
          <InputGroup.Text
            onClick={() => setShowNewPassword(!showNewPassword)}
            className='cursor-pointer'
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
        {errors.newPassword && (
          <div className='alert alert-danger py-1'>
            {errors.newPassword.message}
          </div>
        )}

        {/* Confirm New Password */}
        <InputGroup className='mb-2'>
          <InputGroup.Text id='basic-addon3'>
            <FaLock />
          </InputGroup.Text>
          <Form.Control
            type={showConfirmNewPassword ? 'text' : 'password'}
            placeholder='Confirm New Password'
            aria-label='Confirm New Password'
            aria-describedby='basic-addon3'
            {...register('confirmNewPassword', {
              required: 'Confirm Password is required',
              validate: (value) =>
                value === watch('newPassword') || 'The passwords do not match',
            })}
          />
          <InputGroup.Text
            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            className='cursor-pointer'
          >
            {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
        {errors.confirmNewPassword && (
          <div className='alert alert-danger py-1'>
            {errors.confirmNewPassword.message}
          </div>
        )}

        {/* Submit Button */}
        <button type='submit' className='btn btn-success w-100 mt-3'>
          {btnLoading ? (
            <LoadingSpinner loadingTxt='Changing password' />
          ) : (
            'Change Password'
          )}
        </button>
      </Form>
    </AuthForm>
  )
}

export default ChangePass
