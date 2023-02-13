import { Avatar, CardHeader, Grid, LinearProgress, Stack } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
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
import { debounce } from '../../../assets/js/helper/debounce';
import DialogConfirm from '../../../components/molecules/DialogConfirm';
import { fetchCreateUser, fetchGetListUser, fetchRemoveRoleMember, fetchSetRoleMember } from './reducer';

const LIMIT = 10;

function Users(props) {
  const { role } = props;

  const [openCreate, setOpenCreate] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [user, setUser] = useState({});
  // Selector
  const { isLoading, isLoadingCreate, isLoadingSet, list, params, total } = useSelector((state) => state.users);

  // Dispatch
  const dispatch = useDispatch();
  const triggerGetListUser = (params) => dispatch(fetchGetListUser(params));
  const triggerCreatetUser = (params) => dispatch(fetchCreateUser(params));
  const triggerSetRole = (params) => dispatch(fetchSetRoleMember(params));
  const triggerRemoveRole = (params) => dispatch(fetchRemoveRoleMember(params));

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const handleOpenConfirm = (data) => {
    setOpenConfirm(true);
    setUser(data);
  };
  const handleCloseConfirm = () => setOpenConfirm(false);

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
              <TypoLink
                onClick={() => handleOpenConfirm(value)}
                variant="body2"
                color={value?.role === 0 ? 'error' : 'primary'}
              >
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

  const onSubmit = async () => {
    try {
      const func = user?.role === 0 ? triggerRemoveRole : triggerSetRole;

      const res = await func({
        id: user?.id,
      });
      unwrapResult(res);
      setUser({});
      handleCloseConfirm();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = debounce((e) => {
    triggerGetListUser({
      params: { limit: LIMIT, page: 1, username: e.target.value },
      isFirst: true,
    });
  }, 500);

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
              <ButtonRounded variant="contained" color="primary" onClick={handleOpenCreate}>
                Thêm tài khoản
              </ButtonRounded>
            )
          }
        />
        <BECard>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField onChange={handleSearch} placeholder="Tìm kiếm tên đăng nhập"/>
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
          open={openCreate}
          onClose={handleCloseCreate}
          limit={LIMIT}
          isLoadingCreate={isLoadingCreate}
          triggerCreateUser={triggerCreatetUser}
          triggerGetListUser={triggerGetListUser}
        />
      )}
      <DialogConfirm
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={user?.role === 0 ? 'Xoá thành viên' : 'Thêm thành viên'}
        isLoading={isLoadingSet}
        onSubmit={onSubmit}
      />
    </>
  );
}

Users.propTypes = {
  role: PropTypes.number,
};

export default Users;
