import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import * as React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const drawerWidth = 300;

function MainLayout(props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Header mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, mt: 3, px: 2, py: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
