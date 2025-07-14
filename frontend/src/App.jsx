import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Page404 from './pages/Page404.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ChatPage from './pages/ChatPage.jsx'
import routes from './services/clientRoutes.js'
import { AuthProvider } from './AuthContext.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.notFound} element={<Page404 />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path={routes.root} element={<ChatPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  )
}

export default App
