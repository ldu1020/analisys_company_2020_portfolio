/** @format */

import { Box, Card, makeStyles, Typography } from '@material-ui/core';
import { observer, useLocalObservable } from 'mobx-react';
import React from 'react';
import { useStore } from '../../stores/setUpContext';
import Account from './account';
import AccountsPicker from './accounts_picker';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { reaction } from 'mobx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  selectZone: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'normal',
    },
  },
  accountWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem',
  },
  accountCard: {
    width: '100%',
    margin: '1rem',
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
        <div className={classes.selectZone}>
          <div className={classes.accountWrapper}>
            <Typography align='center'>ALL</Typography>
            <Card className={classes.accountCard}>
              <Account
                fsList={allAccounts as AccountsType[]}
                clickCallBack={AccountsStore.onChoiceList}
              />
            </Card>
          </div>
          <div className={classes.accountWrapper}>
            <Typography align='center'>SELECTED</Typography>
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
          </div>
        </div>
        <AccountsPicker chosenFsList={AccountsStore.chosenAccounts} />
      </Box>
    );
  }
);

export default AllAccounts;
