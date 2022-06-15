import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

/* Đang xem ..n.. kết quả */
export default function ResultNumber({ length }) {
  return (
    <Typography variant="body2" gutterBottom align="right" color="textSecondary">
      Đang xem <b>{length}</b> kết quả
    </Typography>
  );
}
ResultNumber.propTypes = {
  length: PropTypes.number,
};
