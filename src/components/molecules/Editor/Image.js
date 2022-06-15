import ImageIcon from '@mui/icons-material/Image';
import { IconButton } from '@mui/material';
import onUpload from 'assets/js/helper/onUpload';
import PropTypes from 'prop-types';
import React from 'react';

function Image({ editor }) {
  const handleSetImage = () => {
    onUpload({
      options: {},
      onSuccess: (files) => {
        const file = files[0];
        if (file?.preview) editor.chain().focus().setImage({ src: file?.preview }).run();
      },
      onError: (error) => console.log(error),
    });
  };
  return (
    <IconButton onClick={handleSetImage}>
      <ImageIcon />
    </IconButton>
  );
}

Image.propTypes = {
  editor: PropTypes.object.isRequired,
};

export default Image;
