import React from 'react';
import PropTypes from 'prop-types';
import { CardMedia, styled } from '@mui/material';

const eRatio = {
  169: '56.25%',
  43: '75%',
  11: '100%',
};

const StyledCardMedia = styled(CardMedia)(({ ratio }) => ({
  height: 0,
  paddingTop: eRatio[ratio] || '100%', // 16:9
}));

function Image(props) {
  const { ratio = "11", ...rest } = props;
  return <StyledCardMedia ratio={ratio} {...rest} />;
}

Image.propTypes = {
  ratio: PropTypes.oneOf(Object.keys(eRatio)),
};

export default Image;
