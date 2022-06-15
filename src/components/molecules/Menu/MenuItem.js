import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MenuItem(props) {
  const { route, dense } = props;
  const [open, setOpen] = useState(false);

  const handleClick = (onClick) => {
    setOpen(!open);
    if (typeof onClick === 'function') onClick();
  };

  return (
    <>
      <ListItemButton
        dense={!!dense}
        component={route?.path ? Link : undefined}
        to={route?.path}
        onClick={() => !route?.path && handleClick(route.onClick)}
      >
        {route.icon && <ListItemIcon>{<route.icon />}</ListItemIcon>}
        <ListItemText primary={route?.label} />
        {route.routes && (open ? <ExpandMore /> : <ChevronRightIcon />)}
      </ListItemButton>
      {route.routes && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box ml={2}>
            <List>
              {(route?.routes || []).map(({ path, label, icon: Icon, ...rest }, index) => (
                <ListItemButton key={String(index)} component={path ? Link : undefined} to={path} {...rest}>
                  <ListItemIcon>{<Icon />}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Collapse>
      )}
    </>
  );
}

MenuItem.propTypes = {
  route: PropTypes.object.isRequired,
  dense: PropTypes.bool,
};

export default MenuItem;
