import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../atoms/Dialog';
import TextField from 'components/atoms/TextField';
import { FormHelperText, Stack, Typography } from '@mui/material';
import ButtonRounded from '../../atoms/Button/ButtonRounded';
import Image from '../../atoms/Image';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { unwrapResult } from '@reduxjs/toolkit';
import yupCus from 'assets/js/yup';
import md5 from 'md5';

function DialogCreateUser(props) {
  const { open, onClose, limit, isLoadingCreate, triggerGetListUser, triggerCreateUser } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: '',
    },
    resolver: yupResolver(
      yupCus.object().shape({
        name: yupCus.string().required().label('Tên tài khoản'),
        email: yupCus.string().email('Email không đúng định dạng').required().label('Email'),
        password: yupCus.string().required().label('Mật khẩu'),
        confirmPassword: yupCus
          .string()
          .required()
          .test('compare-pass', 'Mật khẩu không khớp', function compare(value) {
            const { password } = this.parent;
            if (value) return value === password;
            return true;
          })
          .label('Xác nhận mật khẩu'),
        avatar: yupCus.string().required().label('Ảnh đại diện'),
      }),
    ),
  });

  const onSubmit = async (data) => {
    try {
      const res = await triggerCreateUser({
        email: data?.email,
        password: md5(data?.password),
        fullName: data?.name,
        role: -1,
        avatar: data?.avatar,
      });
      unwrapResult(res);
      onClose();
      triggerGetListUser({ params: { page: 1, limit }, isFirst: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Thêm tài khoản"
      content={
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField label="Email" {...field} error={!!errors?.email} helperText={errors?.email?.message} />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField label="Họ tên" {...field} error={!!errors?.name} helperText={errors?.name?.message} />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                label="Mật khẩu"
                type="password"
                {...field}
                error={!!errors?.password}
                helperText={errors?.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                label="Nhập lại mật khẩu"
                type="password"
                {...field}
                error={!!errors?.confirmPassword}
                helperText={errors?.confirmPassword?.message}
              />
            )}
          />
          <div>
            <div>
              <Typography display="inline-block" sx={{ mr: 2 }}>
                Ảnh đại diện:{' '}
              </Typography>
              <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                  <ButtonRounded
                    onClick={() => field.onChange('https://nguoinoitieng.tv/images/nnt/102/0/bgnb.jpg')}
                    variant="contained"
                  >
                    Tải ảnh
                  </ButtonRounded>
                )}
              />
            </div>
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <>
                  <Image ratio="11" image={field.value} isDelete sx={{ my: 1 }} />
                  <FormHelperText error>{errors?.avatar?.message}</FormHelperText>
                </>
              )}
            />
          </div>
        </Stack>
      }
      onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
      isLoading={isLoadingCreate}
    />
  );
}

DialogCreateUser.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  triggerCreateUser: PropTypes.func,
  triggerGetListUser: PropTypes.func,
  limit: PropTypes.number,
  isLoadingCreate: PropTypes.bool,
};

export default DialogCreateUser;
