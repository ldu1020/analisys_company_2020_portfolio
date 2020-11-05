/** @format */

import { Card, Grid } from '@material-ui/core';
import { autorun } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import React from 'react';
import { useStore } from '../../stores/setUpContext';
import Account from './account';
import AccountsPicker from './accounts_picker';

const AllAccounts = observer(() => {
  const { focusedCorpList } = useStore();
  const { allAccounts } = focusedCorpList as ChosenCorpList;
  const AccountsStore = useLocalObservable(() => ({
    chosenAccounts: [] as AccountsType[],
    onReset() {
      this.chosenAccounts = [];
    },
    onChoiceList(id: any): void {
      const ChosenList = allAccounts?.find((li) => li.id === id);
      console.log(allAccounts, ChosenList);
      ChosenList &&
        this.chosenAccounts.indexOf(ChosenList) === -1 &&
        this.chosenAccounts.push(ChosenList);
    },
    onReomveList(id: any): void {
      const ChosenList = this.chosenAccounts.filter((li) => li.id !== id);
      this.chosenAccounts = ChosenList;
    },
  }));
  autorun(() => {
    console.log(AccountsStore.chosenAccounts);
  });
  return (
    <>
      {allAccounts ? (
        <Grid container direction='row' alignItems='center' spacing={1}>
          <Grid item xs={6}>
            <Card>
              <Account
                fsList={allAccounts as AccountsType[]}
                clickCallBack={AccountsStore.onChoiceList}
              />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <Account
                fsList={AccountsStore.chosenAccounts}
                clickCallBack={AccountsStore.onReomveList}
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <AccountsPicker chosenFsList={AccountsStore.chosenAccounts} />
            </Card>
          </Grid>
        </Grid>
      ) : (
        <div>
          <h1>데이터가 없ㅅ급니다.</h1>
        </div>
      )}
    </>
  );
});

export default AllAccounts;
