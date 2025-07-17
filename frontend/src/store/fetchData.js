import api from '../services/api.js';
import apiRoutes from '../services/route.js'
import { channelsActions } from './channelsSlice.js'
import { messagesActions } from './messagesSlice.js'
import { toast } from 'react-toastify'

export const fetchChannels = headers => async (dispatch) => {
  try {
    const { data } = await api.get(apiRoutes.channelsPath(), { headers })
    dispatch(channelsActions.setChannels(data))
  }
  catch {
    toast.error('notifications.fetchError', { toastId: 'fetch-error', })
  }
}

export const fetchMessages = headers => async (dispatch) => {
  try {
    const { data } = await api.get(apiRoutes.messagesPath(), { headers })
    dispatch(messagesActions.setMessages(data))
  }
  catch {
    toast.error('notifications.fetchError', { toastId: 'fetch-error', })
  }
}