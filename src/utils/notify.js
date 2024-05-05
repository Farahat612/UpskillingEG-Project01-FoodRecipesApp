import { toast } from 'react-toastify'

export const notify = (type, message, time) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        autoClose: time || 2500,
      })
      break
    case 'error':
      toast.error(message, {
        autoClose: time || 2500,
      })
      break
    case 'warning':
      toast.warning(message, {
        autoClose: time || 2500,
      })
      break
    case 'info':
      toast.info(message, {
        autoClose: time || 2500,
      })
      break
    default:
      toast(message, {
        autoClose: time || 2500,
      })
  }
}
