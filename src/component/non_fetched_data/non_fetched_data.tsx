/** @format */

import React from 'react';
import { Box, Card, Typography } from '@material-ui/core';
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
        <ErrorOutlineIcon style={{ marginBottom: '1rem' }} />
        <Typography>조회된 데이터가 없습니다.</Typography>
      </Box>
    </Card>
  );
};

export default NonFetchedDataDisplay;
