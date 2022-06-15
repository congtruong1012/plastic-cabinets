import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';
import { tableDefaultProps, tablePropTypes } from './tableConfig';

/* table xem dạng list */
export default function ViewAsList(props) {
  const {
    rows,
    columns,
    showNumberOrder,
    dense = true,
    striped,
    checkboxAllProps,
    checkboxItemProps,
    RowActionComponent,
    noDataText,
  } = props;

  return (
    <div>
      <Paper variant="outlined">
        <List dense={dense} disablePadding>
          {/* checkbox all */}
          {checkboxAllProps && (
            <ListItem divider>
              <ListItemText primary={checkboxAllProps && <Checkbox />} />
            </ListItem>
          )}

          {rows.map((rowData, rowIndex) => {
            const rowKey = rowIndex;
            return (
              <ListItem
                key={rowKey}
                alignItems="flex-start"
                divider={rowIndex < rows.length - 1}
                selected={striped && rowIndex % 2 === 0}
              >
                {/* số thứ tự */}
                {showNumberOrder && (
                  <ListItemIcon>
                    <Typography variant="body2">{rowIndex + 1}</Typography>
                  </ListItemIcon>
                )}

                {/* checkbox item */}
                {checkboxItemProps && (
                  <ListItemIcon>
                    <Checkbox
                      color="primary"
                      // onChange={(event) => {
                      //   if (checkboxItemProps.onChange) {
                      //     checkboxItemProps.onChange(event.target.checked, rowData);
                      //   }
                      // }}
                    />
                  </ListItemIcon>
                )}

                <ListItemText
                  primary={
                    <React.Fragment>
                      {columns.map((column, colIndex) => {
                        const colKey = colIndex;
                        const value = rowData[column.id];
                        return (
                          <Typography component="div" gutterBottom key={colKey}>
                            <Typography component="label" fontWeight={600}>{column.label}</Typography>
                            {column.label !== '' ? ':' : ''} &nbsp;
                            {column.format ? column.format(value) : value}
                          </Typography>
                        );
                      })}
                      {RowActionComponent && <RowActionComponent {...rowData} />}
                    </React.Fragment>
                  }
                  primaryTypographyProps={{
                    component: 'div',
                  }}
                />
              </ListItem>
            );
          })}

          {/* Không có dữ liệu */}
          {rows.length === 0 && (
            <ListItem>
              <ListItemText
                primary={noDataText}
                primaryTypographyProps={{
                  align: 'center',
                }}
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </div>
  );
}

ViewAsList.propTypes = tablePropTypes;
ViewAsList.defaultProps = tableDefaultProps;
