import { Alert, Box, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import TextField from 'components/atoms/TextField';
import LinkTo from 'components/molecules/LinkTo';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import TypoLink from 'components/atoms/Typography/TypoLink';
import LogoLoginIcon from 'icons/LogoLogin';
import startUp from 'icons/startup.svg';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Controller, useForm } from 'react-hook-form';
import yupCus from 'assets/js/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { actions } from 'containers/App/reducer';
import md5 from 'md5';

const schema = yupCus.object().shape({
  email: yupCus.string().required().email().label('Email'),
  password: yupCus.string().required().label('Mật khẩu'),
});

function Login() {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const { error, isLoading } = useSelector((state) => state.login);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: 'congtruong@gmail.com',
      password: '123456',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(
        fetchLogin({
          email: data?.email,
          password: md5(data?.password),
        }),
      );
      unwrapResult(res);
      dispatch(actions.updateUser(res?.payload));
      navigator('/');
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        lg={7}
        sx={{
          backgroundImage: `url(${startUp})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgb(69, 90, 100)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <Container maxWidth="xs" sx={{ height: '100%' }}>
          <Stack spacing={1} justifyContent="center" sx={{ height: '100%' }}>
            <Box mx="auto">
              <LogoLoginIcon height={40} width={40} />
            </Box>
            <Typography variant="h4" fontWeight={700} align="center">
              Đăng nhập
            </Typography>
            <div>
              <Stack spacing={2} sx={{ mt: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      size="medium"
                      id="email"
                      label="Tên đăng nhập"
                      {...field}
                      error={!!errors?.email}
                      helperText={errors?.email?.message}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      size="medium"
                      label="Mật khẩu"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      {...field}
                      error={!!errors?.password}
                      helperText={errors?.password?.message}
                    />
                  )}
                />

                {error && <Alert severity="error">{error}</Alert>}

                <Box sx={{ textAlign: 'right' }}>
                  <TypoLink component={LinkTo} to="/" color="primary" variant="body2">
                    Quên mật khẩu?
                  </TypoLink>
                </Box>
                <ButtonRounded
                  disabled={isLoading}
                  startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                >
                  Đăng Nhập
                </ButtonRounded>
              </Stack>
            </div>
          </Stack>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Login;
