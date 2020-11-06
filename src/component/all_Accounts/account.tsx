/** @format */

import {
  Grow,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import { nanoid } from 'nanoid';
import React from 'react';

interface AccountsProps {
  fsList: AccountsType[];
  clickCallBack: (item: any) => any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 250,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

const Account: React.FC<AccountsProps> = observer(
  ({ fsList, clickCallBack }) => {
    const classes = useStyles();

    let AccountsCategory = fsList && fsList.map((li) => li.sj_div);
    const AccountHeader =
      AccountsCategory &&
      AccountsCategory.filter(
        (item, index) => (AccountsCategory as string[]).indexOf(item) === index
      );

    return (
      <List className={classes.root} subheader={<li />}>
        {AccountHeader &&
          AccountHeader.map((account: any) => (
            <li key={`section-${account}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader>{account}</ListSubheader>
                {fsList
                  .filter((li) => li.sj_div === account)
                  .map((item) => (
                    <Grow in>
                      <ListItem
                        key={`item-${account}-${nanoid()}`}
                        onClick={() => {
                          clickCallBack(item);
                        }}
                        button>
                        <ListItemText
                          primary={`${item.account_nm}`}
                          secondary={
                            item.account_detail === '-'
                              ? null
                              : item.account_detail
                          }
                        />
                      </ListItem>
                    </Grow>
                  ))}
              </ul>
            </li>
          ))}
      </List>
    );
  }
);
export default React.memo(Account);
