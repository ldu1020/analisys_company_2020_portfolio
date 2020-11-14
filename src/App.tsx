/** @format */

import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import React, { useRef } from 'react';
import FindCorpName from './component/find_corp_data_input/find_corp_name';
import Header from './component/header/header';
import TapsDataNav from './component/taps/taps_data_nav';
import AnalisysOfAccounts from './component/analisys_of_accounts/analisys_of_accounts';

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
        <TapsDataNav />
        <AnalisysOfAccounts scrollToFind={scrollToFind} />
      </div>
    </div>
  );
}

export default App;
