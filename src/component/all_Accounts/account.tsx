/** @format */

import React from 'react';
import { observer } from 'mobx-react';
import { nanoid } from 'nanoid';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

type AccountCallBack = (item: AccountsType) => void;

interface AccountsProps {
  fsList: AccountsType[];
  clickCallBack:
    | AccountCallBack
    | { role: string; function: AccountCallBack }[];
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
  subHeader: {
    color: theme.palette.info.light,
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
          AccountHeader.map((account) => (
            <li key={`section-${account}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader className={classes.subHeader}>
                  {sjHeaderSwitch(account)}
                </ListSubheader>
                {fsList
                  .filter((li) => li.sj_div === account)
                  .map((item) => (
                    <Item
                      key={nanoid()}
                      item={item}
                      clickCallBack={clickCallBack}
                    />
                  ))}
              </ul>
            </li>
          ))}
      </List>
    );
  }
);

interface ItemProps {
  clickCallBack:
    | AccountCallBack
    | { role: string; function: AccountCallBack }[];
  item: AccountsType;
}

const Item: React.FC<ItemProps> = ({ item, clickCallBack }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ListItem
      onClick={() => {
        typeof clickCallBack === 'function' && clickCallBack(item);
      }}
      button>
      <ListItemText
        primary={item.account_nm}
        secondary={item.account_detail === '-' ? null : item.account_detail}
      />
      {Array.isArray(clickCallBack) && (
        <div>
          <IconButton aria-haspopup='true' onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            {clickCallBack.map((callbackList) => {
              return (
                <MenuItem
                  key={callbackList.role}
                  onClick={() => {
                    callbackList.function(item);
                    handleClose();
                  }}>
                  {callbackList.role}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      )}
    </ListItem>
  );
};

function sjHeaderSwitch(accountHeader: AccountsType['sj_div']) {
  switch (accountHeader) {
    case 'IS':
      return '손익계산서(IS)';
    case 'BS':
      return '대차대조표(BS)';
    case 'CIS':
      return '포괄손익계산서(CIS)';
    case 'CF':
      return '현금흐름표(CF)';
    case 'SCE':
      return '자본변동표(SCE)';
    default:
      return '알 수 없음';
  }
}

export default React.memo(Account);
