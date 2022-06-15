import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { Avatar, Card, CardHeader, ClickAwayListener, Typography } from '@mui/material';
import Person from '@mui/icons-material/Person';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '../Menu/MenuItem';
import { MainContext } from 'context/MainProvider';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLogout } from 'containers/App/reducer';
import { unwrapResult } from '@reduxjs/toolkit';

function AppbarSetting() {
  const navigator = useNavigate();
  const { mode, onChangeMode } = useContext(MainContext);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await dispatch(fetchLogout());
      unwrapResult(res);
      navigator('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transition-popper' : undefined;

  const settings = [
    {
      label: 'Hồ sơ cá nhân',
      icon: Person,
    },
    {
      label: `Chế độ ${mode === 'light' ? 'tối' : 'sáng'}`,
      icon: mode === 'dark' ? LightModeIcon : DarkModeIcon,
      onClick: onChangeMode,
    },
    {
      label: 'Đăng xuất',
      icon: LogoutIcon,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <SettingsIcon />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        sx={{ zIndex: 1500, width: 300 }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Fade {...TransitionProps} timeout={350}>
              <Card sx={{ pb: 2 }}>
                <CardHeader
                  title={<Typography fontWeight={700}>Công Trương</Typography>}
                  subheader="Quản trị viên"
                  avatar={<Avatar sizes="40" src="https://nguoinoitieng.tv/images/nnt/102/0/bgnb.jpg" />}
                />
                {settings.map((item, index) => (
                  <MenuItem key={String(index)} route={item} dense />
                ))}
              </Card>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

// AppbarSetting.propTypes = {};

export default AppbarSetting;
