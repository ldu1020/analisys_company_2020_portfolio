/** @format */

import { Card, makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    magin: '0.5rem',
    textAlign: 'center',
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
  card: {
    padding: '1rem',
    marginBottom: '1rem',
  },
  eachAmount: {
    color: theme.palette.text.secondary,
  },
  result: {
    position: 'absolute',
    top: '0',
    right: '5rem',
    fontSize: '1.3rem',
    color: theme.palette.primary.light,
  },
}));

interface CalcCardProps {
  state: any[];
  flatDataOfFocused: any;
  updateState: any;
}

const CalcCard: React.FC<CalcCardProps> = ({
  state,
  flatDataOfFocused,
  updateState,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} variant='outlined'>
      <p className={classes.title}>분자</p>
      {state.map((li, index) => (
        <div>
          <Autocomplete
            id='combo-box-demo'
            options={flatDataOfFocused}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => {
              if (value && value.amount) {
                const update = [...state];
                update[index] = value as FlatData;
                updateState(update);
              }
            }}
            value={li}
            renderInput={(params) => (
              <TextField {...params} variant='standard' />
            )}
          />
          <p className={classes.eachAmount}>{li.amount}</p>
        </div>
      ))}
    </Card>
  );
};

export default CalcCard;
