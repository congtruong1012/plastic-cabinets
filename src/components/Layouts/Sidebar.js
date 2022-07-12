import { CardMedia, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import logoDark from 'assets/image/cabinet-dark.png';
import { MainContext } from 'context/MainProvider';
import logo from 'assets/image/cabinet.png';
import { mainMenu } from 'assets/js/routes';
import Menu from 'components/molecules/Menu';
import useWidth from 'hooks/useWidth';
import PropTypes from 'prop-types';
import React from 'react';

function DrawerContent({ onClose }) {
  const width = useWidth();
  const { mode } = React.useContext(MainContext);

  const getRoutes = (routes) =>
    routes.map((item) => ({
      ...item,
      ...(!item.routes ? { onClick: onClose } : {}),
      ...(Array.isArray(item.routes) ? { routes: getRoutes(item.routes) } : {}),
    }));

  const routes = getRoutes(mainMenu);

  return (
    <div>
      {['md', 'sm', 'xs'].includes(width) ? (
        <Box my={1} ml={2}>
          <Link href="/" underline="none" color="inherit">
            <CardMedia image={mode === 'light' ? logo : logoDark} sx={{ height: 50, width: 100 }} />
          </Link>
        </Box>
      ) : (
        <Toolbar />
      )}
      <Divider />
      <Box my={3} />
      <Menu routes={routes} />
    </div>
  );
}

DrawerContent.propTypes = {
  onClose: PropTypes.func,
};

function Sidebar({ mobileOpen, handleDrawerToggle, drawerWidth, window }) {
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <DrawerContent onClose={handleDrawerToggle} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
}

Sidebar.propTypes = {
  mobileOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  drawerWidth: PropTypes.number,
  window: PropTypes.func,
  width: PropTypes.string,
};

export default Sidebar;
