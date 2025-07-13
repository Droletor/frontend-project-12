import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Page404 from './pages/Page404.jsx'
import LoginPage from './pages/LoginPage.jsx'
import routes from './services/clientRoutes.js'
import { AuthProvider } from './AuthContext.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.notFound} element={<Page404 />} />
          <Route path={routes.login} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
