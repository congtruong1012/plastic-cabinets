import PropTypes from 'prop-types';

/* table config */
export const tablePropTypes = {
  /* define table */
  rows: PropTypes.array, // các hàng dữ liệu
  columns: PropTypes.array, // define cột
  /* table header */
  tableName: PropTypes.any, // tên table
  tableActions: PropTypes.any, // actions bên phải tên table
  tableToolbar: PropTypes.any, // bộ lọc table
  tableExportTypes: PropTypes.array, // mảng các kiểu export dữ liệu
  /* trong table */
  showResultNumber: PropTypes.bool, // số hàng đang xem
  showNumberOrder: PropTypes.bool, // số thứ tự table row
  dense: PropTypes.bool, // thu hẹp table
  striped: PropTypes.bool, // màu đan xen các hàng
  tableRowProps: PropTypes.object, // tùy chỉnh style table row
  checkboxAllProps: PropTypes.object, // các prop cho checkbox all
  checkboxItemProps: PropTypes.object, // các prop cho checkbox item từng row
  RowActionComponent: PropTypes.elementType, // đã pass toàn bộ data của row, dev tự control
  noDataText: PropTypes.node,
  noBorder: PropTypes.bool, // tắt toàn bộ border
  ckBoxAllProps: PropTypes.object, // các prop cho checkbox all
};
export const tableDefaultProps = {
  rows: [],
  columns: [],
  // tableName: 'title',
  // tableActions: 'actions',
  // tableExportTypes: ['xlxs', 'pdf', 'csv'], // hỗ trợ
  showResultNumber: true,
  showNumberOrder: true,
  dense: true,
  striped: false,
  // tableRowProps: { style: { verticalAlign: 'top' } }, // sử dụng khi muốn căn trên cho row
  noDataText: 'Không tìm thấy dữ liệu',
  // RowActionComponent: ví dụ Component thêm sửa xóa hàng
};

// export const tableProps = [
//   rows,
//   columns,

//   tableName,
//   tableActions,
//   tableToolbar,
//   tableExportTypes,

//   showResultNumber,
//   showNumberOrder,
//   dense,
//   striped,
//   checkboxAllProps,
//   checkboxItemProps,
//   RowActionComponent;
//   noDataText,
// };
