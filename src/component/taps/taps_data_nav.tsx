/** @format */

import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Staff from '../staff/staff';
import AllAccounts from '../all_accounts/main_all_accounts';
import { useStore } from '../../stores/setUpContext';
import { observer } from 'mobx-react';
import AllMajorAccounts from '../major-accounts/main_major_accouts';
import { makeStyles, Paper } from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import NonFetchedDataDisplay from '../non_fetched_data/non_fetched_data';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    top: '0',
    zIndex: theme.zIndex.appBar,
  },
}));

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

const TapsDataNav = observer(() => {
  const [value, setValue] = React.useState(0);
  const { focusedCorpList } = useStore();
  const classes = useStyles();
  const { allAccounts, majorAccounts, staff } = focusedCorpList;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          indicatorColor='secondary'
          textColor='secondary'
          centered
          onChange={handleChange}
          aria-label='simple tabs example'>
          <Tab icon={<AccountBalanceIcon />} label='재무제표' />
          <Tab icon={<ChangeHistoryIcon />} label='주요계정과목' />
          <Tab icon={<AssignmentIndIcon />} label='직원현황' />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        {allAccounts ? <AllAccounts /> : <NonFetchedDataDisplay />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {majorAccounts ? <AllMajorAccounts /> : <NonFetchedDataDisplay />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {staff ? <Staff /> : <NonFetchedDataDisplay />}
      </TabPanel>
    </div>
  );
});
export default TapsDataNav;
