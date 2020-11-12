/** @format */

import { Divider, List, ListItem, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  cardHeader: {
    display: 'flex',
    height: '3rem',
    alignItems: 'center',
  },
  cardHeaderText: {
    width: '50%',
    textAlign: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
  },
  amountWrapper: {
    display: 'flex',
    width: '100%',
  },
  amount: {
    color: theme.palette.text.secondary,
    width: '50%',
    textAlign: 'center',
  },
  subHeader: {
    marginBottom: '0.5rem',
    textAlign: 'center',
    fontSize: '1rem',
  },
  man: {
    color: theme.palette.primary.light,
  },
  woman: {
    color: theme.palette.secondary.light,
  },
}));

interface StaffCardProps {
  setData: (data: any) => void;
  genderData: {
    manData: StaffType | undefined;
    womanData: StaffType | undefined;
  };
}

const StaffCard: React.FC<StaffCardProps> = ({ genderData, setData }) => {
  const { manData, womanData } = genderData;
  const classes = useStyles();
  const dataForGraph =
    manData &&
    womanData &&
    keyOfData.map((key) => ({
      subHeader: makeHeader(key),
      manAmount: manData[key as keyof StaffType],
      womanAmount: womanData[key as keyof StaffType],
    }));
  return (
    <div className={classes.root}>
      <List>
        {dataForGraph &&
          dataForGraph.map((data) => (
            <ListItem
              key={data.subHeader}
              className={classes.item}
              button
              onClick={() => {
                setData(data);
              }}>
              <p className={classes.subHeader}>{data.subHeader}</p>
              <div className={classes.amountWrapper}>
                <span className={`${classes.amount} ${classes.man}`}>
                  {data.manAmount}
                </span>
                <Divider orientation='vertical' flexItem />
                <span className={`${classes.amount} ${classes.woman}`}>
                  {data.womanAmount}
                </span>
              </div>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

const keyOfData = [
  'rgllbr_co',
  'cnttk_co',
  'jan_salary_am',
  'fyer_salary_totamt',
  'sm',
];

function makeHeader(codename: string) {
  switch (codename) {
    case 'rgllbr_co':
      return '정직원 수';
    case 'cnttk_co':
      return ' 계약직 수';
    case 'jan_salary_am':
      return '1인평균급여액';
    case 'fyer_salary_totamt':
      return '연간급여총액';
    case 'sm':
      return '합계';
  }
}

export default StaffCard;
