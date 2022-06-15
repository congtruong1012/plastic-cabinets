import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { tableDefaultProps, tablePropTypes } from './tableConfig';

/* table xem dạng thường */
export default function ViewAsTable(props) {
  const {
    rows,
    columns,
    tableName,
    showNumberOrder,
    dense,
    tableRowProps,
    checkboxAllProps,
    checkboxItemProps,
    RowActionComponent,
    noDataText,
    noBorder,
  } = props;

  return (
    <div>
      <TableContainer component={Paper} elevation={0} variant={noBorder ? undefined : 'outlined'}>
        <Table stickyHeader aria-label={tableName} size={dense ? 'small' : undefined}>
          <TableHead>
            <TableRow>
              {/* checkbox all */}
              {checkboxAllProps && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    // onChange={(event) => {
                    //   if (checkboxAllProps.onChange) {
                    //     checkboxAllProps.onChange(event.target.checked);
                    //   }
                    // }}
                    // checked={checkboxAllProps.checked}
                    // {...ckBoxAllProps}
                  />
                </TableCell>
              )}

              {/* số thứ tự */}
              {showNumberOrder && (
                <TableCell width={70} align="center">
                  <Typography variant="inherit" noWrap>
                    <b>STT</b>
                  </Typography>
                </TableCell>
              )}

              {columns.map((column, colIndex) => {
                const colKey = colIndex;
                return (
                  <TableCell key={colKey} {...column.props}>
                    <Typography component="label" fontWeight={600} variant="body2">
                      {column.label}
                    </Typography>
                  </TableCell>
                );
              })}

              {/* row action */}
              {RowActionComponent && <TableCell>#</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((rowData, rowIndex) => (
              <TableRow key={rowIndex.toString()} hover tabIndex={-1} {...tableRowProps}>
                {/* checkbox item */}
                {checkboxItemProps && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(event) => {
                        if (checkboxItemProps.onChange) {
                          checkboxItemProps.onChange(event.target.checked, rowData);
                        }
                      }}
                      checked={rowData.checked}
                    />
                  </TableCell>
                )}

                {/* số thứ tự */}
                {showNumberOrder && <TableCell align="center">{rowIndex + 1}</TableCell>}

                {columns.map((column, colIndex) => {
                  const colKey = colIndex;
                  const value = rowData[column.id];
                  return (
                    <TableCell key={colKey} {...column.props}>
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  );
                })}

                {/* row action */}
                {RowActionComponent && (
                  <TableCell>
                    <RowActionComponent {...rowData} />
                  </TableCell>
                )}
              </TableRow>
            ))}

            {/* Không có dữ liệu */}
            {rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (checkboxItemProps ? 1 : 0) + (showNumberOrder ? 1 : 0)}
                  align="center"
                >
                  {noDataText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
ViewAsTable.propTypes = tablePropTypes;
ViewAsTable.defaultProps = tableDefaultProps;
