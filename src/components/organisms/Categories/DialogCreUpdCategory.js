import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'components/atoms/Dialog';
import TextField from 'components/atoms/TextField';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yupCus from 'assets/js/yup';
import { unwrapResult } from '@reduxjs/toolkit';

function DialogCreUpdCategory(props) {
  const { open, onClose, category, triggerCreUpdCategory, isLoading } = props;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: category?.name,
    },
    resolver: yupResolver(
      yupCus.object().shape({
        name: yupCus.string().required().label('Tên danh mục'),
      }),
    ),
  });

  const onSubmit = async (data) => {
    try {
      const res = await triggerCreUpdCategory({ id: category?.id, ...data });
      unwrapResult(res);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={category?.id ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
      content={
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField label="Tên danh mục" {...field} error={errors?.name} helperText={errors?.name?.message} />
          )}
        />
      }
      action={false}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    />
  );
}

DialogCreUpdCategory.propTypes = {
  category: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  triggerCreUpdCategory: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default DialogCreUpdCategory;
