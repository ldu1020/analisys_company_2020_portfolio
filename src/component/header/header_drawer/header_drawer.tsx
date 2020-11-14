/** @format */

import {
  Divider,
  Drawer,
  Hidden,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { observer } from 'mobx-react';
import DrawerCorpList from './drawer_corp_list';

interface HeaderDrawerProps {
  open: boolean;
  toggleOpen: () => void;
  drawerWidth: number;
}

interface StyleProps {
  drawerWidth: number;
}

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: '2rem',
  },
}));

const HeaderDrawer: React.FC<HeaderDrawerProps> = observer(
  ({ open, toggleOpen, drawerWidth }) => {
    const classes = useStyles({ drawerWidth: drawerWidth });

    return (
      <nav aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
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
            <DrawerCorpList toggleOpen={toggleOpen} />
            <Divider />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer variant='permanent' open>
            <Typography className={classes.title} variant='h4' align='center'>
              회사목록
            </Typography>
            <DrawerCorpList toggleOpen={toggleOpen} />
          </Drawer>
        </Hidden>
      </nav>
    );
  }
);

export default HeaderDrawer;
