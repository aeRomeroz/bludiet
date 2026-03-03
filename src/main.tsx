import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PatientsProvider } from './context/PatientsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PatientsProvider>
      <App />
    </PatientsProvider>
  </StrictMode>,
)
