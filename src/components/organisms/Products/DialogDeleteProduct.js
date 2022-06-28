import Dialog from 'components/atoms/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
function DialogDeleteProduct(props) {
  const { open, onClose, id, limit, isLoading, triggerDeleteProduct, triggerGetListProduct } = props;

  const onSubmit = async () => {
    try {
      const res = await triggerDeleteProduct(id);
      unwrapResult(res);
      onClose();
      triggerGetListProduct({
        page: 1,
        limit,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Xóa sản phẩm"
      content="Bạn có chắc chắn muốn thực hiện thao tác này?"
      onSubmit={onSubmit}
      textSubmit="Xác nhận"
      isLoading={isLoading}
    />
  );
}

DialogDeleteProduct.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  limit: PropTypes.number,
  triggerDeleteProduct: PropTypes.func,
  triggerGetListProduct: PropTypes.func,
};

export default DialogDeleteProduct;
