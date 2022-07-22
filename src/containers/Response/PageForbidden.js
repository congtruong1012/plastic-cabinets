import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogout } from 'containers/App/reducer';
import { unwrapResult } from '@reduxjs/toolkit';
import Response from 'containers/Response';
import { Typography } from '@mui/material';
import TypoLink from '../../components/atoms/Typography/TypoLink';
import { useNavigate } from 'react-router-dom';

function PageForbidden() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await dispatch(fetchLogout());
      unwrapResult(res);
      navigator('/login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Response
      code={403}
      subtitle={
        <Typography align="center" sx={{ mt: 1 }}>
          <span>
            Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ Quản trị hệ thống để được cấp quyền truy cập
          </span>{' '}
          <br />
          <span>
            Nhấn vào{' '}
            <TypoLink display="inline" onClick={handleLogout} color="primary">
              đây
            </TypoLink>{' '}
            để đăng xuất
          </span>
        </Typography>
      }
    />
  );
}

export default PageForbidden;
