import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery, useTheme } from '@mui/material';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import ButtonRounded from '../Button/ButtonRounded';

const BootstrapDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: `${theme.spacing(2)}!important`,
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Dialog(props) {
  const {
    open,
    onClose,
    title,
    content,
    action,
    textSubmit = 'Lưu',
    textCancel = 'Hủy',
    isLoading,
    onSubmit = () => {},
    dialogProps,
    dialogTitleProps,
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        fullScreen={fullScreen}
        {...dialogProps}
      >
        {title && (
          <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose} {...dialogTitleProps}>
            {title}
          </BootstrapDialogTitle>
        )}
        {content && <DialogContent>{content}</DialogContent>}
        {action && (
          <DialogActions>
            <ButtonRounded variant="contained" color="inherit" onClick={onClose}>
              {textCancel}
            </ButtonRounded>
            <ButtonRounded variant="contained" color="primary" onClick={onSubmit} disabled={isLoading}>
              {textSubmit}
            </ButtonRounded>
          </DialogActions>
        )}
      </BootstrapDialog>
    </>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  action: PropTypes.bool,
  dialogProps: PropTypes.object,
  dialogTitleProps: PropTypes.object,
  onSubmit: PropTypes.func,
  textSubmit: PropTypes.string,
  textCancel: PropTypes.string,
  isLoading: PropTypes.bool,
};
