import React from 'react';
import Image404 from 'icons/404.svg';
import Image403 from 'icons/403.svg';
import Image500 from 'icons/error.svg';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';

const eCode = {
  404: {
    title: 'Trang không tồn tại',
    image: Image404,
  },
  403: {
    title: 'Bạn không có quyền truy cập trang này',
    image: Image403,
  },
  500: {
    title: 'Đã xảy ra lỗi. Vui lòng thử lại sau',
    image: Image500,
  },
};

function Response(props) {
  const { code = 404 } = props;
  return (
    <Stack alignItems="center" sx={{ height: '100vh' }}>
      <div
        style={{
          height: '50%',
          width: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${eCode[code].image})`,
          backgroundPosition: 'center',
        }}
        alt={code}
      />
      <Typography variant="h5" fontWeight={700}>
        {eCode[code].title}
      </Typography>
    </Stack>
  );
}

Response.propTypes = {
  code: PropTypes.number,
};

export default Response;
