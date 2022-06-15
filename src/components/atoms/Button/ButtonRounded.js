import React from 'react';
import { styled, Button } from '@mui/material';

const StyledButton = styled(Button)(() => ({
  borderRadius: 50,
  textTransform: 'none',
}));

function ButtonRounded(props) {
  return <StyledButton {...props} />;
}

export default ButtonRounded;
