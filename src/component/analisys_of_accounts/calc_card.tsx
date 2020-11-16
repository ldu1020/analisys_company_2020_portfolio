/** @format */

import React from 'react';
import { observer } from 'mobx-react';
import {
  Card,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '1rem',
    marginBottom: '1rem',
  },
  listBelow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eachAmount: {
    color: theme.palette.text.secondary,
  },
  checkboxLabel: {
    fontSize: '0.5rem',
    color: theme.palette.secondary.light,
  },
}));

interface CalcCardProps {
  state: FlatData[];
  flatDataOfFocused: FlatData[];
  updateState: any;
}

const CalcCard: React.FC<CalcCardProps> = observer(
  ({ state, flatDataOfFocused, updateState }) => {
    const classes = useStyles();

    return (
      <Card className={classes.card} variant='outlined'>
        {state.map((li, index) => (
          <div key={li.name + li.detail}>
            <Autocomplete
              options={flatDataOfFocused}
              getOptionLabel={(option) =>
                `${option.name}${option.detail ? '-' + option.detail : ''}`
              }
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
            <div className={classes.listBelow}>
              <p className={classes.eachAmount}>{li.amount}</p>
              <FormControlLabel
                classes={{ label: classes.checkboxLabel }}
                control={
                  <Checkbox
                    checked={Boolean(li.minus)}
                    onChange={() => {
                      const update = [...state];
                      update[index].minus = !update[index].minus;
                      updateState(update);
                    }}
                  />
                }
                label='minus?'
                labelPlacement='start'
              />
            </div>
          </div>
        ))}
      </Card>
    );
  }
);

export default CalcCard;
