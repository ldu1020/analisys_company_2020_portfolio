/** @format */

import { makeStyles, Tab, Tabs } from '@material-ui/core';
import { autorun } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import React from 'react';
import { useStore } from '../../stores/setUpContext';
import StaffCard from './staff_card';
import StaffGraph from './staff_graph';
import { staffState } from './staff_state';

const useStyles = makeStyles((theme) => ({
  root: {},
  eachCard: {
    display: 'flex',
  },
  cardHeader: {},
}));

const Staff = observer(() => {
  const { focusedCorpList } = useStore();
  const { staff } = focusedCorpList;
  const classes = useStyles();
  const state = useLocalObservable(staffState);

  const staffHeader = Array.from(
    new Set((staff as StaffType[]).map((li) => li.fo_bbm))
  );

  autorun(() => {
    if (staff && !state.dataOfHeader.length) {
      const defaultData = staff.filter((li) => li.fo_bbm === staffHeader[0]);
      state.setHeaderData(defaultData);
    }
  });

  return (
    <div className={classes.root}>
      <StaffGraph dataForGraph={state.dataForGraph} eachRate={state.eachRate} />
      <Tabs
        value={state.navValue}
        onChange={(e, value) => {
          state.setNavValue(value);
          const data = staff?.filter((li) => li.fo_bbm === staffHeader[value]);
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
  );
});

export default Staff;
