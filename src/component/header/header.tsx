/** @format */

import {
  AppBar,
  Badge,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderDrawer from './header_drawer/header_drawer';
import { useStore } from '../../stores/setUpContext';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';

interface HeaderProps {
  onLogout?: () => void;
  userData?: UserData;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    position: 'relative',
  },
  badge: {},
  subButton: {
    color: '#fff',
    position: 'fixed',
    bottom: '3rem',
    right: '1rem',
    backgroundColor: theme.palette.primary.light,
    boxShadow: theme.shadows['2'],
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
  logoutBtn: {
    position: 'absolute',
    right: '1rem',
  },
}));

const Header: React.FC<HeaderProps> = observer(({ onLogout, userData }) => {
  const { chosenCorpList } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [badgeInvisible, setBadgeInvisible] = useState(true);
  const classes = useStyles();

  const toggleOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  reaction(
    () => chosenCorpList.length,
    (arg, prev) => {
      if (arg > prev) {
        setBadgeInvisible(false);
      }
    }
  );

  return (
    <AppBar position='static' className={classes.root}>
      <HeaderDrawer
        drawerWidth={drawerWidth}
        open={drawerOpen}
        toggleOpen={toggleOpen}
      />
      <Toolbar>
        <Hidden mdUp>
          <IconButton
            onClick={() => {
              setDrawerOpen(!drawerOpen);
              setBadgeInvisible(true);
            }}
            edge='start'
            color='inherit'
            aria-label='menu'>
            <Badge color='secondary' variant='dot' invisible={badgeInvisible}>
              <MenuIcon />
            </Badge>
          </IconButton>
        </Hidden>

        <Typography variant='h6'>돋보기</Typography>
      </Toolbar>
      <Hidden mdUp>
        <IconButton
          onClick={() => {
            setDrawerOpen(!drawerOpen);
            setBadgeInvisible(true);
          }}
          className={classes.subButton}
          aria-label='menu'>
          <Badge
            className={classes.badge}
            color='secondary'
            variant='dot'
            invisible={badgeInvisible}>
            <MenuIcon />
          </Badge>
        </IconButton>
      </Hidden>
    </AppBar>
  );
});

export default Header;
