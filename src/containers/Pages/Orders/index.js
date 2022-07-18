import { Stack, Typography, useTheme, LinearProgress, CircularProgress } from '@mui/material';
import BECard from 'components/molecules/BECard';
import React, { useEffect, useState } from 'react';
import createRows from 'assets/js/helper/createRows';
import LinkTo from 'components/molecules/LinkTo';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import ResponsiveTable from 'components/molecules/ResponsiveTable';

import useFlag from 'hooks/useFlag';
import DialogOrderDetail from 'components/organisms/Orders/DialogOrderDetail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCancelOrder, fetchConfirmOrder, fetchDeliverOrder, fetchGetListOrder } from './reducer';
import formatCurrency from 'assets/js/helper/formatCurrency';
import Pagination from 'components/atoms/Pagination';
import LoadingCircular from 'components/molecules/Loading/LoadingCircular';
import Filter from 'components/organisms/Orders/Filter';
import { unwrapResult } from '@reduxjs/toolkit';
import HelmetHOC from '../../HOCs/HelmetHOC';
// import PropTypes from 'prop-types';

const LIMIT = 10;

function Orders() {
  const theme = useTheme();

  const [open, handleOpen, handleClose] = useFlag();

  const [order, setOrder] = useState({});

  const { isLoadingOrder, isLoadingConfirm, isLoadingCancel, isLoadingDeliver, params, orders, total, page } =
    useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const triggerGetListorder = (params) => dispatch(fetchGetListOrder(params));
  const triggerConfirmOrder = (params) => dispatch(fetchConfirmOrder(params));
  const triggerCancelOrder = (params) => dispatch(fetchCancelOrder(params));
  const triggerDeliverOrder = (params) => dispatch(fetchDeliverOrder(params));

  const handleLoadMore = (e, newPage) => {
    triggerGetListorder({ params: { ...params, page: newPage }, isFirst: false });
  };

  const handleActionOrder = async (code, action) => {
    try {
      let res;
      if (action === 2) res = await triggerConfirmOrder({ code });
      if (action === 3) res = await triggerDeliverOrder({ code });
      if (action === 4) res = await triggerCancelOrder({ code });
      unwrapResult(res);
      console.log('handleActionOrder ~ res', res);
    } catch (e) {
      console.log(e);
    }
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

  const flagsAction = {
    isLoadingOrder,
    isLoadingConfirm,
    isLoadingCancel,
    isLoadingDeliver,
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
                <ButtonRounded
                  disabled={isLoadingConfirm}
                  startIcon={isLoadingConfirm && <CircularProgress size={20} />}
                  onClick={() => handleActionOrder(value?.code, 2)}
                  variant="contained"
                >
                  Xác nhận
                </ButtonRounded>
                <ButtonRounded
                  disabled={isLoadingCancel}
                  startIcon={isLoadingCancel && <CircularProgress size={20} />}
                  onClick={() => handleActionOrder(value?.code, 4)}
                  variant="contained"
                  color="error"
                >
                  Hủy đơn
                </ButtonRounded>
              </>
            )}
            {value?.status === 2 && (
              <ButtonRounded
                disabled={isLoadingDeliver}
                startIcon={isLoadingDeliver && <CircularProgress size={20} />}
                onClick={() => handleActionOrder(value?.code, 3)}
                variant="contained"
                color="warning"
              >
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
    <>
      <HelmetHOC title="Orders" />
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
        {open && (
          <DialogOrderDetail
            open={open}
            onClose={handleClose}
            order={order}
            flagsAction={flagsAction}
            handleActionOrder={handleActionOrder}
          />
        )}
      </Stack>
    </>
  );
}

Orders.propTypes = {};

export default Orders;
