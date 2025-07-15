import axios from 'axios'
import apiRoutes from '../services/route.js'
import { channelsActions } from './channelsSlice.js'
import { messagesActions } from './messagesSlice.js'
import { toast } from 'react-toastify'

export const fetchChannels = headers => async (dispatch) => {
  try {
    const { data } = await axios.get(apiRoutes.channelsPath(), { headers })
    dispatch(channelsActions.setChannels(data))
  }
  catch {
    toast.error('notifications.fetchError')
  }
}

export const fetchMessages = headers => async (dispatch) => {
  try {
    const { data } = await axios.get(apiRoutes.messagesPath(), { headers })
    dispatch(messagesActions.setMessages(data))
  }
  catch {
    toast.error('notifications.fetchError')
  }
}