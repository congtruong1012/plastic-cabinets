/* eslint-disable react/display-name */
import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const TextField = React.forwardRef((props, ref) => {
  return <MuiTextField size="small" variant="outlined" fullWidth {...props} inputRef={ref} />;
});

TextField.propTypes = {};

export default TextField;
