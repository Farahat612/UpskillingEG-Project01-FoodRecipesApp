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




const useForgot = () => {
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
    // console.log(data)
    // API call
    try {
      setBtnLoading(true)
      const response = await apiPublic.post('/Users/Reset/Request', data)
      console.log(response.data)
      // * Success:
      // Show success message
     notify(
       'success',
       'Your request is being processed, please check your email.'
     )
      // Redirect to reset password page
      navigate('/auth/resetpass')
    } catch (error) {
      // console.log(error.message)
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

export default useForgot
