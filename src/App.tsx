/** @format */

import React, { useRef } from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';

import FindCorpName from './component/find_corp_data_input/find_corp_name';
import Header from './component/header/header';
import TapsDataNav from './component/taps/taps_data_nav';
import AnalisysOfAccounts from './component/analisys_of_accounts/analisys_of_accounts';
import IfFetchError from './component/if_fetch_error/if_fetch_error';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));

function App() {
  const classes = useStyles();
  const findCorpRef = useRef<HTMLDivElement>(null);
  const scrollToFind = () =>
    findCorpRef.current &&
    findCorpRef.current.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className='App'>
      <CssBaseline />
      <div className={classes.container}>
        <Header />
        <div ref={findCorpRef}>
          <FindCorpName />
        </div>
        <IfFetchError />
        <TapsDataNav />
        <AnalisysOfAccounts scrollToFind={scrollToFind} />
      </div>
    </div>
  );
}

export default App;
