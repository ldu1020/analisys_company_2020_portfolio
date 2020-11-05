/** @format */

import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Staff from '../staff/staff';
import Repurchase from '../repurchase/repurchase';
import AllAccounts from '../all_accounts/main_all_accounts';
import { useStore } from '../../stores/setUpContext';
import { observer } from 'mobx-react';
import AllMajorAccounts from '../major-accounts/main_major_accouts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TapsDataNav = observer(() => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { focusedCorpList } = useStore();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'>
          <Tab label='Item One' {...a11yProps(0)} />
          <Tab label='Item Two' {...a11yProps(1)} />
          <Tab label='Item Three' {...a11yProps(2)} />
          <Tab label='Item four' {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {focusedCorpList && <AllAccounts />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AllMajorAccounts />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Staff />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Repurchase />
      </TabPanel>
    </div>
  );
});
export default TapsDataNav;
