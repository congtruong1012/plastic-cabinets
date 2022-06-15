import { Grid, Stack, styled, Typography, useTheme } from '@mui/material';
import createRows from 'assets/js/helper/createRows';
import BECard from 'components/molecules/BECard';
import LinkTo from 'components/molecules/LinkTo';
import ResponsiveTable from 'components/molecules/ResponsiveTable';
import React, { useEffect, useState } from 'react';
import axiosClient from '../../../apis';
import Filter from './Filter';

const CardTurnover = styled('div')(({ theme, color }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3, 0),
  color: color || 'inherit',
}));

function Dashboard() {
  const [turnover, setTurnover] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    axiosClient
      .get('/user/list')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosClient
      .get('/test')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const turnovers = [
    {
      label: 'Tổng doanh thu',
      value: '100.000đ',
    },
    {
      label: 'Thành công',
      value: '100.000đ',
      color: theme.palette.primary.light,
    },
    {
      label: 'Hủy',
      value: '100.000đ',
      color: theme.palette.error.light,
    },
  ];

  const orders = [
    {
      label: 'Chờ xác nhận',
      value: '10',
    },
    {
      label: 'Xác nhận',
      value: '20',
    },
    {
      label: 'Đã giao',
      value: '50',
    },
    {
      label: 'Đã hủy',
      value: '7',
    },
  ];

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
  ];

  const newestOrdersRow = [1, 2, 3].map(() => createRows('O-10121998', 'Trương Chí Công', '300.000đ'));

  return (
    <Stack spacing={2}>
      <BECard title="Tổng quan" />
      <BECard
        title="Doanh thu"
        rightAction={<Filter value={turnover} onChange={setTurnover} />}
        containerProps={{ alignItems: 'flex-start' }}
        rightActionProps={{ xs: 12, sm: true }}
      >
        <Grid container spacing={2}>
          {turnovers.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={String(index)}>
              <CardTurnover color={item.color}>
                <Typography gutterBottom variant="body2">
                  {item.label}
                </Typography>
                <Typography fontWeight={700} variant="h6">
                  {item.value}
                </Typography>
              </CardTurnover>
            </Grid>
          ))}
        </Grid>
      </BECard>
      <BECard
        title="Đơn hàng"
        rightAction={<Filter value={turnover} onChange={setTurnover} />}
        containerProps={{ alignItems: 'flex-start' }}
        rightActionProps={{ xs: 12, sm: true }}
      >
        <Grid container spacing={2}>
          {orders.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={String(index)}>
              <CardTurnover>
                <Typography gutterBottom variant="body2">
                  {item.label}
                </Typography>
                <Typography fontWeight={700} variant="h6" color={theme.palette.success.light}>
                  {item.value}
                </Typography>
              </CardTurnover>
            </Grid>
          ))}
        </Grid>
      </BECard>

      <BECard title="Top 10 đơn hàng gần nhất">
        <ResponsiveTable rows={newestOrdersRow} columns={newestOrdersCol} />
      </BECard>
    </Stack>
  );
}

export default Dashboard;
