/** @format */

import { Grid } from '@material-ui/core';
/** @format */

import { observer, useLocalObservable } from 'mobx-react';
import React from 'react';
import { useStore } from '../../stores/setUpContext';
import AccountsList from './accounts_list';

const AllMajorAccounts = observer(() => {
  const { fitteredMajorDataOfFocused } = useStore();
  const { BSdata, ISdata, CFdata } = fitteredMajorDataOfFocused;
  const state = useLocalObservable(() => ({
    account_nm: '',
    amount: '',
    pickAccount(account_nm: string, amount: string) {
      this.account_nm = account_nm;
      this.amount = amount;
    },
  }));

  return (
    <Grid>
      <h1>
        {state.account_nm} : {state.amount}
      </h1>
      {BSdata && (
        <AccountsList
          majorAccount={BSdata}
          baseAmount={state.amount}
          pickAccount={state.pickAccount}
        />
      )}
      {ISdata && (
        <AccountsList
          majorAccount={ISdata}
          baseAmount={state.amount}
          pickAccount={state.pickAccount}
        />
      )}
      {CFdata && (
        <AccountsList
          majorAccount={CFdata}
          baseAmount={state.amount}
          pickAccount={state.pickAccount}
        />
      )}
    </Grid>
  );
});

export default AllMajorAccounts;
