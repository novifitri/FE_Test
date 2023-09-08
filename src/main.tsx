import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
