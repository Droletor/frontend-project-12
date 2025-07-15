import {
  Button, Col, Container, Row,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useTranslation } from 'react-i18next'

const Page404 = () => {
  const { t } = useTranslation()

  return  (
    <Container fluid className="d-flex flex-column h-100">
      <Header />
      <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
        <Row>
          <Col className="text-center">
            <h1 className="display-1">404</h1>
            <h2 className="mb-4">{t('notFound.title')}</h2>
            <Button as={Link} to="/" variant="primary">
              {t('notFound.return')}
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Page404