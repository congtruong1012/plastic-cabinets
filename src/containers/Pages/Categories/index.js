import { Box, Divider, Pagination, Stack, Typography } from '@mui/material';
import createRows from 'assets/js/helper/createRows';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import TextField from 'components/atoms/TextField';
import TypoLink from 'components/atoms/Typography/TypoLink';
import BECard from 'components/molecules/BECard';
import ResponsiveTable from 'components/molecules/ResponsiveTable';
import DialogCreUpdCategory from 'components/organisms/Categories/DialogCreUpdCategory';
import DialogDeleteCategory from 'components/organisms/Categories/DialogDeleteCategory';
import React from 'react';
// import PropTypes from 'prop-types';

function Categories() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDel, setOpenDel] = React.useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);

  const rows = ['Tủ nhựa người lớn', 'Tủ nhựa trẻ em', 'Tủ giày', 'Giường kệ', 'Bàn học, trang điểm', 'Tủ bếp'].map(
    (item) => createRows(item),
  );
  const columns = [
    {
      id: 'c1',
      label: 'Tên danh mục',
      format: (value) => (
        <>
          <Typography variant="body2" component="span" fontWeight={600}>
            {value}
          </Typography>
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
            <TypoLink color="primary" variant="body2" fontWeight={600} onClick={handleOpen}>
              Sửa
            </TypoLink>
            <TypoLink color="error" variant="body2" fontWeight={600} onClick={handleOpenDel}>
              Xóa
            </TypoLink>
          </Stack>
        </>
      ),
    },
  ];
  return (
    <Stack spacing={2}>
      <BECard
        title="Danh sách danh mục"
        rightAction={
          <ButtonRounded variant="contained" color="primary" onClick={handleOpen}>
            Thêm danh mục
          </ButtonRounded>
        }
      />
      <BECard>
        <TextField label="Tên danh mục" fullWidth={false} />
      </BECard>
      <BECard>
        <Stack spacing={2}>
          <ResponsiveTable rows={rows} columns={columns} showNumberOrder />
          <Box display="flex" justifyContent="center">
            <Pagination count={10} page={1} variant="outlined" />
          </Box>
        </Stack>
      </BECard>
      {open && <DialogCreUpdCategory open={open} onClose={handleClose} />}
      {openDel && <DialogDeleteCategory open={openDel} onClose={handleCloseDel} />}
    </Stack>
  );
}

Categories.propTypes = {};

export default Categories;
