/** @format */

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import InLoading from './component/in_loading/in_loading';
import { StoreProvider } from './stores/setUpContext';

const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Suspense fallback={<InLoading fullSize />}>
        <App />
      </Suspense>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
