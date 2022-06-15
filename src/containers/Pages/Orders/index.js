import { Stack, Typography, useTheme } from '@mui/material';
import BECard from 'components/molecules/BECard';
import Filter from 'containers/Pages/Dashboard/Filter';
import React from 'react';
import createRows from 'assets/js/helper/createRows';
import LinkTo from 'components/molecules/LinkTo';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import ResponsiveTable from 'components/molecules/ResponsiveTable';
// import PropTypes from 'prop-types';

function Orders() {
  const theme = useTheme();
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
      id: 'c4',
      label: '',
      format: (value) => (
        <>
          <Stack spacing={1} direction="row">
            {value === 1 && (
              <>
                <ButtonRounded variant="contained">Xác nhận</ButtonRounded>
                <ButtonRounded variant="contained" color="error">
                  Hủy
                </ButtonRounded>
              </>
            )}
            {value === 2 && (
              <ButtonRounded variant="contained" color="warning">
                Giao hàng
              </ButtonRounded>
            )}
            <ButtonRounded>Xem chi tiết</ButtonRounded>
          </Stack>
        </>
      ),
    },
  ];

  const newestOrdersRow = [1, 2, 3, 4].map((item) =>
    createRows('O-10121998', 'Trương Chí Công', '300.000đ', item, item),
  );

  return (
    <Stack spacing={2}>
      <BECard
        title="Danh sách đơn hàng"
        rightAction={<Filter />}
        containerProps={{ alignItems: 'flex-start' }}
        rightActionProps={{ xs: 12, sm: true }}
      />
      <BECard>
        <ResponsiveTable rows={newestOrdersRow} columns={newestOrdersCol} />
      </BECard>
    </Stack>
  );
}

Orders.propTypes = {};

export default Orders;
