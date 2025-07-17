import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Page404 from './pages/Page404.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ChatPage from './pages/ChatPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import routes from './services/clientRoutes.js'
import { AuthProvider } from './AuthContext.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { ToastContainer } from 'react-toastify'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import rollbarConfig from './services/rollbar.conf.js';

const App = ({ socket }) => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <Container fluid className="vh-100 overflow-hidden p-0 m-0">
              <Routes>
                <Route path={routes.notFound} element={<Page404 />} />
                <Route path={routes.login} element={<LoginPage />} />
                <Route path={routes.signup} element={<SignupPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path={routes.root} element={<ChatPage socket={socket} />} />
                </Route>
              </Routes>
              <ToastContainer />
            </Container>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
)

export default App
