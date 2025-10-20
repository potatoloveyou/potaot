import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Test1 from './Test1/Tset1.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Test1 />
  </StrictMode>,
)
