/** @format */

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Zoom,
} from '@material-ui/core';
import React, { useReducer } from 'react';
import { useStore } from '../../stores/setUpContext';
import CheckIcon from '@material-ui/icons/Check';
import { DoubleArrow } from '@material-ui/icons';
import { ffc_initialState, reducer } from './ffc_reducer';

export default function FindCorpCode() {
  const { findCorpName } = useStore();
  const [state, dispatch] = useReducer(reducer, ffc_initialState);

  const onChange = (e: any) => {
    console.log(e.target.value);
    dispatch({
      type: 'ON_CHANGE',
      target: e.target,
    });
  };

  const onSearchName = () => {
    dispatch({
      type: 'SEARCH_NAME',
      pickedData: findCorpName(state.corp_name),
    });
  };

  return (
    <section>
      <div>
        <TextField
          error={state.nameError}
          helperText={state.nameError && '찾으시는 회사가 없습니다.'}
          name='corp_name'
          onChange={onChange}
          label='회사이름'
          variant='outlined'
        />
        <button onClick={onSearchName}>검색</button>
        <Zoom in={state.corpData ? true : false}>
          <CheckIcon />
        </Zoom>
      </div>
      <FormControl
        disabled={!state.corpData ? true : false}
        variant='outlined'
        style={{ width: '20%' }}>
        <InputLabel id='demo-simple-select-label'>조회년도</InputLabel>
        <Select
          label='조회년도'
          name='bsns_year'
          onChange={onChange}
          value={state.bsns_year}>
          <MenuItem value='2015'>2015</MenuItem>
          <MenuItem value='2016'>2016</MenuItem>
          <MenuItem value='2017'>2017</MenuItem>
          <MenuItem value='2018'>2018</MenuItem>
          <MenuItem value='2019'>2019</MenuItem>
        </Select>
        <InputLabel id='demo-simple-select-label'>분기</InputLabel>
        <Select
          label='분기'
          name='reprt_code'
          onChange={onChange}
          value={state.bsns_year}>
          <MenuItem value={'11011'}>사업보고서</MenuItem>
          <MenuItem value={'11012'}>반기보고서</MenuItem>
          <MenuItem value={'11013'}>1분기보고서</MenuItem>
          <MenuItem value={'11014'}>3분기보고서</MenuItem>
        </Select>
        <Button variant='contained' color='primary'>
          <DoubleArrow fontSize={'large'} />
        </Button>
      </FormControl>
    </section>
  );
}
