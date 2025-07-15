import {
  Button, Col, Container, Row,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'

const Page404 = () => (
  <Container fluid className="d-flex flex-column h-100">
    <Header />
    <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
      <Row>
        <Col className="text-center">
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Ошибка 404. Страница не существует.</h2>
          <Button as={Link} to="/" variant="primary">
            Вернуться на главную
          </Button>
        </Col>
      </Row>
    </Container>
  </Container>
)

export default Page404