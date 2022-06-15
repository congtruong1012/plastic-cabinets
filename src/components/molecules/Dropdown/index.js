import React from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener, Fade, Card, Popper } from '@mui/material';

function Dropdown(props) {
  const { DropdownButton, dropdownButtonProps, onEventOpen, DropdownContent, dropdownProps } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (typeof onEventOpen === 'function') {
      onEventOpen();
    }
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transition-popper' : undefined;

  return (
    <>
      <DropdownButton aria-describedby={id} onClick={handleClick} {...dropdownButtonProps} />
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        sx={{ zIndex: 1500 }}
        {...dropdownProps}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Fade {...TransitionProps} timeout={350}>
              <Card>{DropdownContent}</Card>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

Dropdown.propTypes = {
  DropdownButton: PropTypes.elementType.isRequired,
  dropdownButtonProps: PropTypes.object,
  onEventOpen: PropTypes.func,
  DropdownContent: PropTypes.node.isRequired,
  dropdownProps: PropTypes.object,
};

export default Dropdown;
