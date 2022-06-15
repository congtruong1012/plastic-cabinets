// dùng check responsive table
import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import ResultNumber from './ResultNumber';
import ViewAsList from './ViewAsList';
import ViewAsTable from './ViewAsTable';
import { tableDefaultProps, tablePropTypes } from './tableConfig';

/* check hiển thị table theo màn hình
- breakpoints: độ rộng tối đa hiển thị dạng table
*/
export default function ResponsiveTable(props) {
  const { showResultNumber, rows } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      {showResultNumber && <ResultNumber length={rows?.length} />}
      {matches ? <ViewAsList {...props} /> : <ViewAsTable {...props} />}
    </div>
  );
}
ResponsiveTable.propTypes = {
  breakpoints: PropTypes.string,
  ...tablePropTypes,
};
ResponsiveTable.defaultProps = {
  breakpoints: 'md',
  ...tableDefaultProps,
};
