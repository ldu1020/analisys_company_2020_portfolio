/** @format */

import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export interface CategoryPickerProps {
  sj_div: 'IS' | 'BS';
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const CategoryPicker: React.FC<CategoryPickerProps> = observer(
  ({ sj_div, handleChange }) => {
    return (
      <FormControl>
        <InputLabel>계정과목분석</InputLabel>
        <Select value={sj_div} onChange={handleChange}>
          <MenuItem value='IS'>손익계산서</MenuItem>
          <MenuItem value='BS'>대차대조표</MenuItem>
        </Select>
      </FormControl>
    );
  }
);

export default CategoryPicker;
