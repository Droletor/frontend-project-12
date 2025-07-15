import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import apiRoutes, { getAuthHeader } from '../services/route.js'
import { channelsActions } from '../store/channelsSlice.js'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const RemoveChannelModal = ({ show, handleClose, channel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  if (!channel) {
    return null
  }

  const handleRemove = async () => {
    try {
      const headers = getAuthHeader()
      await axios.delete(apiRoutes.channelPath(channel.id), { headers })
      dispatch(channelsActions.removeChannel(channel.id))

      toast.success(t('notifications.channelRemoved'))
      handleClose()
    }
    catch (err) {
      toast.error(t('removeChannel.error'), err)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {channel.name}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modal.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          {t('modal.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal