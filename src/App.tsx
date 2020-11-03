/** @format */

import React, { useEffect } from 'react';
import FindCorpName from './component/find_corp_data_input/find_corp_name';
import { fetchCORPCODE } from './service/dart_api';
import { useStore } from './stores/setUpContext';

function App() {
  const { setCorpList } = useStore();
  useEffect(() => {
    setCorpList();
  }, [setCorpList]);

  return (
    <div className='App'>
      <FindCorpName />
    </div>
  );
}

export default App;
