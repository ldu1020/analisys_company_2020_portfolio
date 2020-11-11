/** @format */

import { Box, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { useStore } from '../../stores/setUpContext';
import CalculatorComponent from './calculator_component';

const useStyles = makeStyles((theme) => ({
  analisysSet: {
    position: 'relative',
  },
}));

const dataSet = [
  {
    title: 'ROIC',
    description: '',
    plus: ['영업이익'],
    division: ['유형자산,운전자본'],
  },
  {
    title: 'ROE',
    description: '',
    plus: ['당기순이익'],
    division: ['자본금'],
  },
  {
    title: '유동비율',
    description: '',
    plus: ['유동자산'],
    division: ['유동부채'],
  },
  {
    title: '고정자산회전률',
    description: '',
    plus: ['매출액'],
    division: ['고정자산'],
  },
  {
    title: '노동분배율',
    description: '',
    plus: ['인건비'],
    division: ['매출액'],
  },
];
const AnalisysOfAccounts = observer(() => {
  const { flatDataOfFocused } = useStore();
  const classes = useStyles();
  return (
    <Box p={3}>
      {dataSet.map((data) => (
        <div className={classes.analisysSet}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          {flatDataOfFocused && (
            <CalculatorComponent
              flatDataOfFocused={flatDataOfFocused}
              plus={data.plus}
              division={data.division}
            />
          )}
        </div>
      ))}
    </Box>
  );
});

export default AnalisysOfAccounts;
