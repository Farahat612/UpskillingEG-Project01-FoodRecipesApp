import { toast } from 'react-toastify'

export const notify = (type, message, time) => {
  toast[type](message, {
    autoClose: time || 2500,
  })
}
