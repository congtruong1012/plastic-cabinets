import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as Icon } from './LogoLogin.svg';

function LogoLoginIcon(props) {
  return <SvgIcon component={Icon} {...props} />;
}

export default LogoLoginIcon;
