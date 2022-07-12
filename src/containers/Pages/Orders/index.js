import { Stack, Typography, useTheme, LinearProgress } from '@mui/material';
import BECard from 'components/molecules/BECard';
import React, { useEffect, useState } from 'react';
import createRows from 'assets/js/helper/createRows';
import LinkTo from 'components/molecules/LinkTo';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import ResponsiveTable from 'components/molecules/ResponsiveTable';

import useFlag from 'hooks/useFlag';
import DialogOrderDetail from 'components/organisms/Orders/DialogOrderDetail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetListOrder } from './reducer';
import formatCurrency from 'assets/js/helper/formatCurrency';
import Pagination from 'components/atoms/Pagination';
import LoadingCircular from 'components/molecules/Loading/LoadingCircular';
import Filter from 'components/organisms/Orders/Filter';
// import PropTypes from 'prop-types';

const LIMIT = 1;

function Orders() {
  const theme = useTheme();

  const [open, handleOpen, handleClose] = useFlag();

  const [order, setOrder] = useState({});

  const { isLoadingOrder, params, orders, total, page } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const triggerGetListorder = (params) => dispatch(fetchGetListOrder(params));

  const handleLoadMore = (e, newPage) => {
    triggerGetListorder({ params: { ...params, page: newPage }, isFirst: false });
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
        params: {
          page: 1,
          limit: LIMIT,
        },
        isFirst: true,
      });
    }
  }, []);

  return (
    <Stack spacing={2}>
      <BECard title="Danh sách đơn hàng" />
      <BECard>
        <Filter limit={LIMIT} handleFilter={triggerGetListorder} />
      </BECard>
      <BECard>
        <Stack spacing={2}>
          {isLoadingOrder && orders?.length === 0 ? (
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
