import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, styled, Grid } from '@mui/material';

const CardHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

function BECard(props) {
  const { title, rightAction, children, containerProps, rightActionProps } = props;
  return (
    <Card elevation={0}>
      {title && (
        <CardHeader>
          <Grid container justify="space-between" alignItems="center" spacing={1} {...containerProps}>
            <Grid item xs>
              <Typography variant="h6" component="div">
                <b>{title}</b>
              </Typography>
            </Grid>
            <Grid item {...rightActionProps}>
              {rightAction}
            </Grid>
          </Grid>
        </CardHeader>
      )}
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
}

BECard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  rightAction: PropTypes.any,
  containerProps: PropTypes.object,
  rightActionProps: PropTypes.object,
};

export default BECard;
