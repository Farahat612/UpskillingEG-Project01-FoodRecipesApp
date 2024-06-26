//react
import { useContext, useState } from 'react'
// react-router-dom
import { useNavigate } from 'react-router-dom'
// react-hook-form
import { useForm } from 'react-hook-form'
// context
import { AuthContext } from '../../contexts/global/authContext.jsx'
// axios
import { apiPublic } from '../../utils/api.js' // for making API calls
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
  const { login } = useContext(AuthContext)

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
      const response = await apiPublic.post('/Users/Login', data)
      // console.log(response.data)
      // * Success:
      // save login Data
      login(response.data.token)
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
