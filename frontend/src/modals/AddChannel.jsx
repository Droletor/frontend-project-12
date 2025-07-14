import axios from 'axios'
import {
  ErrorMessage,
  Field,
  Form as FormikForm,
  Formik,
} from 'formik'
import { useEffect, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import apiRoutes, {
  getAuthHeader,
} from '../services/route.js'
import {
  channelsActions,
  selectAllChannels,
} from '../store/channelsSlice.js'

const AddChannelModal = ({ show, handleClose }) => {
  const dispatch = useDispatch()
  const channels = useSelector(selectAllChannels)
  const channelNames = channels.map(ch => ch.name)

  const inputRef = useRef(null)
  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus()
    }
  }, [show])

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'signup.errors.min3')
      .max(20, 'signup.errors.max20')
      .required('signup.errors.required')
      .notOneOf(
        channelNames,
        'renameChannel.errors.nameExists',
      ),
  })

  const handleSubmit = async (
    { name },
    { setSubmitting, setErrors },
  ) => {
    try {
      const headers = getAuthHeader()

      const { data } = await axios.post(
        apiRoutes.channelsPath(),
        { name },
        { headers },
      )

      dispatch(channelsActions.addChannel(data))
      dispatch(channelsActions.changeChannel(data.id))

      console.log('notifications.channelCreated')
      handleClose()
    }
    catch (err) {
      setErrors({ name: 'addChannel.error' })
      console.error(err)
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{'addChannel.title'}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form as={FormikForm}>
            <Modal.Body>
              <Form.Group controlId="channelName">
                <Form.Label className="visually-hidden">
                  {'addChannel.placeholder'}
                </Form.Label>
                <Field
                  as={Form.Control}
                  name="name"
                  type="text"
                  placeholder={'addChannel.placeholder'}
                  ref={inputRef}
                />
                <div className="invalid-feedback d-block">
                  <ErrorMessage name="name" />
                </div>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                {'modal.cancel'}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {'modal.submit'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AddChannelModal