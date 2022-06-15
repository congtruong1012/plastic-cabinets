import { Divider, Grid, Pagination, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import createRows from 'assets/js/helper/createRows';
import Autocomplete from 'components/atoms/Autocomplete';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import TextField from 'components/atoms/TextField';
import TypoLink from 'components/atoms/Typography/TypoLink';
import BECard from 'components/molecules/BECard';
import ResponsiveTable from 'components/molecules/ResponsiveTable';
import DialogCreUpdProduct from 'components/organisms/Products/DialogCreUpdProduct';
import DialogDeleteProduct from 'components/organisms/Products/DialogDeleteProduct';
import React, { useState } from 'react';
import DialogViewProduct from '../../../components/organisms/Products/DialogViewProduct';

// import PropTypes from 'prop-types';

function Products() {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);

  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);

  const column = [
    {
      id: 'c1',
      label: 'Tên sản phẩm',
      format: (value) => (
        <>
          <Typography variant="body2" component="span" fontWeight={600}>
            {value}
          </Typography>
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
            <TypoLink variant="body2" onClick={handleOpenView}>
              Xem
            </TypoLink>
            <TypoLink color="primary" variant="body2" onClick={handleOpen}>
              Sửa
            </TypoLink>
            <TypoLink color="error" variant="body2" onClick={handleOpenDel}>
              Xóa
            </TypoLink>
          </Stack>
        </>
      ),
    },
    {
      id: 'c2',
      label: 'Giá',
      props: {
        align: 'center',
      },
    },
    {
      id: 'c3',
      label: 'Khuyến mãi',
      props: {
        align: 'center',
      },
    },
    {
      id: 'c4',
      label: 'Danh mục',
    },
  ];
  const rows = [
    ['Tủ nhựa người lớn', '1.000.000', '0%', 'Tủ nhựa người lớn'],
    ['Tủ nhựa trẻ em', '1.000.000', '0%', 'Tủ nhựa người lớn'],
    ['Tủ giày', '1.000.000', '0%', 'Tủ nhựa người lớn'],
    ['Giường kệ', '1.000.000', '0%', 'Tủ nhựa người lớn'],
    ['Bàn học, trang điểm', '1.000.000', '0%', 'Tủ nhựa người lớn'],
    ['Tủ bếp', '1.000.000', '0%', 'Tủ nhựa người lớn'],
  ].map((item) => createRows(...item));
  return (
    <Stack spacing={2}>
      <BECard
        title="Danh sách sản phẩm"
        rightAction={
          <ButtonRounded variant="contained" color="primary" onClick={handleOpen}>
            Thêm sản phẩm
          </ButtonRounded>
        }
      />
      <BECard>
        <Grid container spacing={2}>
          <Grid item sm="auto" xs={12}>
            <TextField label="Tên sản phẩm" />
          </Grid>
          <Grid item sm={3} xs={12}>
            <Autocomplete label="Danh mục" />
          </Grid>
        </Grid>
      </BECard>
      <BECard>
        <Stack spacing={2} justifyContent="center">
          <ResponsiveTable rows={rows} columns={column} />
          <Box display="flex" justifyContent="center">
            <Pagination variant="ountlined" count={10} />
          </Box>
        </Stack>
      </BECard>
      {open && <DialogCreUpdProduct open={open} onClose={handleClose} />}
      {openDel && <DialogDeleteProduct open={openDel} onClose={handleCloseDel} />}
      {openView && <DialogViewProduct open={openView} onClose={handleCloseView} />}
    </Stack>
  );
}

Products.propTypes = {};

export default Products;
