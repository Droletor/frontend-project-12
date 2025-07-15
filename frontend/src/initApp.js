import socket from './services/initSocket.js'
import i18n from './services/i18n.js'

const initApp = () => {
  i18n.t()
  return { socket }
}

export default initApp