//react
import { useState } from 'react'
// react-router-dom
import { useNavigate } from 'react-router-dom'
// react-hook-form
import { useForm } from 'react-hook-form'
// axios
import axios from 'axios'
// toast
import { notify } from '../../utils/notify'

const useReset = () => {
  // initialize navigate to redirect to another page
  const navigate = useNavigate()
  // LoadingState
  const [btnLoading, setBtnLoading] = useState(false)
  // password visibility state
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Destructure register, handleSubmit, errors from useForm() hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  // onSubmit function
  const onSubmit = async (data) => {
    // console.log(data)
    // API call
    try {
      // * Start Loading
      setBtnLoading(true)
      const response = await axios.post(
        'https://upskilling-egypt.com:3006/api/v1/Users/Reset',
        data
      )
      console.log(response.data)
      // * Success:
      // Show success message
      notify('success', 'Password has been updated successfully, please login.')
      //Redirect to login page
      navigate('/login')
    } catch (error) {
      // console.log(error.message)
      // Show error message
     notify('error', error.response.data.message)
    } finally {
      // * End Loading
      setBtnLoading(false)
    }
  }

  return {
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
  }
}

export default useReset
