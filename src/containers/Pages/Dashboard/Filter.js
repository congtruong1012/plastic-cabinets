import { Grid } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Autocomplete from 'components/atoms/Autocomplete';
import TextField from 'components/atoms/TextField';
import PropTypes from 'prop-types';
import React from 'react';

const filter = [
  {
    label: 'Hôm nay',
    value: 0,
  },
  {
    label: 'Hôm qua',
    value: 1,
  },
  {
    label: 'Tuần này',
    value: 2,
  },
  {
    label: 'Tuần trước',
    value: 3,
  },
  {
    label: 'Tháng này',
    value: 4,
  },
  {
    label: 'Tháng trước',
    value: 5,
  },
  {
    label: 'Tùy chọn',
    value: 5,
  },
];

function Filter(props) {
  const { onChange, value } = props;
  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item xs={6}>
        <Autocomplete options={filter} value={value} onChange={(e, data) => onChange(data)} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DesktopDatePicker
              label="Từ ngày"
              inputFormat="dd/MM/yyyy"
              value={new Date()}
              onChange={() => {}}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DesktopDatePicker
              label="Đến ngày"
              inputFormat="dd/MM/yyyy"
              value={new Date()}
              onChange={() => {}}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
};

export default Filter;
