import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import initApp from './initApp.js'

const { socket } = initApp()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App socket={socket} />
  </StrictMode>,
)
