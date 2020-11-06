/** @format */

import { CssBaseline } from '@material-ui/core';
import React, { useEffect } from 'react';
import FindCorpName from './component/find_corp_data_input/find_corp_name';
import Header from './component/header/header';
import TapsDataNav from './component/taps/taps_data_nav';
import { useStore } from './stores/setUpContext';

function App() {
  const { setCorpList } = useStore();
  useEffect(() => {
    setCorpList();
  }, [setCorpList]);

  return (
    <div className='App'>
      <CssBaseline />
      <Header />
      <FindCorpName />
      <TapsDataNav />
    </div>
  );
}

export default App;
