import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/atoms/Image';
import Dialog from 'components/atoms/Dialog';
import ResponseiveTable from 'components/molecules/ResponsiveTable';
import { Stack, Typography } from '@mui/material';
import createRows from 'components/../assets/js/helper/createRows';
import formatCurrency from 'components/../assets/js/helper/formatCurrency';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';

function DialogOrderDetail(props) {
  const { open, onClose, order = {} } = props;
  const { status = 3 } = order;

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
    createRows(item?.product?.images[0], item?.product?.name, item?.quantity, formatCurrency(item?.product?.price)),
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
            Tổng tiền: {formatCurrency(12000000)}
          </Typography>
        </Stack>
      }
      action={
        <>
          {status === 1 && (
            <>
              <ButtonRounded variant="contained">Xác nhận</ButtonRounded>
              <ButtonRounded variant="contained" color="error">
                Hủy đơn
              </ButtonRounded>
            </>
          )}
          {status === 2 && (
            <ButtonRounded variant="contained" color="warning">
              Giao hàng
            </ButtonRounded>
          )}
        </>
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
};

export default DialogOrderDetail;
