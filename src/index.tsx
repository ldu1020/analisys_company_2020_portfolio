/** @format */

import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import InLoading from './component/in_loading/in_loading';
import { StoreProvider } from './stores/setUpContext';

const App = lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<InLoading fullSize />}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
