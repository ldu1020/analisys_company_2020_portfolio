/** @format */

import { CssBaseline } from '@material-ui/core';
import React, { useRef } from 'react';
import FindCorpName from './component/find_corp_data_input/find_corp_name';
import Header from './component/header/header';
import TapsDataNav from './component/taps/taps_data_nav';
import AnalisysOfAccounts from './component/analisys_of_accounts/analisys_of_accounts';

function App() {
  const findCorpRef = useRef<HTMLDivElement>(null);
  const scrollToFind = () =>
    findCorpRef.current &&
    findCorpRef.current.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className='App'>
      <CssBaseline />
      <Header />
      <div ref={findCorpRef}>
        <FindCorpName />
      </div>
      <TapsDataNav />
      <AnalisysOfAccounts scrollToFind={scrollToFind} />
    </div>
  );
}

export default App;
