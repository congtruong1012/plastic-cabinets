import { Box, FormControlLabel, FormHelperText, Grid, LinearProgress, Radio, RadioGroup } from '@mui/material';
import onUpload from 'components/../assets/js/helper/onUpload';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import Dialog from 'components/atoms/Dialog';
import Image from 'components/atoms/Image';
import TextField from 'components/atoms/TextField';
import Editor from 'components/molecules/Editor';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Autocomplete from 'components/atoms/Autocomplete';
import { yupResolver } from '@hookform/resolvers/yup';
import yupCus from 'assets/js/yup';
import NumberFormat from 'react-number-format';
import { unwrapResult } from '@reduxjs/toolkit';

const typeProds = [
  { label: 'Thường', value: 0 },
  { label: 'Phổ biến', value: 1 },
  { label: 'Mới nhất', value: 2 },
  { label: 'Bán chạy', value: 3 },
];

function DialogCreUpdProduct(props) {
  const {
    open,
    onClose,
    product,
    limit,
    categories,
    // isLoadingCategory,
    isLoadingCreUpd,
    triggerGetListProduct,
    triggerCreUpdProduct,
  } = props;
  const [progress, setProgress] = useState(0);

  const {
    control,
    formState: { errors, isSubmitted },
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: product?.name || '',
      category: product?.category || null,
      price: product?.price || '',
      discount: product?.discount || '',
      description: product?.description || '',
      images: product?.images || [],
      typeProd: product?.typeProd || 0,
    },
    resolver: yupResolver(
      yupCus.object().shape({
        name: yupCus.string().required().label('Tên danh mục'),
        category: yupCus.object().nullable().required().label('Danh mục'),
        price: yupCus.string().required().label('Giá'),
        discount: yupCus.string().required().min(0).max(100).label('Khuyến mãi'),
        description: yupCus.string().required().label('Mô tả'),
        images: yupCus.array().required().min(1, 'Phải có ít nhất 1 ảnh').label('Ảnh'),
        typeProd: yupCus.number().required().label('Loại sản phẩm'),
      }),
    ),
  });

  const images = watch('images');

  const handleUpload = () => {
    onUpload({
      options: { multiple: true },
      onProgress: (percent) => setProgress(percent),
      onSuccess: (res) => {
        console.log('handleUpload ~ res', res);
        setValue('images', [...images, ...(res?.map((item) => item?.url) || [])], { shouldValidate: isSubmitted });
        setProgress(0);
      },
      onError: (error) => {
        console.log(error);
        setProgress(0);
      },
    });
  };

  const handleDeleteImage = (image) => {
    setValue(
      'images',
      images.filter((item) => item !== image),
      { shouldValidate: isSubmitted },
    );
  };

  const onSubmit = async (data) => {
    try {
      const res = await triggerCreUpdProduct({
        id: product?.id,
        name: data?.name || '',
        category: data?.category?.id || '',
        price: data?.price || '',
        discount: data?.discount || '',
        description: data?.description || '',
        images: data?.images || [],
        typeProd: data?.typeProd || 0,
      });
      unwrapResult(res);
      onClose();
      triggerGetListProduct({
        limit,
        page: 1,
      });
    } catch (error) {
      console.log('onSubmit ~ error', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
      title={product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
      content={
        <Grid container spacing={2}>
          <Grid item md={7} sm={12}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Tên sản phẩm"
                      required
                      {...field}
                      error={!!errors?.name}
                      helperText={errors?.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={categories}
                      label="Danh mục"
                      autocompleteProps={{
                        ...field,
                        onChange: (e, data) => field.onChange(data),
                        getOptionLabel: (option) => option?.name || '',
                      }}
                      textfieldProps={{
                        error: !!errors?.category,
                        helperText: errors?.category?.message,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <NumberFormat
                          customInput={TextField}
                          label="Giá"
                          required
                          {...field}
                          thousandSeparator={'.'}
                          decimalSeparator={','}
                          allowNegative={false}
                          onValueChange={({ value }) => {
                            field.onChange(value);
                          }}
                          error={!!errors?.price}
                          helperText={errors?.price?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Controller
                      name="discount"
                      control={control}
                      render={({ field }) => (
                        <NumberFormat
                          customInput={TextField}
                          label="Khuyến mãi"
                          required
                          {...field}
                          suffix="%"
                          allowNegative={false}
                          isAllowed={({ value }) => Number(value) <= 100}
                          onValueChange={({ value }) => field.onChange(value)}
                          error={!!errors?.discount}
                          helperText={errors?.discount?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="typeProd"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup value={field.value} onChange={(e) => field.onChange(e.target.value)} row>
                      {typeProds.map((item) => (
                        <FormControlLabel key={item.value} label={item.label} value={item.value} control={<Radio />} />
                      ))}
                    </RadioGroup>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Editor
                      label="Mô tả"
                      error={!!errors?.description}
                      helperText={errors?.description?.message}
                      required
                      onChange={(data) => {
                        field.onChange(data?.html);
                      }}
                      content={field.value}
                      // {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={5} sm={12}>
            <Grid container spacing={2}>
              {progress > 0 && <LinearProgress variant="determinate" value={progress} sx={{ width: 1 }} />}
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <>
                    {(field?.value || []).map((item) => (
                      <Grid item xs={12} sm={6} md={4} key={item}>
                        <Image image={item} alt={item || ''} isDelete onDelete={() => handleDeleteImage(item)} />
                      </Grid>
                    ))}
                    {errors?.images && (
                      <Grid item xs={12} sm={6} md={4}>
                        <FormHelperText error>{errors?.images?.message}</FormHelperText>
                      </Grid>
                    )}
                  </>
                )}
              />
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <ButtonRounded variant="outlined" onClick={handleUpload}>
                    Thêm ảnh
                  </ButtonRounded>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
      dialogProps={{
        maxWidth: 'xl',
      }}
      isLoading={isLoadingCreUpd}
    />
  );
}
DialogCreUpdProduct.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  product: PropTypes.object,
  limit: PropTypes.number,
  categories: PropTypes.array,
  isLoadingCategory: PropTypes.bool,
  triggerGetListProduct: PropTypes.func,
  triggerGetListCategory: PropTypes.func,
  triggerCreUpdProduct: PropTypes.func,
  isLoadingCreUpd: PropTypes.bool,
};
export default DialogCreUpdProduct;
