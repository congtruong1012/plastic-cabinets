import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'components/atoms/Dialog';
import TextField from 'components/atoms/TextField';

function DialogCreUpdCategory(props) {
  const { open, onClose, title = 'Thêm danh mục' } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      content={<TextField label="Tên danh mục" />}
      onSubmit={onClose}
    />
  );
}

DialogCreUpdCategory.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default DialogCreUpdCategory;
