/** @format */

import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

interface Props {
  fullSize?: boolean;
}

const InLoading: React.FC<Props> = ({ fullSize }) => {
  return (
    <Box
      width='100%'
      height={fullSize ? '100vh' : '100%'}
      display='flex'
      alignItems='center'
      justifyContent='center'>
      <CircularProgress />
    </Box>
  );
};

export default InLoading;
