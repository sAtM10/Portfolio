import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App.jsx';
import '@fontsource-variable/instrument-sans';
import '@fontsource-variable/jetbrains-mono';
import '@/styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
