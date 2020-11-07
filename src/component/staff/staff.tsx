/** @format */

import { Card, List, ListItem, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { useStore } from '../../stores/setUpContext';

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
  const staffHeader = Array.from(
    new Set((staff as StaffType[]).map((li) => li.fo_bbm))
  );

  return (
    <div className={classes.root}>
      {staffHeader.map((header) => {
        const data = (staff as StaffType[]).filter(
          (item) => item.fo_bbm === header
        );
        return (
          <div>
            <h1 className={classes.cardHeader}>{header}</h1>
            <Card className={classes.eachCard}>
              {data.map((list) => (
                <div>
                  <li>성별 {list.sexdstn}</li>
                  <List>
                    <ListItem>정직원수 {list.rgllbr_co}</ListItem>
                    <ListItem>계약직수 {list.cnttk_co}</ListItem>
                    <ListItem>1인 평균 급여액 {list.jan_salary_am}</ListItem>
                    <ListItem>연간 급여 총액{list.fyer_salary_totamt}</ListItem>
                    <ListItem>합계:{list.sm}</ListItem>
                    <ListItem>비고:{list.rm}</ListItem>
                  </List>
                </div>
              ))}
            </Card>
          </div>
        );
      })}
    </div>
  );
});

function getClassfiedStaff(staff: StaffType[]) {}

export default Staff;
