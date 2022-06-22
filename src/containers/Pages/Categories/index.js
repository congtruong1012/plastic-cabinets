import { Divider, LinearProgress, Stack, Typography } from '@mui/material';
import createRows from 'assets/js/helper/createRows';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import TextField from 'components/atoms/TextField';
import TypoLink from 'components/atoms/Typography/TypoLink';
import Pagination from 'components/atoms/Pagination';
import BECard from 'components/molecules/BECard';
import ResponsiveTable from 'components/molecules/ResponsiveTable';
import DialogCreUpdCategory from 'components/organisms/Categories/DialogCreUpdCategory';
import DialogDeleteCategory from 'components/organisms/Categories/DialogDeleteCategory';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetListCategory, fetchCreUpdCategory, fetchDeleteCategory } from './reducer';
import LoadingCircular from 'components/molecules/Loading/LoadingCircular';
import { useState } from 'react';
import useDebounce from 'hooks/useDebounce';
// import PropTypes from 'prop-types';

const LIMIT = 5;

function Categories() {
  const [id, setId] = useState();
  const [category, setCategory] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = (value) => {
    setOpen(true);
    setCategory(value);
  };
  const handleClose = () => {
    setCategory();
    setOpen(false);
    triggerGetListCategory({ limit: LIMIT, page: 1, name });
  };

  const [openDel, setOpenDel] = React.useState(false);
  const handleOpenDel = (value) => {
    setId(value);
    setOpenDel(true);
  };
  const handleCloseDel = () => {
    setId();
    setOpenDel(false);
    triggerGetListCategory({ limit: LIMIT, page: 1, name });
  };

  const [search, setSearch] = useState('');

  const name = useDebounce(search, 500);

  const { isLoading, isLoadingCreUpd, isLoadingDelete, params, data, total, page } = useSelector(
    (state) => state.categories,
  );
  const dispatch = useDispatch();
  const triggerGetListCategory = (query) => dispatch(fetchGetListCategory(query));
  const triggerCreUpdCategory = (query) => dispatch(fetchCreUpdCategory(query));
  const triggerDeleteCategory = (query) => dispatch(fetchDeleteCategory(query));

  const handleLoadMore = (e, newPage) => {
    console.log('handleLoadMore ~ newPage', newPage);
    triggerGetListCategory({ ...params, page: newPage });
  };

  const rows = data.map((item) => createRows(item));
  const columns = [
    {
      id: 'c1',
      label: 'Tên danh mục',
      format: (value) => (
        <>
          <Typography variant="body2" component="span" fontWeight={600}>
            {value?.name}
          </Typography>
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
            <TypoLink color="primary" variant="body2" fontWeight={600} onClick={() => handleOpen(value)}>
              Sửa
            </TypoLink>
            <TypoLink color="error" variant="body2" fontWeight={600} onClick={() => handleOpenDel(value?.id)}>
              Xóa
            </TypoLink>
          </Stack>
        </>
      ),
    },
  ];

  useEffect(() => {
    triggerGetListCategory({ limit: LIMIT, page: 1, name });
  }, [name]);

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
        <TextField label="Tên danh mục" fullWidth={false} value={search} onChange={(e) => setSearch(e.target.value)} />
      </BECard>
      <BECard>
        <Stack spacing={2}>
          {isLoading && data?.length === 0 ? (
            <LoadingCircular />
          ) : (
            <>
              <ResponsiveTable rows={rows} columns={columns} showNumberOrder />
              {isLoading && <LinearProgress />}
              <Pagination total={total} rows={LIMIT} page={page} onChange={handleLoadMore} />
            </>
          )}
        </Stack>
      </BECard>
      {open && (
        <DialogCreUpdCategory
          open={open}
          onClose={handleClose}
          category={category}
          triggerCreUpdCategory={triggerCreUpdCategory}
          isLoading={isLoadingCreUpd}
        />
      )}
      {openDel && (
        <DialogDeleteCategory
          open={openDel}
          onClose={handleCloseDel}
          id={id}
          triggerDeleteCategory={triggerDeleteCategory}
          isLoading={isLoadingDelete}
        />
      )}
    </Stack>
  );
}

Categories.propTypes = {};

export default Categories;
