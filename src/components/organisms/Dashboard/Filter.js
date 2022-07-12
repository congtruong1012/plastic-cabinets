import { Grid, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Autocomplete from 'components/atoms/Autocomplete';
import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  isValid,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const filters = [
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
    value: 6,
  },
];

function Filter(props) {
  const { triggerAction } = props;

  const { control, watch } = useForm({
    defaultValues: {
      filter: filters[0],
      from: null,
      to: null,
    },
  });

  const filter = watch('filter');
  const from = watch('from');
  const to = watch('to');

  const handleFilter = (value) => {
    const params = {
      from: '',
      to: '',
    };
    if (value === 0) {
      const date = format(new Date(), 'yyyy-MM-dd');
      Object.assign(params, { from: date, to: date });
    }
    if (value === 1) {
      const date = format(addDays(new Date(), -1), 'yyyy-MM-dd');
      Object.assign(params, {
        from: date,
        to: date,
      });
    }
    if (value === 2) {
      const start = startOfWeek(new Date(), { weekStartsOn: 1 });
      const end = endOfWeek(new Date(), { weekStartsOn: 1 });
      Object.assign(params, {
        from: format(new Date(start), 'yyyy-MM-dd'),
        to: format(new Date(end), 'yyyy-MM-dd'),
      });
    }
    if (value === 3) {
      const start = startOfWeek(addWeeks(new Date(), -1), { weekStartsOn: 1 });
      const end = endOfWeek(addWeeks(new Date(), -1), { weekStartsOn: 1 });
      Object.assign(params, {
        from: format(new Date(start), 'yyyy-MM-dd'),
        to: format(new Date(end), 'yyyy-MM-dd'),
      });
    }
    if (value === 4) {
      const start = startOfMonth(new Date());
      const end = endOfMonth(new Date());
      Object.assign(params, {
        from: format(new Date(start), 'yyyy-MM-dd'),
        to: format(new Date(end), 'yyyy-MM-dd'),
      });
    }
    if (value === 5) {
      const start = startOfMonth(addMonths(new Date(), -1));
      const end = endOfMonth(addMonths(new Date(), -1));
      Object.assign(params, {
        from: format(new Date(start), 'yyyy-MM-dd'),
        to: format(new Date(end), 'yyyy-MM-dd'),
      });
    }
    triggerAction(params);
  };

  useEffect(() => {
    if (filter?.value === 6 && ![from, to].includes(null) && isValid(new Date(from)) && isValid(new Date(to))) {
      triggerAction({
        from: format(new Date(from), 'yyyy-MM-dd'),
        to: format(new Date(to), 'yyyy-MM-dd'),
      });
    }
  }, [from, to]);

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item xs={6}>
        <Controller
          name="filter"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={filters}
              autocompleteProps={{
                value: field.value,
                onChange: (e, data) => {
                  if (data?.value !== 6) handleFilter(data.value);
                  field.onChange(data);
                },
              }}
            />
          )}
        />
      </Grid>
      {filter?.value === 6 && (
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="from"
                control={control}
                render={({ field }) => (
                  <DesktopDatePicker
                    label="Từ ngày"
                    inputFormat="dd/MM/yyyy"
                    maxDate={to ? new Date(to) : undefined}
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="to"
                control={control}
                render={({ field }) => (
                  <DesktopDatePicker
                    label="Đến ngày"
                    inputFormat="dd/MM/yyyy"
                    minDate={from ? new Date(from) : undefined}
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

Filter.propTypes = {
  triggerAction: PropTypes.func,
};

export default Filter;
