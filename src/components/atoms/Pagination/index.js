import React from 'react';
import PropTypes from 'prop-types';
import { Box, Pagination as MuiPagination } from '@mui/material';

function Pagination(props) {
  const { total, rows, page, ...rest } = props;
  const count = Math.ceil(total / rows);
  return (
    <Box display="flex" justifyContent="center">
      <MuiPagination count={count} page={+page} variant="outlined" color="primary" {...rest} />
    </Box>
  );
}

Pagination.propTypes = {
  total: PropTypes.number,
  rows: PropTypes.number,
  page: PropTypes.number,
};

export default Pagination;
