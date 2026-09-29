import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'goey-toast/styles.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // For Development
  // <StrictMode>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </StrictMode>,

  // For Production
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
