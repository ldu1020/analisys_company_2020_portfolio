/** @format */

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import CalcCard from './calc_card';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface CalculatorComponentProps {
  flatDataOfFocused: FlatData[];
  description: string;
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
  basis: {
    color: theme.palette.text.secondary,
  },
  result: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    fontSize: '1.5rem',
    color: theme.palette.primary.light,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const CalculatorComponent: React.FC<CalculatorComponentProps> = ({
  description,
  flatDataOfFocused,
  plus,
  division,
}) => {
  const classes = useStyles();
  const [result, setresult] = useState(0);
  const [plusState, setplusState] = useState<FlatData[]>(
    plus.map((plusItem) => {
      const inList = flatDataOfFocused.find((flatItem) =>
        plusItem[0] === '-'
          ? (flatItem.name + flatItem.detail).includes(plusItem.slice(1))
          : (flatItem.name + flatItem.detail).includes(plusItem)
      );
      if (!inList) {
        return { name: '조회실패', amount: 0 };
      }
      return plusItem[0] === '-'
        ? {
            name: inList.name,
            detail: inList.detail,
            amount: inList.amount,
            minus: true,
          }
        : inList;
    })
  );
  const [divisionState, setdivisionState] = useState<FlatData[] | null>(
    division
      ? division.map((divisionItem) => {
          const inList = flatDataOfFocused.find((flatItem) =>
            divisionItem[0] === '-'
              ? (flatItem.name + flatItem.detail).includes(
                  divisionItem.slice(1)
                )
              : (flatItem.name + flatItem.detail).includes(divisionItem)
          );
          if (!inList) {
            return { name: '조회실패', amount: 0 };
          }
          return divisionItem[0] === '-'
            ? {
                name: inList.name,
                detail: inList.detail,
                amount: inList.amount,
                minus: true,
              }
            : inList;
        })
      : null
  );

  useEffect(() => {
    const molecular = plusState
      .map((li) => (li.minus ? li.amount * -1 : li.amount))
      .reduce((pre, cur) => pre + cur);
    const denominator = divisionState
      ?.map((li) => (li.minus ? li.amount * -1 : li.amount))
      .reduce((pre, cur) => pre + cur);
    molecular && denominator
      ? setresult(Math.floor((molecular / denominator) * 100))
      : setresult(0);
  }, [plusState, divisionState]);

  return (
    <>
      <CountUp className={classes.result} end={result} suffix=' %' />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <div className={classes.basis}>
            {result ? (
              <>
                <span>
                  {plusState.length === 1
                    ? plusState[0].minus
                      ? plusState[0].amount * -1
                      : plusState[0].amount
                    : `(${plusState
                        .map((li) => (li.minus ? li.amount * -1 : li.amount))
                        .join('+')})`}
                </span>
                {divisionState && (
                  <>
                    <span> ÷ </span>
                    <span>
                      {divisionState.length === 1
                        ? divisionState[0].minus
                          ? divisionState[0].amount * -1
                          : divisionState[0].amount
                        : `(${divisionState
                            .map((li) =>
                              li.minus ? li.amount * -1 : li.amount
                            )
                            .join('+')})`}
                    </span>
                  </>
                )}
              </>
            ) : (
              <p>조회되지 않은 값이 있습니다.</p>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <p>{description}</p>
          <Box p={1} boxShadow={2}>
            <p className={classes.title}>분자</p>
            <CalcCard
              state={plusState}
              flatDataOfFocused={flatDataOfFocused}
              updateState={setplusState}
            />
            {divisionState && (
              <>
                <p className={classes.title}>분모</p>
                <CalcCard
                  state={divisionState}
                  flatDataOfFocused={flatDataOfFocused}
                  updateState={setdivisionState}
                />
              </>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CalculatorComponent;
