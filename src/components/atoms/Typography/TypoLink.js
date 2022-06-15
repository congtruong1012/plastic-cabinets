import React from 'react';
// import PropTypes from 'prop-types';
import { styled, Typography } from '@mui/material';

const TypographyLink = styled(Typography)(() => ({
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

function TypoLink(props) {
  return <TypographyLink {...props} />;
}

TypoLink.propTypes = {};

export default TypoLink;
