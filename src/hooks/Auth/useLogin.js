//react
import { useState } from 'react'
// react-router-dom
import { useNavigate } from 'react-router-dom'
// react-hook-form
import { useForm } from 'react-hook-form'
// context
import { useAuth } from '../../contexts/authContext'
// axios
import axios from 'axios'
// toast
import { notify } from '../../utils/notify'

const useLogin = () => {
  // LoadingState
  const [btnLoading, setBtnLoading] = useState(false)
  // password visibility state
  const [showPassword, setShowPassword] = useState(false)
  // initialize navigate to redirect to another page
  const navigate = useNavigate()
  // Save user data to context
  const { saveUser } = useAuth()

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
      // * Start Loading
      setBtnLoading(true)
      // API call
      const response = await axios.post(
        'https://upskilling-egypt.com:3006/api/v1/Users/Login',
        data
      )
      console.log(response.data)
      // * Success:
      // Save token in local storage
      localStorage.setItem('token', response.data.token)
      // save login Data
      saveUser()
      // Show success message
      notify('success', 'Logged in successfully')
      //Redirect to dashboard
      navigate('/')
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
    onSubmit,
    btnLoading,
    showPassword,
    setShowPassword,
  }
}

export default useLogin
