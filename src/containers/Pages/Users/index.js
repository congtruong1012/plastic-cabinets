import { Avatar, CardHeader, Grid, LinearProgress, Stack } from '@mui/material';
import createRows from 'assets/js/helper/createRows';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import Pagination from 'components/atoms/Pagination';
import TextField from 'components/atoms/TextField';
import TypoLink from 'components/atoms/Typography/TypoLink';
import BECard from 'components/molecules/BECard';
import ResponsiveTable from 'components/molecules/ResponsiveTable';
import DialogCreateUser from 'components/organisms/Users/DialogCreateUser';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateUser, fetchGetListUser } from './reducer';

const LIMIT = 10;

function Users(props) {
  const { role } = props;
  const [open, setOpen] = useState(false);
  // Selector
  const { isLoading, isLoadingCreate, list, params, total } = useSelector((state) => state.users);

  // Dispatch
  const dispatch = useDispatch();
  const triggerGetListUser = (params) => dispatch(fetchGetListUser(params));
  const triggerCreatetUser = (params) => dispatch(fetchCreateUser(params));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLoadMore = (e, newPage) => {
    triggerGetListUser({ params: { ...params, page: newPage }, isFirst: false });
  };
  const rows = list?.map((user) => createRows(user, user?.email, user?.role));

  const column = [
    {
      id: 'c1',
      label: 'Tên tài khoản',
      format: (value) => (
        <CardHeader
          avatar={<Avatar src={value?.avatar} />}
          title={value?.fullName}
          subheader={
            role === 1 &&
            value?.role !== 1 && (
              <TypoLink variant="body2" color={value?.role === 0 ? 'error' : 'primary'}>
                {value?.role === 0 ? 'Xóa thành viên' : 'Thêm thành viên'}
              </TypoLink>
            )
          }
          sx={{ p: 1 }}
        />
      ),
    },
    {
      id: 'c2',
      label: 'Email',
    },
    {
      id: 'c3',
      label: 'Vai trò',
      format: (value) => (
        <>
          {(() => {
            if (value === 1) return 'Quản trị viên';
            if (value === 0) return 'Thành viên';
            return 'Khách hàng';
          })()}
        </>
      ),
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      triggerGetListUser({
        params: { limit: LIMIT, page: 1 },
        isFirst: true,
      });
    }
  }, []);

  return (
    <>
      <Stack spacing={2}>
        <BECard
          title="Danh sách tài khoản"
          rightAction={
            role === 1 && (
              <ButtonRounded variant="contained" color="primary" onClick={handleOpen}>
                Thêm tài khoản
              </ButtonRounded>
            )
          }
        />
        <BECard>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField />
              </Grid>
            </Grid>
          </Stack>
        </BECard>
        <BECard>
          <Stack spacing={2}>
            <ResponsiveTable rows={rows} columns={column} />
            {isLoading && <LinearProgress />}
            <Pagination total={total} rows={LIMIT} page={params?.page || 1} onChange={handleLoadMore} />
          </Stack>
        </BECard>
      </Stack>
      {open && (
        <DialogCreateUser
          open={open}
          onClose={handleClose}
          limit={LIMIT}
          isLoadingCreate={isLoadingCreate}
          triggerCreateUser={triggerCreatetUser}
          triggerGetListUser={triggerGetListUser}
        />
      )}
    </>
  );
}

Users.propTypes = {
  role: PropTypes.number,
};

export default Users;
