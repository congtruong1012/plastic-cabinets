import PropTypes from 'prop-types';
import React from 'react';

import { Box, CircularProgress, IconButton, styled } from '@mui/material';

/* nút màu trắng */
const IconButtonLight = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.38)',
  border: `1px solid ${theme.palette.grey[300]}`,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.54)',
  },
  padding: theme.spacing(1.5),
}));

function LoadingCircular(props) {
  const { isInitApp, loading = true, boxProps, buttonProps } = props;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height={isInitApp ? '100vh' : 200}
      {...boxProps}
    >
      <IconButtonLight {...buttonProps}>{loading && <CircularProgress color="primary" size={28} />}</IconButtonLight>
    </Box>
  );
}

export default LoadingCircular;

LoadingCircular.propTypes = {
  isInitApp: PropTypes.bool,
  loading: PropTypes.bool,
  isHidden: PropTypes.bool,
  buttonProps: PropTypes.object,
  boxProps: PropTypes.object,
};
