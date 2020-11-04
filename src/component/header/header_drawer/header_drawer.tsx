/** @format */

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import styles from './header_drawer.module.css';

const drawerState = [
  {
    label: '할일목록',
  },
  {
    label: '한일목록',
  },
];

interface HeaderDrawerProps {
  open: boolean;
  toggleOpen: () => void;
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = ({ open, toggleOpen }) => {
  return (
    <nav className={styles.nav} aria-label='mailbox folders'>
      <Drawer
        variant='temporary'
        anchor='left'
        open={open}
        onClose={toggleOpen}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}>
        <List className={styles.list}>
          {drawerState.map((item) => (
            <ListItem className={styles.item} onClick={toggleOpen} button>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ className: styles.text }}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </nav>
  );
};

export default React.memo(HeaderDrawer);
