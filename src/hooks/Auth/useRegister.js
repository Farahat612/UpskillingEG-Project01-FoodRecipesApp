//react
import { useState } from 'react'
// react-router-dom
import { useNavigate } from 'react-router-dom'
// react-hook-form
import { useForm } from 'react-hook-form'
// utils
import { apiPublic } from '../../utils/api.js'
import { notify } from '../../utils/notify'
import { appendFormData } from '../../utils/formData'

const useRegister = () => {
  // LoadingState
  const [btnLoading, setBtnLoading] = useState(false)
  // password visibility state
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // initialize navigate to redirect to another page
  const navigate = useNavigate()
  // Save user data to context

  // Destructure register, handleSubmit, errors from useForm() hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  // onSubmit function
  const onSubmit = async (data) => {
    const formData = appendFormData(data)
    try {
      setBtnLoading(true)
      const response = await apiPublic.post('/Users/Register', formData)
      notify('success', response.data.message)
      navigate('/verifyPass')
    } catch (error) {
      console.log(error)
      notify('error', error.response.data.message)
    } finally {
      setBtnLoading(false)
    }
  }

  // preview image
  const [previewImage, setPreviewImage] = useState(null)
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  return {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    btnLoading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    previewImage,
    handleImageChange,
  }
}

export default useRegister
