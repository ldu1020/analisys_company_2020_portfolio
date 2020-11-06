/** @format */

import { Box, Card, Typography } from '@material-ui/core';
import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
const NonFetchedDataDisplay = () => {
  return (
    <Card>
      <Box
        height='10rem'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'>
        <ErrorOutlineIcon />
        <Typography>조회된 데이터가 없습니다.</Typography>
      </Box>
    </Card>
  );
};

export default NonFetchedDataDisplay;
