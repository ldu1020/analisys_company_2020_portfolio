/** @format */

import { makeStyles, Tab, Tabs } from '@material-ui/core';
import { autorun, reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import React from 'react';
import { useStore } from '../../stores/setUpContext';
import StaffCard from './staff_card';
import StaffGraph from './staff_graph';
import { staffState } from './staff_state';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  eachCard: {
    display: 'flex',
  },
  subHeader: {
    width: '100%',
    marginBottom: '0.5rem',
    textAlign: 'center',
    fontSize: '1rem',
  },
  tabs: {
    width: '100%',
  },
  cardHeader: {},
  graphWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '47%',
    },
  },
  cardWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '47%',
    },
  },
}));

const Staff = observer(() => {
  const classes = useStyles();
  const rootStore = useStore();
  const state = useLocalObservable(staffState);
  const { staff } = rootStore.focusedCorpList;

  const staffHeader = Array.from(
    new Set((staff as StaffType[]).map((li) => li.fo_bbm))
  );

  autorun(() => {
    if (staff && !state.dataOfHeader.length) {
      const defaultData = staff.filter((li) => li.fo_bbm === staffHeader[0]);
      state.setHeaderData(defaultData);
    }
  });
  reaction(
    () => rootStore.focusedCorpList,
    (arg, pre) => {
      if (arg !== pre) {
        state.setDataForGraph({
          subHeader: '',
          manAmount: '10',
          womanAmount: '20',
        });
      }
    }
  );

  return (
    <div className={classes.root}>
      <div className={classes.graphWrapper}>
        <StaffGraph
          dataForGraph={state.dataForGraph}
          eachRate={state.eachRate}
        />
      </div>
      <div className={classes.cardWrapper}>
        <p className={classes.subHeader}>사업부문</p>
        <Tabs
          className={classes.tabs}
          value={state.navValue}
          onChange={(e, value) => {
            state.setNavValue(value);
            const data = staff?.filter(
              (li) => li.fo_bbm === staffHeader[value]
            );
            data && state.setHeaderData(data);
          }}
          variant='scrollable'
          scrollButtons='on'>
          {staffHeader.map((header, index) => (
            <Tab key={header} label={header} value={index} />
          ))}
        </Tabs>
        {
          <StaffCard
            genderData={state.genderData}
            setData={state.setDataForGraph}
          />
        }
      </div>
    </div>
  );
});

export default Staff;
