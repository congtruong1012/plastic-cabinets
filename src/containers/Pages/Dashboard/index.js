import { Grid, Skeleton, Stack, styled, Typography, useTheme } from '@mui/material';
import createRows from 'assets/js/helper/createRows';
import BECard from 'components/molecules/BECard';
import LinkTo from 'components/molecules/LinkTo';
import ResponsiveTable from 'components/molecules/ResponsiveTable';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatCurrency from 'assets/js/helper/formatCurrency';
import Filter from './Filter';
import { fetchGetDashboard, fetchGetNewestOrder, fetchGetTurnover } from './reducer';

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
  const theme = useTheme();

  const { isLoadingTurnover, isLoadingDashboard, isLoadingNewestOrder, turnover, dashboard, newsestOrder } =
    useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const triggerGetTurnover = (query) => dispatch(fetchGetTurnover(query));
  const triggerGetDashBoard = (query) => dispatch(fetchGetDashboard(query));
  const triggerGetNewestOrder = () => dispatch(fetchGetNewestOrder());

  useEffect(() => {
    const params = {
      from: format(new Date(), 'yyyy-MM-dd'),
      to: format(new Date(), 'yyyy-MM-dd'),
    };
    if (!isLoadingDashboard) {
      triggerGetDashBoard(params);
    }
    if (!isLoadingNewestOrder) {
      triggerGetNewestOrder();
    }
    if (!isLoadingTurnover) {
      triggerGetTurnover(params);
    }
  }, []);

  const turnovers = [
    {
      label: 'Tổng doanh thu',
      value: formatCurrency((turnover?.success || 0) + (turnover?.failed || 0)),
    },
    {
      label: 'Thành công',
      value: formatCurrency(turnover?.success || 0),
      color: theme.palette.primary.light,
    },
    {
      label: 'Hủy',
      value: formatCurrency(turnover?.failed || 0),
      color: theme.palette.error.light,
    },
  ];

  const orders = [
    {
      label: 'Chờ xác nhận',
      value: dashboard?.waiting || 0,
    },
    {
      label: 'Xác nhận',
      value: dashboard?.confirmed || 0,
    },
    {
      label: 'Đã giao',
      value: dashboard?.delivered || 0,
    },
    {
      label: 'Đã hủy',
      value: dashboard?.canceled || 0,
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

  const newestOrdersRow = newsestOrder.map((item) =>
    createRows(item?.code, item?.customer?.fullName, formatCurrency(item?.totalPrice)),
  );

  return (
    <Stack spacing={2}>
      <BECard title="Tổng quan" />
      <BECard
        title="Doanh thu"
        rightAction={<Filter triggerAction={triggerGetTurnover} />}
        containerProps={{ alignItems: 'flex-start' }}
        rightActionProps={{ xs: 12, sm: true }}
      >
        <Grid container spacing={2}>
          {turnovers.map((item, index) => (
            <Grid item xs={12} md={index === 0 ? 12 : 6} lg={4} key={String(index)}>
              <CardTurnover color={item.color}>
                <Typography gutterBottom variant="body2">
                  {isLoadingTurnover ? <Skeleton width={70} /> : item.label}
                </Typography>
                <Typography fontWeight={700} variant="h6">
                  {isLoadingTurnover ? <Skeleton width={30} /> : item.value}
                </Typography>
              </CardTurnover>
            </Grid>
          ))}
        </Grid>
      </BECard>
      <BECard
        title="Đơn hàng"
        rightAction={<Filter triggerAction={triggerGetDashBoard} />}
        containerProps={{ alignItems: 'flex-start' }}
        rightActionProps={{ xs: 12, sm: true }}
      >
        <Grid container spacing={2}>
          {orders.map((item, index) => (
            <Grid item xs={12} md={6} lg={3} key={String(index)}>
              <CardTurnover>
                <Typography gutterBottom variant="body2">
                  {isLoadingDashboard ? <Skeleton width={70} /> : item.label}
                </Typography>
                <Typography fontWeight={700} variant="h6" color={theme.palette.success.light}>
                  {isLoadingDashboard ? <Skeleton width={30} /> : item.value}
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
