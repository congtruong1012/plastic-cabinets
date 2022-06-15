import { List } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import MenuItem from './MenuItem';

function Menu(props) {
  const { routes, menuItemProps } = props;
  return (
    <List>
      {routes.map((item, index) => (
        <MenuItem key={String(index)} route={item} {...menuItemProps} />
      ))}
    </List>
  );
}

Menu.propTypes = {
  routes: PropTypes.array.isRequired,
    menuItemProps: PropTypes.object,
};

export default Menu;
