/** @format */

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
  Zoom,
} from '@material-ui/core';
import React, { useReducer } from 'react';
import { useStore } from '../../stores/setUpContext';
import CheckIcon from '@material-ui/icons/Check';
import { DoubleArrow } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import { ffc_initialState, reducer } from './ffc_reducer';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react';

const StyledSection = styled('section')({
  component: 'section',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  padding: '1rem',
  height: '25rem',
});

const FindCorpCode = observer(() => {
  const { findCorpName, addFetchedCorpData } = useStore();
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

  const onSubmit = () => {
    const { corp_name, bsns_year, reprt_code, corpData } = state;
    const { corp_code, modify_date } = corpData as CORPCODE;
    addFetchedCorpData({
      id: nanoid(),
      corp_name,
      bsns_year,
      reprt_code,
      corp_code,
      modify_date,
    });
  };

  return (
    <StyledSection>
      <Typography variant='h5'>SEARCH</Typography>
      <Box component='div' display='flex' width='100%'>
        <TextField
          label='회사이름'
          name='corp_name'
          error={state.nameError}
          helperText={state.nameError && '찾으시는 회사가 없습니다.'}
          onChange={onChange}
          variant='outlined'
        />
        <Button
          onClick={onSearchName}
          variant='outlined'
          color='primary'
          style={{ height: '100%' }}>
          {state.corpData ? (
            <Zoom in={state.corpData ? true : false}>
              <CheckIcon style={{ color: 'lightgreen' }} />
            </Zoom>
          ) : (
            <SearchIcon />
          )}
        </Button>
      </Box>
      <Box display='flex'>
        <Box display='flex' flexDirection='column' width='50%'>
          <FormControl
            disabled={!state.corpData}
            variant={!state.corpData ? 'filled' : 'outlined'}>
            <InputLabel id='demo-simple-select-label'>조회년도</InputLabel>
            <Select
              label='조회년도'
              name='bsns_year'
              onChange={onChange}
              value={state.bsns_year}
              style={{ marginBottom: '1rem' }}>
              <MenuItem value='2015'>2015</MenuItem>
              <MenuItem value='2016'>2016</MenuItem>
              <MenuItem value='2017'>2017</MenuItem>
              <MenuItem value='2018'>2018</MenuItem>
              <MenuItem value='2019'>2019</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            disabled={!state.corpData}
            variant={!state.corpData ? 'filled' : 'outlined'}>
            <InputLabel id='demo-simple-select-label'>분기</InputLabel>
            <Select
              label='분기'
              name='reprt_code'
              onChange={onChange}
              value={state.reprt_code}>
              <MenuItem value={'11011'}>사업보고서</MenuItem>
              <MenuItem value={'11012'}>반기보고서</MenuItem>
              <MenuItem value={'11013'}>1분기보고서</MenuItem>
              <MenuItem value={'11014'}>3분기보고서</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box p='1rem' width='50%'>
          <Zoom in={state.corpData ? true : false}>
            <Button
              onClick={onSubmit}
              variant='contained'
              color='primary'
              style={{ width: '100%', height: '100%' }}>
              <DoubleArrow fontSize={'large'} />
            </Button>
          </Zoom>
        </Box>
      </Box>
    </StyledSection>
  );
});

export default FindCorpCode;
