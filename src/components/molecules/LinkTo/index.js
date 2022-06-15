import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouteLink } from 'react-router-dom';
import { Link } from '@mui/material';

function LinkTo(props) {
  const { children, to, ...other } = props;
  return (
    <Link href="#" underline="none" component={RouteLink} to={to} {...other}>
      {children}
    </Link>
  );
}

LinkTo.propTypes = { children: PropTypes.node, to: PropTypes.string };

export default LinkTo;
