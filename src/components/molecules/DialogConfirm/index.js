import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function DialogConfirm(props) {
  const { open, onClose, title = 'Xác nhận', onSubmit = () => {}, onCancel = () => {}, isLoading, disabled } = props;

  const handleCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>Bạn có chắc thực hiện hành động này</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="contained" color="inherit">
          Hủy
        </Button>
        <Button onClick={onSubmit} variant="contained" disabled={isLoading || disabled}>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogConfirm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default DialogConfirm;
