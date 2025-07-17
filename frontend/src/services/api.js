import axios from 'axios'
import { toast } from 'react-toastify'

const handlers = {
  logout: null,
  navigate: null,
}

export const setLogoutHandler = (logoutFn) => {
  handlers.logout = logoutFn
}

export const setNavigateHandler = (navigateFn) => {
  handlers.navigate = navigateFn
}

const api = axios.create({
  baseURL: '/',
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Unauthorized. Redirecting...', { toastId: 'unauthorized-error' })
      if (handlers.logout) handlers.logout()
      if (handlers.navigate) handlers.navigate('/login')
    }
    return Promise.reject(error)
  },
)

export default api
