/** @format */

import { autorun } from 'mobx';
import React, { useEffect } from 'react';
import FindCorpName from './component/find_corp_data_input/find_corp_name';
import Header from './component/header/header';
import TapsDataNav from './component/taps/taps_data_nav';
import { fetchCORPCODE } from './service/dart_api';
import { useStore } from './stores/setUpContext';

function App() {
  const { setCorpList, chosenCorpList, setFocusedCorpList } = useStore();
  useEffect(() => {
    setCorpList();
  }, [setCorpList]);

  autorun(() => {
    setFocusedCorpList(chosenCorpList[chosenCorpList.length - 1]);
  });

  return (
    <div className='App'>
      <Header />
      <FindCorpName />
      <TapsDataNav />
    </div>
  );
}

export default App;
