/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from './stores/setUpContext';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
