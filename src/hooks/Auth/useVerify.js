//react
import { useState } from 'react'
// react-router-dom
import { useNavigate } from 'react-router-dom'
// react-hook-form
import { useForm } from 'react-hook-form'
// axios
import { apiPublic } from '../../utils/api.js'
// toast
import { notify } from '../../utils/notify'

const useVerify = () => {
  // initialize navigate to redirect to another page
  const navigate = useNavigate()
  // LoadingState
  const [btnLoading, setBtnLoading] = useState(false)

  // Destructure register, handleSubmit, errors from useForm() hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // onSubmit function
  const onSubmit = async (data) => {
    // API call
    try {
      setBtnLoading(true)
      const response = await apiPublic.post('/Users/verify', data)

      // * Success:
      // Show success message
      notify('success', response.data.message)
      // Redirect to reset password page
      navigate('/login')
    } catch (error) {
      // Show error message
      notify('error', error.response.data.message)
    } finally {
      setBtnLoading(false)
    }
  }
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    btnLoading,
  }
}

export default useVerify
