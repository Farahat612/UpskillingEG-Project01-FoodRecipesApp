//react
import { useState } from 'react'
// react-router-dom
import { useNavigate } from 'react-router-dom'
// react-hook-form
import { useForm } from 'react-hook-form'
// axios
import axios from 'axios'
// toast
import { toast } from 'react-toastify'

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
      const response = await axios.put(
        'https://upskilling-egypt.com:3006/api/v1/Users/verify',
        data
      )

      // * Success:
      // Show success message
      toast.success(response.data.message, {
        autoClose: 2000,
      })
      // Redirect to reset password page
      navigate('/login')
    } catch (error) {
      // Show error message
      toast.error(error.response.data.message, {
        autoClose: 2000,
      })
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
