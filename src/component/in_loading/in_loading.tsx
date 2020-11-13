/** @format */

import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

const InLoading = () => {
  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'>
      <CircularProgress />
    </Box>
  );
};

export default InLoading;
