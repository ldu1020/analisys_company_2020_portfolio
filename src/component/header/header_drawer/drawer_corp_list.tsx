/** @format */

import React from 'react';
import { observer } from 'mobx-react';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { useStore } from '../../../stores/setUpContext';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: '2rem',
  },
  list: {
    width: '15rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  item: {
    height: '6rem',
    display: 'flex',
  },
}));

interface DrawerCorpListProps {
  toggleOpen?: () => void;
}

const DrawerCorpList: React.FC<DrawerCorpListProps> = observer(
  ({ toggleOpen }) => {
    const {
      focusedCorpList,
      chosenCorpList,
      removeChosenCorpList,
      setFocusedCorpList,
    } = useStore();
    const theme = useTheme();

    const classes = useStyles();

    return (
      <List className={classes.list}>
        {chosenCorpList.map((item) => (
          <ListItem
            key={item.id}
            className={classes.item}
            onClick={(event: any) => {
              if (
                !['path', 'svg', 'BUTTON'].find(
                  (li) => li === `${event.target.tagName}`
                )
              ) {
                toggleOpen && toggleOpen();
                setFocusedCorpList(item);
              }
            }}
            button>
            <ListItemText
              primary={item.corp_name}
              secondary={`${item.bsns_year} - ${reprtCodeToString(
                item.reprt_code
              )}`}
              primaryTypographyProps={{
                style: {
                  color:
                    item.id === focusedCorpList.id
                      ? theme.palette.secondary.main
                      : undefined,
                },
              }}
            />
            <IconButton
              onClick={(event) => {
                removeChosenCorpList(item.id!);
              }}>
              <DeleteOutlineIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    );
  }
);

function reprtCodeToString(code: FindCorpState['reprt_code']) {
  switch (code) {
    case '11011':
      return '사업보고서';
    case '11012':
      return '반기보고서';
    case '11013':
      return '1분기보고서';
    case '11014':
      return '3분기보고서';
  }
}

export default DrawerCorpList;
