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
import { toast } from 'react-toastify'

const useChange = () => {
  // context
  const { logout } = useAuth()
  // navigate initialization
  const navigate = useNavigate()
  // Loading State
  const [btnLoading, setBtnLoading] = useState(false)
  // password visibility states
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // onSubmit function
  const onSubmit = async (data) => {
    // console.log(data)
    // API call
    try {
      // * Start Loading
      setBtnLoading(true)
      const response = await axios.put(
        'https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword',
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      console.log(response.data)
      // * Success:
      // Show success message
      toast.success('Password has been changed successfully, please login.', {
        autoClose: 2000,
      })
      // Close Modal
      // closeModal()
      // logout
      logout()
      // navigate to login
      navigate('/login')
    } catch (error) {
      console.log(error.response)
      // Show error message
      toast.error(error.response.data.message, { autoClose: 2000 })
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
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmNewPassword,
    setShowConfirmNewPassword,
  }
}

export default useChange
