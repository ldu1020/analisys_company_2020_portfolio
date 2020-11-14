/** @format */

import { Box, Card, makeStyles } from '@material-ui/core';
import { observer, useLocalObservable } from 'mobx-react';
import React from 'react';
import { useStore } from '../../stores/setUpContext';
import Account from './account';
import AccountsPicker from './accounts_picker';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { reaction } from 'mobx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  accountCard: {
    width: '100%',
    marginBottom: '1rem',
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

interface AllAccountsProps {
  focusedCorpList: ChosenCorpList;
}

const AllAccounts: React.FC<AllAccountsProps> = observer(
  ({ focusedCorpList }) => {
    const { allAccounts } = focusedCorpList as ChosenCorpList;
    const classes = useStyles();

    const AccountsStore = useLocalObservable(() => ({
      chosenAccounts: [] as AccountsType[],
      onReset() {
        this.chosenAccounts = [];
      },
      onChoiceList(item: AccountsType): void {
        const index = this.chosenAccounts.indexOf(item);
        index === -1 && this.chosenAccounts.push(item);
      },
      onReomveList(item: AccountsType): void {
        const index = this.chosenAccounts.indexOf(item);
        this.chosenAccounts.splice(index, 1);
      },
    }));

    reaction(
      () => focusedCorpList,
      (arg, pre) => {
        if (arg !== pre) {
          AccountsStore.onReset();
        }
      }
    );

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
            clickCallBack={[
              { role: '제거하기', function: AccountsStore.onReomveList },
              {
                role: '커스텀등록',
                function: () => {
                  alert('준비 중입니다.');
                },
              },
            ]}
          />
        </Card>
        <AccountsPicker chosenFsList={AccountsStore.chosenAccounts} />
      </Box>
    );
  }
);

export default AllAccounts;
