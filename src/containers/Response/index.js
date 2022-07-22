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
    title: 'Quyền truy cập bị từ chối',
    image: Image403,
  },
  500: {
    title: 'Lỗi máy chủ nội bộ',
    image: Image500,
  },
};

function Response(props) {
  const { code = 404, title, subtitle } = props;
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
        {title || eCode[code].title}
      </Typography>
      {subtitle}
    </Stack>
  );
}

Response.propTypes = {
  code: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.any,
};

export default Response;
