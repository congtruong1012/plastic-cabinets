import Dialog from 'components/atoms/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
function DialogDeleteCategory(props) {
  const { open, onClose, id, triggerDeleteCategory, isLoading } = props;

  const onSubmit = async () => {
    try {
      const rs = await triggerDeleteCategory(id);
      unwrapResult(rs);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Xóa danh mục"
      content="Bạn có chắc chắn muốn thực hiện thao tác này?"
      onSubmit={onSubmit}
      textSubmit="Xác nhận"
      isLoading={isLoading}
    />
  );
}

DialogDeleteCategory.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
  triggerDeleteCategory: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default DialogDeleteCategory;
