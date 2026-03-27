// Polyfill for process - must be at the very top
if (typeof window !== 'undefined') {
  (window as any).process = { 
    env: { 
      NODE_ENV: 'development',
      CANISTER_ID_CERTIFYD_BACKEND: 'uxrrr-q7777-77774-qaaaq-cai',
      DFX_NETWORK: 'local'
    } 
  };
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
