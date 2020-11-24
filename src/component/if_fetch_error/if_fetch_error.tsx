/** @format */

import React from 'react';
import { observer } from 'mobx-react';

import {
  Box,
  CircularProgress,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

import { useStore } from '../../stores/setUpContext';
import TransitionsModal from '../transition_modal/transition_modal';

const useStyles = makeStyles((theme) => ({
  modalButtonText: {
    background: 'none',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    fontStyle: 'oblique',
    textDecoration: 'underline',
  },
  header: {
    fontWeight: 'lighter',
    transition: '0.4s all',
    color: theme.palette.text.hint,
  },
  errorWay: {
    width: '100%',
    padding: '1rem',
    marginBottom: '2rem',
    border: `1px solid ${theme.palette.warning.light}`,
    transition: '0.2s all',
    '& ul li': {
      listStyleType: 'square',
      color: theme.palette.text.secondary,
      marginBottom: '1rem',
    },
  },
  btnWrapper: {
    '&:hover ~ $header': {
      fontWeight: 'bolder',
      color: theme.palette.warning.light,
      transform: 'translateY(7rem)',
    },
    '&:hover ~ $errorWay': {
      transform: 'scaleY(0)',
    },
  },
  fetchBtn: {
    color: theme.palette.text.secondary,
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.warning.light,
      color: '#fff',
    },
  },
}));

const IfFetchError = observer(() => {
  const { ForERROR, fetchLoading } = useStore();
  const classes = useStyles();

  const guideComponent = (
    <Box
      display='flex'
      flexDirection='column-reverse'
      justifyContent='center'
      alignItems='center'>
      <div className={classes.btnWrapper}>
        {fetchLoading ? (
          <CircularProgress />
        ) : (
          <IconButton onClick={ForERROR} className={classes.fetchBtn}>
            <SystemUpdateAltIcon />
          </IconButton>
        )}
      </div>
      <div className={classes.errorWay}>
        <ul>
          <li>DART api 에 문제가 있는경우</li>
          <li>검색하는 회사마다 데이터가 비어 있는경우</li>
          <li>그 다른 어떠한 오류 시에,</li>
        </ul>
      </div>

      <h1 className={classes.header}>BACK UP DATA</h1>
    </Box>
  );

  return (
    <Box display='flex' justifyContent='flex-end' alignItems='center' p={3}>
      <TransitionsModal
        buttonText='회사 데이터에 문제가 있나요?'
        buttonClassName={classes.modalButtonText}
        component={guideComponent}
      />
    </Box>
  );
});

export default IfFetchError;
