import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { FavouritesProvider } from './context/FavouritesContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FavouritesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </FavouritesProvider>,
);
