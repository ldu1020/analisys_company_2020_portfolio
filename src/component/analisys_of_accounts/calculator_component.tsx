/** @format */

import {
  Box,
  Card,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useLocalObservable } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import CalcCard from './calc_card';

interface CalculatorComponentProps {
  flatDataOfFocused: FlatData[];
  plus: string[];
  division?: string[];
}

const useStyles = makeStyles((theme) => ({
  title: {
    magin: '0.5rem',
    textAlign: 'center',
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
  result: {
    position: 'absolute',
    top: '0',
    right: '0',
    fontSize: '1.5rem',
    color: theme.palette.primary.light,
  },
}));

const CalculatorComponent: React.FC<CalculatorComponentProps> = ({
  flatDataOfFocused,
  plus,
  division,
}) => {
  const classes = useStyles();
  const [result, setresult] = useState(0);
  const [plusState, setplusState] = useState<FlatData[]>(
    plus.map((plusItem) => {
      const inList = flatDataOfFocused.find((flatItem) =>
        (flatItem.name + flatItem.detail).includes(plusItem)
      );
      return inList ? inList : { name: '조회실패', amount: 0 };
    })
  );
  const [divisionState, setdivisionState] = useState<FlatData[] | null>(
    division
      ? division.map((divisionItem) => {
          const inList = flatDataOfFocused.find((flatItem) =>
            (flatItem.name + flatItem.detail).includes(divisionItem)
          );
          return inList ? inList : { name: '조회실패', amount: 1 };
        })
      : null
  );

  useEffect(() => {
    const molecular = plusState
      .map((li) => li.amount)
      .reduce((pre, cur) => pre + cur);
    const denominator = divisionState
      ?.map((li) => li.amount)
      .reduce((pre, cur) => pre + cur);
    denominator
      ? setresult(Math.floor((molecular / denominator) * 100))
      : setresult(molecular);
  }, [plusState, divisionState]);

  return (
    <>
      <CountUp className={classes.result} end={result} suffix=' %' />
      <Box p={1} boxShadow={2}>
        <CalcCard
          state={plusState}
          flatDataOfFocused={flatDataOfFocused}
          updateState={setplusState}
        />
        {divisionState && (
          <CalcCard
            state={divisionState}
            flatDataOfFocused={flatDataOfFocused}
            updateState={setdivisionState}
          />
        )}

        <Typography align='center' variant='subtitle1'>
          <span>
            {plusState.length === 1
              ? plusState[0].amount
              : `(${plusState.map((li) => li.amount).join('+')})`}
          </span>
          {divisionState && (
            <>
              <span> ÷ </span>
              <span>
                {divisionState.length === 1
                  ? divisionState[0].amount
                  : `(${divisionState.map((li) => li.amount).join('+')})`}
              </span>
            </>
          )}
        </Typography>
      </Box>
    </>
  );
};

export default CalculatorComponent;
