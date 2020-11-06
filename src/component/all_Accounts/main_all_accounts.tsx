/** @format */

import { Box, Card, makeStyles } from '@material-ui/core';
import { observer, useLocalObservable } from 'mobx-react';
import React from 'react';
import { useStore } from '../../stores/setUpContext';
import Account from './account';
import AccountsPicker from './accounts_picker';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  accountCard: {
    width: '100%',
    paddingBottom: '1rem',
  },
  downIcon: {
    boxShadow: theme.shadows['1'],
    borderRadius: '50%',
    margin: '2rem',
    width: '2rem',
    height: '2rem',
    transition: 'all 0.4s',
  },
}));

const AllAccounts = observer(() => {
  const { focusedCorpList } = useStore();
  const { allAccounts } = focusedCorpList as ChosenCorpList;
  const classes = useStyles();

  const AccountsStore = useLocalObservable(() => ({
    chosenAccounts: [] as AccountsType[],
    onReset() {
      this.chosenAccounts = [];
    },
    onChoiceList(item: any): void {
      const index = this.chosenAccounts.indexOf(item);
      index === -1 && this.chosenAccounts.push(item);
    },
    onReomveList(item: any): void {
      const index = this.chosenAccounts.indexOf(item);
      this.chosenAccounts.splice(index, 1);
    },
  }));

  return (
    <Box className={classes.root}>
      <p>ALL</p>
      <Card className={classes.accountCard}>
        <Account
          fsList={allAccounts as AccountsType[]}
          clickCallBack={AccountsStore.onChoiceList}
        />
      </Card>
      <ExpandMoreIcon className={classes.downIcon} />
      <p>SELECTED</p>
      <Card className={classes.accountCard}>
        <Account
          fsList={AccountsStore.chosenAccounts}
          clickCallBack={AccountsStore.onReomveList}
        />
      </Card>
      <AccountsPicker chosenFsList={AccountsStore.chosenAccounts} />
    </Box>
  );
});

export default AllAccounts;
