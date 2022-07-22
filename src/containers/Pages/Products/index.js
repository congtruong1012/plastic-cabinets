import { Divider, Grid, LinearProgress, MenuItem, Stack, Typography } from '@mui/material';
import createRows from 'assets/js/helper/createRows';
import formatCurrency from 'assets/js/helper/formatCurrency';
import Autocomplete from 'components/atoms/Autocomplete';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import Pagination from 'components/atoms/Pagination';
import TextField from 'components/atoms/TextField';
import TypoLink from 'components/atoms/Typography/TypoLink';
import BECard from 'components/molecules/BECard';
import LoadingCircular from 'components/molecules/Loading/LoadingCircular';
import ResponsiveTable from 'components/molecules/ResponsiveTable';
import DialogCreUpdProduct from 'components/organisms/Products/DialogCreUpdProduct';
import DialogDeleteProduct from 'components/organisms/Products/DialogDeleteProduct';
import DialogViewProduct from 'components/organisms/Products/DialogViewProduct';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import HelmetHOC from '../../HOCs/HelmetHOC';
import { fetchCreUpdProduct, fetchDeleteProduct, fetchGetAllCategory, fetchGetListProduct } from './reducer';

import PropTypes from 'prop-types';

const LIMIT = 10;

const typesProd = ['Thường', 'Phổ biến', 'Mới nhất', 'Bán chạy'];

function Products(props) {
  const { role } = props;

  const [id, setId] = useState();
  const [data, setData] = useState();

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openView, setOpenView] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      category: null,
      typeProd: 0,
    },
  });

  const {
    isLoading,
    isLoadingCreUpd,
    isLoadingDelete,
    isLoadingCategory,
    data: products,
    params,
    total,
    page,
    categories,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const triggerGetListCategory = (query) => dispatch(fetchGetAllCategory(query));
  const triggerGetListProduct = (query) => dispatch(fetchGetListProduct(query));
  const triggerCreUpdProduct = (query) => dispatch(fetchCreUpdProduct(query));
  const triggerDeleteProduct = (query) => dispatch(fetchDeleteProduct(query));

  const handleLoadMore = (e, newPage) => {
    triggerGetListProduct({ params: { ...params, page: newPage } });
  };

  const handleOpen = (value) => {
    setOpen(true);
    setData(value);
  };
  const handleClose = () => {
    setOpen(false);
    setData();
  };

  const handleOpenDel = (value) => {
    setOpenDel(true);
    setId(value);
  };
  const handleCloseDel = () => {
    setOpenDel(false);
    setId();
  };

  const handleOpenView = (value) => {
    setOpenView(true);
    setData(value);
  };
  const handleCloseView = () => {
    setOpenView(false);
    setData();
  };

  const onSubmit = (data) => {
    triggerGetListProduct({
      params: {
        limit: LIMIT,
        page: 1,
        name: data?.name || undefined,
        category: data?.category?.id || undefined,
        typeProd: data?.typeProd || undefined,
      },
      isFirst: true,
    });
  };

  const onReset = () => {
    triggerGetListProduct({
      params: {
        page: 1,
        limit: LIMIT,
      },
      isFirst: true,
    });
    reset();
  };

  const column = [
    {
      id: 'c1',
      label: 'Tên sản phẩm',
      format: (value) => (
        <>
          <Typography variant="body2" component="span" fontWeight={600}>
            {value?.name}
          </Typography>
          {role === 1 && (
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
              <TypoLink variant="body2" onClick={() => handleOpenView(value)}>
                Xem
              </TypoLink>
              <TypoLink color="primary" variant="body2" onClick={() => handleOpen(value)}>
                Sửa
              </TypoLink>
              <TypoLink color="error" variant="body2" onClick={() => handleOpenDel(value?.id)}>
                Xóa
              </TypoLink>
            </Stack>
          )}
        </>
      ),
    },
    {
      id: 'c2',
      label: 'Loại sản phẩm',
      props: {
        align: 'center',
      },
    },
    {
      id: 'c3',
      label: 'Giá',
      props: {
        align: 'center',
      },
    },
    {
      id: 'c4',
      label: 'Khuyến mãi',
      props: {
        align: 'center',
      },
    },
    {
      id: 'c5',
      label: 'Danh mục',
    },
  ];

  const rows = products.map((item) =>
    createRows(
      item,
      typesProd[item?.typeProd],
      formatCurrency(item?.price),
      `${item?.discount || 0}%`,
      item?.category?.name,
    ),
  );

  useEffect(() => {
    if (!isLoading)
      triggerGetListProduct({
        params: {
          page: 1,
          limit: LIMIT,
        },
        isFirst: true,
      });
  }, []);

  useEffect(() => {
    if (!isLoadingCategory) {
      triggerGetListCategory();
    }
  }, []);

  return (
    <>
      <HelmetHOC title="Products" />
      <Stack spacing={2}>
        <BECard
          title="Danh sách sản phẩm"
          rightAction={
            role === 1 && (
              <ButtonRounded variant="contained" color="primary" onClick={handleOpen}>
                Thêm sản phẩm
              </ButtonRounded>
            )
          }
        />
        <BECard>
          <Grid container spacing={2}>
            <Grid item sm="auto" xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <TextField label="Tên sản phẩm" {...field} />}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    label="Danh mục"
                    options={categories}
                    autocompleteProps={{
                      onChange: (e, data) => field.onChange(data),
                      getOptionLabel: (option) => option?.name || '',
                      value: field.value,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <Controller
                name="typeProd"
                control={control}
                render={({ field }) => (
                  <TextField label="Loại sản phẩm" size="small" fullWidth {...field} select>
                    <MenuItem value={0}>Tất cả</MenuItem>
                    <MenuItem value={1}>Phổ biến</MenuItem>
                    <MenuItem value={2}>Mới nhất</MenuItem>
                    <MenuItem value={3}>Bán chạy</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack justifyContent="center" spacing={2} direction="row">
                <ButtonRounded variant="contained" onClick={handleSubmit(onSubmit)}>
                  Tìm kiếm
                </ButtonRounded>
                <ButtonRounded variant="contained" color="inherit" onClick={onReset}>
                  Đặt lại
                </ButtonRounded>
              </Stack>
            </Grid>
          </Grid>
        </BECard>
        <BECard>
          <Stack spacing={2}>
            {isLoading && products?.length === 0 ? (
              <LoadingCircular loading />
            ) : (
              <>
                <ResponsiveTable rows={rows} columns={column} />
                {isLoading && <LinearProgress />}
                <Pagination total={total} rows={LIMIT} page={+page} onChange={handleLoadMore} />
              </>
            )}
          </Stack>
        </BECard>
        {open && (
          <DialogCreUpdProduct
            open={open}
            onClose={handleClose}
            product={data}
            categories={categories}
            isLoadingCategory={isLoadingCategory}
            isLoadingCreUpd={isLoadingCreUpd}
            triggerGetListCategory={triggerGetListCategory}
            triggerGetListProduct={triggerGetListProduct}
            triggerCreUpdProduct={triggerCreUpdProduct}
            limit={LIMIT}
          />
        )}
        {openDel && (
          <DialogDeleteProduct
            open={openDel}
            onClose={handleCloseDel}
            id={id}
            limit={LIMIT}
            isLoading={isLoadingDelete}
            triggerDeleteProduct={triggerDeleteProduct}
            triggerGetListProduct={triggerGetListProduct}
          />
        )}
        {openView && <DialogViewProduct open={openView} onClose={handleCloseView} product={data} />}
      </Stack>
    </>
  );
}

Products.propTypes = {
  role: PropTypes.number.isRequired,
};

export default Products;
