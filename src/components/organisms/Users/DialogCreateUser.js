import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText, LinearProgress, Stack, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import onUpload from 'assets/js/helper/onUpload';
import yupCus from 'assets/js/yup';
import TextField from 'components/atoms/TextField';
import md5 from 'md5';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ButtonRounded from '../../atoms/Button/ButtonRounded';
import Dialog from '../../atoms/Dialog';
import Image from '../../atoms/Image';

function DialogCreateUser(props) {
  const { open, onClose, limit, isLoadingCreate, triggerGetListUser, triggerCreateUser } = props;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
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

  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    onUpload({
      options: { multiple: true },
      onProgress: (percent) => setProgress(percent),
      onSuccess: (res) => {
        setValue('avatar', res?.[0]?.url, { shouldValidate: isSubmitted });
        setProgress(0);
      },
      onError: (error) => {
        console.log(error);
        setProgress(0);
      },
    });
  };

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
          <Stack spacing={1}>
            <div>
              <Typography display="inline-block" sx={{ mr: 2 }}>
                Ảnh đại diện:{' '}
              </Typography>
              <Controller
                name="avatar"
                control={control}
                render={() => (
                  <ButtonRounded onClick={handleUpload} variant="contained">
                    Tải ảnh
                  </ButtonRounded>
                )}
              />
            </div>
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <Stack spacing={1}>
                  {progress > 0 && <LinearProgress variant="determinate" value={progress} sx={{ width: 1 }} />}
                  {field.value && (
                    <Image
                      ratio="11"
                      image={field.value}
                      isDelete
                      sx={{ my: 1 }}
                      onDelete={() =>
                        setValue('avatar', '', {
                          shouldValidate: isSubmitted,
                        })
                      }
                    />
                  )}
                  <FormHelperText error>{errors?.avatar?.message}</FormHelperText>
                </Stack>
              )}
            />
          </Stack>
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
