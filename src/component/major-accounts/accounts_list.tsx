/** @format */

import React from 'react';
import { observer } from 'mobx-react';
import CountUp from 'react-countup';
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

export interface AccountsListProps {
  majorAccount: AccountsType[];
  baseAmount: any;
  pickAccount: any;
}

const useStyles = makeStyles((theme) => ({
  rateBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rate: {
    textAlign: 'end',
    fontSize: '1.2rem',
    color: theme.palette.primary.light,
  },
  cycleRate: {
    textAlign: 'end',
    fontSize: '0.7rem',
    color: theme.palette.text.secondary,
    margin: '0.3rem',
  },
}));

const AccountsList: React.FC<AccountsListProps> = observer(
  ({ majorAccount, baseAmount, pickAccount }) => {
    const classes = useStyles();
    return (
      <Card>
        <List>
          <Box>
            {majorAccount.map((li, index) => {
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
                    <div className={classes.rateBox}>
                      <CountUp
                        className={classes.rate}
                        end={getRate(baseAmount, li.thstrm_amount)}
                        duration={index ? index * 0.7 : 0.7}
                        suffix='%'
                      />
                      <p className={classes.cycleRate}>
                        {getRate(baseAmount, li.thstrm_amount) / 100}
                        회전
                      </p>
                    </div>
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
