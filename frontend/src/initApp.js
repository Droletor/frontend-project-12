import socket from './services/initSocket.js'
import i18n from './services/i18n.js'
import profanityInit from './services/leoProfanity.js'

const initApp = () => {
  i18n.t()
  profanityInit()
  return { socket }
}

export default initApp