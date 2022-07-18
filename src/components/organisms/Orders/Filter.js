import React from 'react';
import PropTypes from 'prop-types';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import TextField from 'components/atoms/TextField';
import Autocomplete from 'components/atoms/Autocomplete';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import { Grid, Stack, TextField as MuiTextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import formatDateTime from 'assets/js/helper/formatDateTime';

const status = [
  {
    label: 'Chờ xác nhận',
    value: 1,
  },
  {
    label: 'Xác nhận',
    value: 2,
  },
  {
    label: 'Đã giao',
    value: 3,
  },
  {
    label: 'Đã hủy',
    value: 4,
  },
];

function Filter(props) {
  const { limit, handleFilter } = props;
  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      code: '',
      status: null,
      from: null,
      to: null,
    },
  });

  const from = watch('from');
  const to = watch('to');

  const onSubmit = (data) => {
    handleFilter({
      params: {
        limit,
        page: 1,
        code: data?.code,
        status: data?.status?.value,
        from: formatDateTime(data?.from, 'yyyy-MM-dd'),
        to: formatDateTime(data?.to, 'yyyy-MM-dd'),
      },
      isFirst: true,
    });
  };

  const onReset = () => {
    handleFilter({
      params: {
        limit,
        page: 1,
      },
      isFirst: true,
    });
    reset();
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Controller
          name="code"
          control={control}
          render={({ field }) => <TextField label="Mã đơn hàng" {...field} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Autocomplete
              label="Trạng thái"
              options={status}
              autocompleteProps={{
                value: field.value,
                onChange: (event, data) => field.onChange(data),
                isOptionEqualToValue: (option, value) => {
                  return option?.value === value?.value;
                },
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Controller
          name="from"
          control={control}
          render={({ field }) => (
            <DesktopDatePicker
              label="Từ ngày"
              inputFormat="dd/MM/yyyy"
              value={field.value}
              maxDate={to ? new Date(to) : null}
              onChange={(date) => field.onChange(date)}
              renderInput={(params) => <MuiTextField fullWidth size="small" {...params} />}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Controller
          name="to"
          control={control}
          render={({ field }) => (
            <DesktopDatePicker
              label="Đến ngày"
              inputFormat="dd/MM/yyyy"
              value={field.value}
              minDate={from ? new Date(from) : null}
              onChange={(date) => field.onChange(date)}
              renderInput={(params) => <MuiTextField fullWidth size="small" {...params} />}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack justifyContent="center" spacing={2} direction="row">
          <ButtonRounded variant="contained" onClick={handleSubmit(onSubmit)}>
            Tìm kiếm
          </ButtonRounded>
          <ButtonRounded variant="contained" color="inherit" onClick={onReset}>
            Đặt lại
          </ButtonRounded>
        </Stack>
      </Grid>
    </Grid>
  );
}

Filter.propTypes = {
  limit: PropTypes.number,
  handleFilter: PropTypes.func,
};

export default Filter;
