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
import InLoading from '../in_loading/in_loading';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    top: '0',
    zIndex: theme.zIndex.appBar,
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  description: {
    color: theme.palette.text.secondary,
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
  const {
    focusedCorpList,
    fetchLoading,
    fitteredMajorDataOfFocused,
  } = useStore();
  const classes = useStyles();
  const { allAccounts, majorAccounts, staff } = focusedCorpList;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const AccountsOrNon = () =>
    allAccounts ? (
      <AllAccounts focusedCorpList={focusedCorpList} />
    ) : (
      <NonFetchedDataDisplay />
    );
  const MajorAccountsOrNon = () =>
    majorAccounts ? (
      <AllMajorAccounts
        fitteredMajorDataOfFocused={fitteredMajorDataOfFocused}
      />
    ) : (
      <NonFetchedDataDisplay />
    );
  const StaffOrNon = () => (staff ? <Staff /> : <NonFetchedDataDisplay />);

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
        <Box>
          <h1 className={classes.title}>재무재표</h1>
          <p className={classes.description}>
            계정과목을 선택 해 주세요!
            <br /> 현재시점을 마지막분기로 최대 3분기까지 그래프를 통해 조회 할
            수 있습니다
          </p>
        </Box>
        {fetchLoading ? <InLoading /> : <AccountsOrNon />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1 className={classes.title}>주요계정과목</h1>
        <p className={classes.description}>
          손익계산서와 대차대조표의 '핵심'
          <br />각 계정과목을 선택 해 보세요! 간단한 분석이 가능합니다.
        </p>
        {fetchLoading ? <InLoading /> : <MajorAccountsOrNon />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1 className={classes.title}>직원 현황</h1>
        <p className={classes.description}>
          각 사업부분의 인원과 급여를 알 수 있습니다.
          <br />각 항목을 '클릭'하여 가시적으로 조회가 가능합니다.
        </p>
        {fetchLoading ? <InLoading /> : <StaffOrNon />}
      </TabPanel>
    </div>
  );
});
export default TapsDataNav;
