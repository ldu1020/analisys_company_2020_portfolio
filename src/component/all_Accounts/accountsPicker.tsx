/** @format */

import {
  Box,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import ChartOfAccounts from './chartOfAccount';

interface AccountsPickerProps {
  chosenFsList: AccountsType[];
}

const AccountsPicker: React.FC<AccountsPickerProps> = observer(
  ({ chosenFsList }) => {
    const [pickedItem, setPickedItem] = useState<AccountsType>();
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      const chosenItem = chosenFsList.find(
        (li) => li.id === event.target.value
      );
      chosenItem ? setPickedItem(chosenItem) : console.log('픽아이탐 x ');
    };

    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <FormControl>
          <InputLabel>계정과목분석</InputLabel>
          <Select
            renderValue={(value) => `${value}`}
            value={pickedItem ? pickedItem.account_nm : '선택해주세요'}
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
        <ChartOfAccounts pickedItem={pickedItem} />
      </Box>
    );
  }
);

export default AccountsPicker;
