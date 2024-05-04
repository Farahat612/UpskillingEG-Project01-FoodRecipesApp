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

  // creating formData
  const appendFormData = (data) => {
    const formData = new FormData()
    for (let key in data) {
      key === 'profileImage'
        ? formData.append(key, data[key][0])
        : formData.append(key, data[key])
    }
    return formData
  }

  // onSubmit function
  const onSubmit = async (data) => {
    const formData = appendFormData(data)
    try {
      setBtnLoading(true)
      const response = await axios.post(
        'https://upskilling-egypt.com:3006/api/v1/Users/Register',
        formData
      )
      toast.success(response.data.message)
      navigate('/verifyPass')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        autoClose: 2000,
      })
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
