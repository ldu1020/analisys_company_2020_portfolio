/** @format */

import {
  Badge,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { useStore } from '../../../stores/setUpContext';
import styles from './header_drawer.module.css';

interface HeaderDrawerProps {
  open: boolean;
  toggleOpen: () => void;
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = ({ open, toggleOpen }) => {
  const {
    itemForCustom,
    chosenCorpList,
    removeChosenCorpList,
    setFocusedCorpList,
  } = useStore();

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
          <ListItem className={styles.item} button>
            <Badge color='secondary' badgeContent={itemForCustom.length}>
              <ListItemText primary='나만의 공식 제작소' />
            </Badge>
          </ListItem>
          {chosenCorpList.map((item) => (
            <ListItem
              key={item.id}
              className={styles.item}
              onClick={() => {
                toggleOpen();
                setFocusedCorpList(
                  chosenCorpList.find(
                    (li) => li.id === item.id
                  ) as ChosenCorpList
                );
              }}
              button>
              <ListItemText
                primary={item.corp_name}
                secondary={item.bsns_year}
                primaryTypographyProps={{ className: styles.text }}
              />
              <button
                onClick={() => {
                  removeChosenCorpList(item.id);
                }}></button>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </nav>
  );
};

export default React.memo(HeaderDrawer);
