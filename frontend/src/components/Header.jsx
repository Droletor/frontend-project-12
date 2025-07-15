import { Button, Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import routes from '../services/clientRoutes.js'
import { useAuth } from '../AuthContext.jsx'

const Header = () => {
  const navigate = useNavigate()
  const { isAuth, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate(routes.login)
  }

  return (
    <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={routes.root}>
          {'header.brand'}
        </Navbar.Brand>
        {isAuth && (
          <Button variant="primary" onClick={handleLogout}>
            {'header.logout'}
          </Button>
        )}
      </Container>
    </Navbar>
  )
}

export default Header