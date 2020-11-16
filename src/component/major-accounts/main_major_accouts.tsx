/** @format */

import React from 'react';
import { reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import { Box, Card, makeStyles, Typography } from '@material-ui/core';

import AccountsList from './accounts_list';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
  },
  baseAccountCard: {
    height: '5rem',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  baseAccount: {
    fontSize: ' 1.5rem',
  },
  listHeader: {
    textAlign: 'center',
    margin: '1rem',
  },

  AccountZone: {
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  accountWrapper: {
    [theme.breakpoints.up('sm')]: {
      width: '47%',
    },
  },
}));

interface AllMajorAccountsProps {
  fitteredMajorDataOfFocused: {
    ISdata: MajorAccountsType[] | undefined;
    BSdata: MajorAccountsType[] | undefined;
  };
}

const AllMajorAccounts: React.FC<AllMajorAccountsProps> = observer(
  ({ fitteredMajorDataOfFocused }) => {
    const classes = useStyles();
    const { BSdata, ISdata } = fitteredMajorDataOfFocused;
    const state = useLocalObservable(() => ({
      account_nm: '',
      amount: '',
      pickAccount(account_nm: string, amount: string) {
        this.account_nm = account_nm;
        this.amount = amount;
      },
    }));
    reaction(
      () => fitteredMajorDataOfFocused,
      (arg, pre) => {
        if (arg !== pre) {
          state.pickAccount('', '');
        }
      }
    );

    return (
      <Box className={classes.root}>
        <Card className={classes.baseAccountCard}>
          <Typography>
            기준계정:{' '}
            <span className={classes.baseAccount}>{state.account_nm} </span>{' '}
          </Typography>
        </Card>
        <div className={classes.AccountZone}>
          <div className={classes.accountWrapper}>
            <Typography className={classes.listHeader} variant='h6'>
              대차대조표
            </Typography>
            {BSdata && (
              <AccountsList
                majorAccount={BSdata}
                baseAmount={state.amount}
                pickAccount={state.pickAccount}
              />
            )}
          </div>
          <div className={classes.accountWrapper}>
            <Typography className={classes.listHeader} variant='h6'>
              손익계산서
            </Typography>
            {ISdata && (
              <AccountsList
                majorAccount={ISdata}
                baseAmount={state.amount}
                pickAccount={state.pickAccount}
              />
            )}
          </div>
        </div>
      </Box>
    );
  }
);

export default AllMajorAccounts;
