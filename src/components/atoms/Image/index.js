import React from 'react';
import PropTypes from 'prop-types';
import { CardMedia, IconButton, styled } from '@mui/material';
import { Close } from '@mui/icons-material';

const eRatio = {
  169: '56.25%',
  43: '75%',
  11: '100%',
};

const WrapperImage = styled('div')({
  position: 'relative',
});

const StyledCardMedia = styled(CardMedia)(({ theme, ratio }) => ({
  height: 0,
  paddingTop: eRatio[ratio] || '100%', // 16:9
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 4,
}));

const StyledAction = styled(IconButton)({
  position: 'absolute',
  top: 0,
  right: 0,
});

function Image(props) {
  const { ratio = '11', isDelete, onDelete, ...rest } = props;
  return (
    <WrapperImage>
      <StyledCardMedia ratio={ratio} {...rest} />
      {isDelete && (
        <StyledAction size="small" color="default" onClick={onDelete}>
          <Close />
        </StyledAction>
      )}
    </WrapperImage>
  );
}

Image.propTypes = {
  ratio: PropTypes.oneOf(Object.keys(eRatio)),
  isDelete: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default Image;
