import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { ThemeProviderWrapper } from './contexts/ThemeContext';
import './index.css';

// Get initial theme from localStorage or default to 'light'
// const initialMode = (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProviderWrapper>
  </React.StrictMode>
);

