/** @format */

import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useStore } from '../../../stores/setUpContext';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { observer } from 'mobx-react';

interface HeaderDrawerProps {
  open: boolean;
  toggleOpen: () => void;
}

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

const HeaderDrawer: React.FC<HeaderDrawerProps> = observer(
  ({ open, toggleOpen }) => {
    const {
      chosenCorpList,
      removeChosenCorpList,
      setFocusedCorpList,
    } = useStore();
    const classes = useStyles();

    return (
      <nav aria-label='mailbox folders'>
        <Drawer
          variant='temporary'
          anchor='left'
          open={open}
          onClose={toggleOpen}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
          <Typography className={classes.title} variant='h4' align='center'>
            회사목록
          </Typography>
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
                    toggleOpen();
                    setFocusedCorpList(item);
                  }
                }}
                button>
                <ListItemText
                  primary={item.corp_name}
                  secondary={`${item.bsns_year} - ${reprtCodeToString(
                    item.reprt_code
                  )}`}
                />
                <IconButton
                  onClick={(event) => {
                    removeChosenCorpList(item.id);
                  }}>
                  <DeleteOutlineIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
      </nav>
    );
  }
);

export default HeaderDrawer;

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
