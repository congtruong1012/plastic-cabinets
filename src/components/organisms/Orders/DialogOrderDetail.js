import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/atoms/Image';
import Dialog from 'components/atoms/Dialog';
import ResponseiveTable from 'components/molecules/ResponsiveTable';
import { CircularProgress, Stack, Typography } from '@mui/material';
import createRows from 'assets/js/helper/createRows';
import formatCurrency from 'assets/js/helper/formatCurrency';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import getPrice from 'assets/js/helper/getPrice';

function DialogOrderDetail(props) {
  const { open, onClose, order = {}, flagsAction = {}, role, handleActionOrder } = props;
  const { status = 3 } = order;
  console.log('DialogOrderDetail ~ order', order);
  const { isLoadingConfirm, isLoadingCancel, isLoadingDeliver } = flagsAction;

  const columns = [
    { id: 'c1', label: 'Hình ảnh', format: (value) => <Image image={value} ratio="169" /> },
    {
      id: 'c2',
      label: 'Tên sản phẩm',
      format: (value) => (
        <Typography variant="contained" color="primary">
          {value}
        </Typography>
      ),
    },
    { id: 'c3', label: 'Số lượng' },
    { id: 'c4', label: 'Giá' },
  ];

  const rows = (order?.detail || []).map((item) =>
    createRows(
      item?.product?.images[0],
      item?.product?.name,
      item?.quantity,
      getPrice(item?.product?.price, item?.product?.discount),
    ),
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Chi tiết đơn hàng"
      content={
        <Stack spacing={1}>
          <ResponseiveTable rows={rows} columns={columns} />
          <Typography align="right" color="error" fontSize="1.2rem" fontWeight={700}>
            Tổng tiền: {formatCurrency(order?.totalPrice)}
          </Typography>
        </Stack>
      }
      action={
        role === 1 && (
          <>
            {status === 1 && (
              <>
                <ButtonRounded
                  disabled={isLoadingConfirm}
                  startIcon={isLoadingConfirm && <CircularProgress size={20} />}
                  onClick={() => handleActionOrder(order?.code, 2)}
                  variant="contained"
                >
                  Xác nhận
                </ButtonRounded>
                <ButtonRounded
                  disabled={isLoadingCancel}
                  startIcon={isLoadingCancel && <CircularProgress size={20} />}
                  onClick={() => handleActionOrder(order?.code, 4)}
                  variant="contained"
                  color="error"
                >
                  Hủy đơn
                </ButtonRounded>
              </>
            )}
            {status === 2 && (
              <ButtonRounded
                disabled={isLoadingDeliver}
                startIcon={isLoadingDeliver && <CircularProgress size={20} />}
                onClick={() => handleActionOrder(order?.code, 3)}
                variant="contained"
                color="warning"
              >
                Giao hàng
              </ButtonRounded>
            )}
          </>
        )
      }
      dialogProps={{
        maxWidth: 'md',
        scroll: 'body',
      }}
    />
  );
}

DialogOrderDetail.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  order: PropTypes.object,
  handleActionOrder: PropTypes.func,
  flagsAction: PropTypes.object,
  role: PropTypes.number,
};

export default DialogOrderDetail;
