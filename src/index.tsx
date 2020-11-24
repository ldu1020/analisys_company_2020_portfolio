/** @format */

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import InLoading from './component/in_loading/in_loading';
import { StoreProvider } from './stores/setUpContext';

const App = lazy(() => import('./App'));
const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<InLoading fullSize />}>
      <StoreProvider>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </StoreProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
