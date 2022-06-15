import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, CardHeader, CardMedia, IconButton, Stack, styled, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logoDark from 'assets/image/cabinet-dark.png';
import logo from 'assets/image/cabinet.png';
import AppbarSetting from 'components/molecules/Appbar/AppbarSetting';
import PageConstant from 'constants/PageConstant';
import { MainContext } from 'context/MainProvider';
import useWidth from 'hooks/useWidth';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyleLink = styled(Link)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

function Header({ handleDrawerToggle }) {
  const width = useWidth();
  const { mode } = React.useContext(MainContext);

  const currentUser = useSelector((state) => state.app.user);

  return (
    <AppBar
      color="inherit"
      sx={{
        boxShadow: '0px 0px 20px 0px rgb(44 101 144 / 10%)',
        zIndex: (theme) => (!['sm', 'xs'].includes(width) ? theme.zIndex.drawer + 1 : theme.zIndex.appBar),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: {
              md: 'none',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <StyleLink to={PageConstant.PAGE_DASHBOARD} color="inherit">
          <CardMedia image={mode === 'light' ? logo : logoDark} sx={{ height: 50, width: 100 }} />
        </StyleLink>
        <Box flex={1} />
        <Stack direction="row" alignItems="center">
          <CardHeader
            title={<Typography fontWeight={700}>{currentUser?.fullName}</Typography>}
            subheader="Quản trị viên"
            avatar={<Avatar sizes="40" src={currentUser?.avatar} />}
          />
          <AppbarSetting />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  handleDrawerToggle: PropTypes.func,
};

export default Header;
