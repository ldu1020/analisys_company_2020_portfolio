/** @format */

import { Box, Card, makeStyles, Typography } from '@material-ui/core';
import { reaction } from 'mobx';
/** @format */

import { observer, useLocalObservable } from 'mobx-react';
import React from 'react';
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
        <Typography className={classes.listHeader} variant='h6'>
          손익계산서
        </Typography>
        {BSdata && (
          <AccountsList
            majorAccount={BSdata}
            baseAmount={state.amount}
            pickAccount={state.pickAccount}
          />
        )}
        <Typography className={classes.listHeader} variant='h6'>
          대차대조표
        </Typography>
        {ISdata && (
          <AccountsList
            majorAccount={ISdata}
            baseAmount={state.amount}
            pickAccount={state.pickAccount}
          />
        )}
      </Box>
    );
  }
);

export default AllMajorAccounts;
