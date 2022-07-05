import { Grid, Stack, Typography, TextField as MuiTextField, useTheme, LinearProgress } from '@mui/material';
import BECard from 'components/molecules/BECard';
import React, { useEffect, useState } from 'react';
import createRows from 'assets/js/helper/createRows';
import LinkTo from 'components/molecules/LinkTo';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import ResponsiveTable from 'components/molecules/ResponsiveTable';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import TextField from 'components/atoms/TextField';
import Autocomplete from 'components/atoms/Autocomplete';
import useFlag from 'hooks/useFlag';
import DialogOrderDetail from 'components/organisms/Orders/DialogOrderDetail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetListOrder } from './reducer';
import formatCurrency from 'assets/js/helper/formatCurrency';
import Pagination from 'components/atoms/Pagination';
import LoadingCircular from 'components/molecules/Loading/LoadingCircular';
// import PropTypes from 'prop-types';

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

const LIMIT = 10;

function Orders() {
  const theme = useTheme();

  const [open, handleOpen, handleClose] = useFlag();

  const [order, setOrder] = useState({});

  const { isLoadingOrder, params, orders, total, page } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const triggerGetListorder = (params) => dispatch(fetchGetListOrder(params));

  const handleLoadMore = (e, newPage) => {
    triggerGetListorder({ ...params, page: newPage });
  };

  const onOpen = (data) => {
    handleOpen();
    setOrder(data);
  };

  const eColor = {
    1: 'warning.main',
    2: 'success.main',
    3: 'info.main',
    4: 'error',
  };
  const newestOrdersCol = [
    {
      id: 'c1',
      label: 'Mã đơn hàng',
      format: (value) => (
        <Typography color={theme.palette.primary.light} fontWeight={700} display="inline" component={LinkTo} to="/home">
          {value}
        </Typography>
      ),
    },
    {
      id: 'c2',
      label: 'Tên khách hàng',
    },
    {
      id: 'c3',
      label: 'Tổng tiền',
      format: (value) => (
        <Typography color={theme.palette.error.light} fontWeight={700} display="inline">
          {value}
        </Typography>
      ),
    },
    {
      id: 'c4',
      label: 'Trạng thái',
      format: (value) => (
        <Typography color={eColor[value]} fontWeight={700} display="inline">
          {value === 1 && 'Chờ xác nhận'}
          {value === 2 && 'Xác nhận'}
          {value === 3 && 'Đã giao'}
          {value === 4 && 'Đã hủy'}
        </Typography>
      ),
    },
    {
      id: 'c5',
      label: '',
      format: (value) => (
        <>
          <Stack spacing={1} direction="row">
            {value?.status === 1 && (
              <>
                <ButtonRounded variant="contained">Xác nhận</ButtonRounded>
                <ButtonRounded variant="contained" color="error">
                  Hủy đơn
                </ButtonRounded>
              </>
            )}
            {value?.status === 2 && (
              <ButtonRounded variant="contained" color="warning">
                Giao hàng
              </ButtonRounded>
            )}
            <ButtonRounded onClick={() => onOpen(value)}>Xem chi tiết</ButtonRounded>
          </Stack>
        </>
      ),
    },
  ];

  const newestOrdersRow = orders.map((item) =>
    createRows(item?.code, item?.customer?.fullName, formatCurrency(item?.totalPrice), item?.status, item),
  );

  useEffect(() => {
    if (!isLoadingOrder) {
      triggerGetListorder({
        page: 1,
        limit: LIMIT,
      });
    }
  }, []);

  return (
    <Stack spacing={2}>
      <BECard title="Danh sách đơn hàng" />
      <BECard>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField label="Mã đơn hàng" />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Autocomplete label="Trạng thái" options={status} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <DesktopDatePicker
              label="Từ ngày"
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <MuiTextField fullWidth size="small" {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <DesktopDatePicker
              label="Đến ngày"
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <MuiTextField fullWidth size="small" {...params} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack justifyContent="center" spacing={2} direction="row">
              <ButtonRounded
                variant="contained"
                //  onClick={handleSubmit(onSubmit)}
              >
                Tìm kiếm
              </ButtonRounded>
              <ButtonRounded
                variant="contained"
                color="inherit"
                // onClick={onReset}
              >
                Đặt lại
              </ButtonRounded>
            </Stack>
          </Grid>
        </Grid>
      </BECard>
      <BECard>
        <Stack spacing={2}>
          {isLoadingOrder && orders?.lenght === 0 ? (
            <LoadingCircular />
          ) : (
            <>
              <ResponsiveTable rows={newestOrdersRow} columns={newestOrdersCol} />
              {isLoadingOrder && <LinearProgress />}
              <Pagination total={total} rows={LIMIT} page={page} onChange={handleLoadMore} />
            </>
          )}
        </Stack>
      </BECard>
      {open && <DialogOrderDetail open={open} onClose={handleClose} order={order} />}
    </Stack>
  );
}

Orders.propTypes = {};

export default Orders;
