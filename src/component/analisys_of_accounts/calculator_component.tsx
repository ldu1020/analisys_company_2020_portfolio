/** @format */

import React, { useEffect, useState } from 'react';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import CountUp from 'react-countup';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CalcCard from './calc_card';
import { useStore } from '../../stores/setUpContext';

interface CalculatorComponentProps {
  description: string;
  plus: string[];
  division: string[];
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
    wordBreak: 'keep-all',
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

const CalculatorComponent: React.FC<CalculatorComponentProps> = observer(
  ({ description, plus, division }) => {
    const classes = useStyles();
    const rootStore = useStore();
    const { flatDataOfFocused } = rootStore;
    const [plusState, setplusState] = useState<FlatData[]>(
      getAccounts(flatDataOfFocused!, plus)
    );
    const [divisionState, setdivisionState] = useState<FlatData[]>(
      getAccounts(flatDataOfFocused!, division)
    );
    const [result, setresult] = useState(0);

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

    reaction(
      () => rootStore.flatDataOfFocused,
      (arg, pre) => {
        if (arg !== pre && arg) {
          const updatePlus = getAccounts(arg, plus);
          const updatedivision = getAccounts(arg, division);
          setplusState(updatePlus);
          setdivisionState(updatedivision);
        }
      }
    );

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
                                li.minus ? `(${li.amount * -1})` : li.amount
                              )
                              .join(` + `)})`}
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
                flatDataOfFocused={flatDataOfFocused!}
                updateState={setplusState}
              />
              {divisionState && (
                <>
                  <p className={classes.title}>분모</p>
                  <CalcCard
                    state={divisionState}
                    flatDataOfFocused={flatDataOfFocused!}
                    updateState={setdivisionState}
                  />
                </>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </>
    );
  }
);

export default CalculatorComponent;

function getAccounts(list: FlatData[], pickedItems: string[]) {
  return pickedItems.map((item) => {
    const inList = list.find((flatItem) =>
      item[0] === '-'
        ? (flatItem.name + flatItem.detail).includes(item.slice(1))
        : (flatItem.name + flatItem.detail).includes(item)
    );
    if (!inList) {
      return {
        name: '조회실패',
        amount: 0,
        minus: false,
      };
    }
    return item[0] === '-'
      ? {
          ...inList,
          minus: true,
        }
      : inList;
  });
}
