import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css'; // ✅ Correct
import App from './App.tsx'; // ✅ Correct

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
