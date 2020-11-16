/** @format */

import { Box, Button, IconButton, makeStyles } from '@material-ui/core';
import React from 'react';
import { useStore } from '../../stores/setUpContext';
import TransitionsModal from '../transition_modal/transition_modal';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import CheckIcon from '@material-ui/icons/Check';

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
}));

const IfFetchError = () => {
  const { ForERROR, fetchLoading } = useStore();
  const classes = useStyles();

  const guideComponent = (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'>
      <ul>
        <li>DART api 에 문제가 있는경우</li>
        <li>검색하는 회사마다 데이터가 비어 있는경우</li>
        <li>그 다른 어떠한 오류 시에,</li>
      </ul>

      <p>
        firebase 에 백업해둔 삼성, 엘지 등의 데이터를 불러오려면 하단의 버튼을
        클릭 해 주세요!
      </p>
      <IconButton onClick={ForERROR}>
        <SystemUpdateAltIcon />
      </IconButton>
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
};

export default IfFetchError;
