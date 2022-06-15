import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as Icon } from './CodeBlock.svg';

function CodeBlockIcon(props) {
  return <SvgIcon component={Icon} {...props} />;
}

export default CodeBlockIcon;
