/** @format */

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  Box,
  FormControl,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  useTheme,
} from '@material-ui/core';

import NonFetchedDataDisplay from '../non_fetched_data/non_fetched_data';
import ChartOfAccounts from './chart_of_account';

interface AccountsPickerProps {
  chosenFsList: AccountsType[];
}

const useStyles = makeStyles((theme) => ({
  seletor: {
    minWidth: '10rem',
  },
}));

const AccountsPicker: React.FC<AccountsPickerProps> = observer(
  ({ chosenFsList }) => {
    const [pickedItem, setPickedItem] = useState<AccountsType>();
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      const chosenItem = chosenFsList.find(
        (li) => li.id === event.target.value
      );
      chosenItem && setPickedItem(chosenItem);
    };
    const theme = useTheme();
    const classes = useStyles();
    return (
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
        alignItems='center'
        width='100%'
        height='20rem'>
        <FormControl className={classes.seletor}>
          <InputLabel>3분기조회</InputLabel>
          <Select
            renderValue={(value) => `${value}`}
            value={pickedItem ? pickedItem.account_nm : ''}
            onChange={handleChange}>
            {chosenFsList.map((li) => {
              return (
                <MenuItem key={li.id} value={li.id}>
                  <ListItemText
                    primary={li.account_nm}
                    secondary={
                      li.account_detail === '-' ? null : li.account_detail
                    }
                  />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {pickedItem ? (
          <Box width='100%' maxWidth={theme.breakpoints.values.sm}>
            <ChartOfAccounts pickedItem={pickedItem} />
          </Box>
        ) : (
          <Box width='100%'>
            <NonFetchedDataDisplay />
          </Box>
        )}
      </Box>
    );
  }
);

export default AccountsPicker;
