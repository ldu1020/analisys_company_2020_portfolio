/** @format */

import { Box, Card, List, ListItem, ListItemText } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';

export interface AccountsListProps {
  majorAccount: AccountsType[];
  baseAmount: any;
  pickAccount: any;
}

const AccountsList: React.FC<AccountsListProps> = observer(
  ({ majorAccount, baseAmount, pickAccount }) => {
    return (
      <Card>
        <List>
          <Box height={300} overflow={'auto'}>
            {majorAccount.map((li) => {
              return (
                <ListItem
                  button
                  key={li.account_nm}
                  onClick={() => {
                    pickAccount(li.account_nm, li.thstrm_amount);
                  }}>
                  <ListItemText
                    primary={li.account_nm}
                    secondary={li.thstrm_amount}
                  />
                  {baseAmount && (
                    <ListItemText
                      primary={`${getRate(baseAmount, li.thstrm_amount)}% ${
                        getRate(baseAmount, li.thstrm_amount) / 100
                      }회전`}
                    />
                  )}
                </ListItem>
              );
            })}
          </Box>
        </List>
      </Card>
    );
  }
);

export default AccountsList;

function getRate(baseAmount: string, amount: string) {
  const base = Number(baseAmount.split(',').join(''));
  const target = Number(amount.split(',').join(''));
  if (base < 0) {
    return Math.floor((target / base) * -100);
  } else {
    return Math.floor((target / base) * 100);
  }
}
