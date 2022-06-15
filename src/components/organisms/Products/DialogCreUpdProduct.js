import { Box, Grid } from '@mui/material';
import onUpload from 'components/../assets/js/helper/onUpload';
import ButtonRounded from 'components/atoms/Button/ButtonRounded';
import Dialog from 'components/atoms/Dialog';
import Image from 'components/atoms/Image';
import TextField from 'components/atoms/TextField';
import Editor from 'components/molecules/Editor';
import PropTypes from 'prop-types';
import React from 'react';

function DialogCreUpdProduct(props) {
  const { open, onClose, title = 'Thêm sản phẩm' } = props;
  const [avatar, setAvatar] = React.useState([]);

  const handleUpload = () => {
    onUpload({
      options: { multiple: true },
      onSuccess: (res) => {
        setAvatar(res);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onSubmit={onClose}
      title={title}
      content={
        <Grid container spacing={2}>
          <Grid item md={7} sm={12}>
            <Grid container spacing={2}>
              <Grid item xs={16}>
                <TextField label="Tên sản phẩm" required />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <TextField label="Giá" required />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField label="Khuyến mãi" required />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Editor label="Mô tả" required />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={5} sm={12}>
            <Grid container spacing={2}>
              {avatar.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.preview}>
                  <Image image={item.preview} alt="Paella dish" />
                </Grid>
              ))}
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
    />
  );
}
DialogCreUpdProduct.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
};
export default DialogCreUpdProduct;
