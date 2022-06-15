import React from 'react';
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';

function Autocomplete(props) {
  const {
    options = [
      { label: 'Option 1', value: 0 },
      { label: 'Option 2', value: 2 },
    ],
    label,
    textfieldProps = {},
    autocompleteProps = {},
  } = props;

  return (
    <MuiAutocomplete
      options={options}
      renderInput={(params) => {
        return <TextField {...params} label={label} size="small" fullWidth {...textfieldProps} />;
      }}
      getOptionLabel={(option) => option?.label}
      {...autocompleteProps}
    />
  );
}

Autocomplete.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  textfieldProps: PropTypes.object,
  autocompleteProps: PropTypes.object,
};

export default Autocomplete;
