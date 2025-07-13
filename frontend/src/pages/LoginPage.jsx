import { useState } from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form as RBForm,
  Image,
  Row,
} from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import routes from '../services/clientRoutes.js'

const LoginPage = () => {
  const [loginError] = useState(null)

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'login.errors.min3')
      .required('login.errors.required'),
    password: Yup.string()
      .min(3, 'login.errors.min3')
      .required('login.errors.required'),
  })

  const handleSubmit = () => console.log('Not Yet Implemented')

  return (
    <Container fluid className="h-100 bg-light">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Image
                  src="https://frontend-chat-ru.hexlet.app/assets/avatar-DIE1AEpS.jpg"
                  roundedCircle
                  alt={'login.title'}
                />
              </Col>
              <Col md={6} className="mt-3 mt-md-0">
                <h1 className="text-center mb-4">{'login.title'}</h1>

                {loginError && (
                  <div style={{ color: 'red' }} className="mb-3">
                    {loginError}
                  </div>
                )}

                <Formik
                  initialValues={{ username: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <FloatingLabel
                        controlId="username"
                        label={'login.placeholder.username'}
                        className="mb-3"
                      >
                        <Field
                          as={RBForm.Control}
                          type="text"
                          name="username"
                          placeholder={'login.placeholder.username'}
                          isInvalid={touched.username && !!errors.username}
                        />
                        <RBForm.Control.Feedback type="invalid">
                          {errors.username}
                        </RBForm.Control.Feedback>
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="password"
                        label={'login.placeholder.password'}
                        className="mb-4"
                      >
                        <Field
                          as={RBForm.Control}
                          type="password"
                          name="password"
                          placeholder={'login.placeholder.password'}
                          isInvalid={touched.password && !!errors.password}
                        />
                        <RBForm.Control.Feedback type="invalid">
                          {errors.password}
                        </RBForm.Control.Feedback>
                      </FloatingLabel>

                      <Button
                        type="submit"
                        variant="outline-primary"
                        className="w-100 mb-3"
                        disabled={isSubmitting}
                      >
                        {'login.button'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{'login.noAccount'}</span>
                {' '}
                <Card.Link href={routes.signup}>{'login.signupLink'}</Card.Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage