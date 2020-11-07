/** @format */

import { CssBaseline, StylesProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import FindCorpName from './component/find_corp_data_input/find_corp_name';
import Header from './component/header/header';
import StaffGraph from './component/staff/staff_graph';
import TapsDataNav from './component/taps/taps_data_nav';
import { useStore } from './stores/setUpContext';

function App() {
  const { setCorpList } = useStore();
  useEffect(() => {
    setCorpList();
  }, [setCorpList]);

  return (
    <StylesProvider injectFirst>
      <div className='App'>
        <CssBaseline />
        {/* <Header />
        <FindCorpName />
        <TapsDataNav /> */}
        <StaffGraph />
      </div>
    </StylesProvider>
  );
}

export default App;
