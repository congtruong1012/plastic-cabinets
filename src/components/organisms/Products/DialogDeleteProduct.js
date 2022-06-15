import Dialog from 'components/atoms/Dialog';
import PropTypes from 'prop-types';
import React from 'react';

function DialogDeleteProduct(props) {
  const { open, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Xóa sản phẩm"
      content="Bạn có chắc chắn muốn thực hiện thao tác này?"
      onSubmit={onClose}
      textSubmit="Xác nhận"
    />
  );
}

DialogDeleteProduct.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default DialogDeleteProduct;
